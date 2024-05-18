import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Img } from '@components/index';
import profileIcon from '../../public/profile.svg'
import { PictureModalData } from '@/types/PictureModalData';
import UserContext from 'context/UserContext';
import { UserContextType } from '@/types/UserContextType';
import { useRouter } from 'next/router';
import { ApiService } from '@/services/ApiService';
import * as S from './styles'

type PictureProfileModalProps = {
  data: PictureModalData
  setData: Dispatch<SetStateAction<PictureModalData>>,
}



const ProfilePictureModal = ({data, setData}:PictureProfileModalProps) => {

  const { user, setUser } = useContext(UserContext) as UserContextType

  const [pic, setPic] = useState('')

  const [sessionProfile, setSessionProfile] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const localId = localStorage.getItem('id')
    if(Number(localId) === data.userSigned?.id) setSessionProfile(true)
    else setSessionProfile(false)

    if(data.userSigned?.profilePicture) setPic(data.userSigned?.profilePicture)

  }, [user.id, data.userSigned?.id, setPic, data.userSigned?.profilePicture])



  const handleChange = (e:React.ChangeEvent) => {


    const target = e.target as HTMLInputElement

    const files = target.files as FileList

    const file = files[0]

    if(FileReader && file){
      const fr = new FileReader()
      const token = localStorage.getItem('token')
      const accountType = localStorage.getItem('accountType')

      const onload = async () => {
        const img = document.getElementById('profile-pic-modal') as HTMLImageElement
        const apiService = new ApiService()

        img.src = fr.result as string

        const text = await apiService.updateProfilePicture(accountType as string, fr, token as string)
        
        if(text === 'updated'){
          localStorage.setItem('pic', fr.result as string)
          setUser({id: user.id, token: user.token, profilePicture: fr.result as string, coverPicture: user.coverPicture, accountType: accountType})
          router.reload()
        }
      }

      fr.onload = onload

      fr.readAsDataURL(file)
    }

  }

  return (
    <S.Container className='modal'>
      <Img height={200} width={200} id='profile-pic-modal' className='profile-pic' validateURL={!!pic} url={pic} file={profileIcon} alt='profile picture'/>
      <p onClick={() => setData({
        open:false,
        userSigned: data.userSigned
      })}>X</p>

      {sessionProfile && (
        <>
          <label className='button' htmlFor="profile-pic">
            Editar
          </label>
          <input onChange={e => handleChange (e)} id="profile-pic" type="file" />
        </>
      )}
    </S.Container>
  );
};

export default ProfilePictureModal;