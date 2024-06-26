import { AddCityForm } from '@/types/AddCityForm';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import styled from 'styled-components';
import closeIcon from '../public/close.svg'
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import LoadingContext from 'context/LoadingContext';
import locales from 'locales';
import { Rnd } from 'react-rnd';
import { base64ToFile, resizeAndCropImage } from '@/utils/imageFunctions';
import { ApiService } from '@/services/ApiService';
import api from '@/services/api';

const Container = styled.div`
  position: absolute;
  z-index: 3;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form{
    position: relative;
    padding-top: 25px;
    padding-bottom: 25px;
    min-height: 50rem;
    width: 80%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    input{
      width: 70%;
    }
    @media (max-width: 600px) {
      width: 80%;
    }
    .buttons{
      display: flex;
      width: auto;
      gap: 2rem;
      #discardbutton{
        background-color: #c24343;
      }
    }
  }
  .close-icon{
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }
  .close{
    cursor: pointer;
    position: absolute;
    top: 3rem;
    right: 3rem;
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-2);
    color: var(--surface);
    border-radius: 1rem;
    font-weight: bold;
  }
  .list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 80%;
    gap: 1rem;
    p{
      background-color: var(--surface);
      color: var(--surface-2);
      padding: 1rem;
      border-radius: 3rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
  h3{
    margin-bottom: 2rem;
  }
  h4{
    font-size: 2rem;
    font-style: italic;
    color: var(--surface-2);
  }
  .cover-pic-window{
    width: 90%;
    height: calc(90% * 400/1400);
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;  
  }
  // .image-container{
  //   background-color: green;
  //   display: flex;
  //   justify-content: center;®,a 
  //   align-items: center;
  //   img{
  //     max-width: 100%;
  //     max-height: 100%;
  //     object-fit: contain;
  //     pointer-events: none;
  //   }
  .image-container{
    
    img{
      pointer-events: none;
    }
  }
`

type CoverPicAdjustModalProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>,
  srcImg: string
  setSrcImg: Dispatch<SetStateAction<string>>
}

const CoverPicAdjustModal = ({open, setOpen, srcImg, setSrcImg}: CoverPicAdjustModalProps) => {


  const { register, handleSubmit } = useForm<AddCityForm>()

  const [user, setUser] = useState<any>()

  const [windowSize, setWindowSize] = useState<any>({
    width: undefined,
    height: undefined,
  });

  const [coverPicAttr, setCoverPicAttr] = useState<any>({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCoverPicAttr({
      width: windowSize.width*.9*.8,
      height: windowSize.width*.9*.8*4/14,
      x: 0,
      y: 0
    })
  }, [windowSize])

  const windowSizeTarget = {
    width: 1400,
    height: 400,
  }

  const dragImageRef = useRef<any>(null)
  const [imageOpacity, setImageOpacity] = useState(1);

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  useEffect(() => {
    const fetchData = async () => {
      const localId = localStorage.getItem('id')
      const accType = localStorage.getItem('accountType')
      if(localId){
        console.log("AQUi ", "AAA")
        const response = await api.get(`/${accType}/${localId}`)
        const userData = await response.data
        setUser(userData)
      }
    }

    fetchData()
  }, [open])

  const onSubmit = async () => {
    resizeAndCropImage(srcImg, coverPicAttr.y*(windowSizeTarget.width/dragImageRef.current.width), windowSizeTarget.width, windowSizeTarget.height, async (resizedAndCroppedImage: string, error: any) => {
      if (error) {
        console.error(error);
      } else {
        const token = localStorage.getItem('token')
        const accountType = localStorage.getItem('accountType')
        const apiService = new ApiService()
        setSrcImg(resizedAndCroppedImage)
        setOpen(false)
        const text = await apiService.updateCoverPictureString(accountType as string, resizedAndCroppedImage, token as string)
        if(text === 'updated'){
          setUser({id: user.id, token: user.token, coverPicture: resizedAndCroppedImage as string, profilePicture: user.profilePicture, accountType: user.accountType})
          router.reload()
        }
      }
    });
  }

  const handleDeleteLanguage = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')
    const accType = localStorage.getItem('accountType')

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/language/'+accType+'/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    const text = await response.text()
    if(text === 'deleted') router.reload()

  }
  return (
    open ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h1 style={{fontSize: "2.2rem"}}>{t.coverPicAdjust.title}</h1>
        <div style={{ width: windowSize.width*.9*.8, height: windowSize.width*.9*.8*4/14, overflow: 'hidden', position: 'relative' }}>
          <Rnd
            size={{ width: coverPicAttr.width, height: coverPicAttr.height }}
            position={{ x: coverPicAttr.x, y: coverPicAttr.y }}
            onDragStart={() => {
              setImageOpacity(.3)
              console.log("ratio: ", (dragImageRef.current.height/dragImageRef.current.width)*windowSizeTarget.width)
            }}
            onDragStop={(e, d) => {
              setImageOpacity(1)
              const newY = Math.min(0, Math.max(d.y, -(dragImageRef.current.height - windowSize.width*.9*.8*4/14)))
              console.log(newY*windowSizeTarget.width/dragImageRef.current.width)
              setCoverPicAttr({ ...coverPicAttr, x: d.x, y: newY });
            }}
            enableResizing={{
              right: false, 
              left: false,
              top:false, 
              bottom:false, 
              topRight:false, 
              bottomRight:false, 
              bottomLeft:false, 
              topLeft:false
            }}
            dragAxis='y'
          >
            <div style={{width: "100%", height: "auto", backgroundColor: "#888888"}}>
              <img ref={dragImageRef} src={srcImg} alt="Cover pic" style={{ width: '100%', height: 'auto', objectFit: 'contain', pointerEvents: "none", opacity: imageOpacity }}/>
            </div>
          </Rnd>
        </div>
        <div className='buttons'>
          <button type='submit' >{t.coverPicAdjust.btnAccept}</button>
          <button id='discardbutton' type='button' onClick={() => setOpen(false)}>{t.coverPicAdjust.btnDiscard}</button>
        </div>
        <canvas id="canvas" width={windowSizeTarget.width} height={windowSizeTarget.height} style={{display: 'none'}}></canvas>

        <p className='close' onClick={() => setOpen(false)}>X</p>
      </form>
    </Container>
    : <></>
  );
};

export default CoverPicAdjustModal;