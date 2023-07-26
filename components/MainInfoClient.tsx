import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import profileIcon from '@/../public/profile.svg'
import styled from 'styled-components';
import PictureModalContext from 'context/PictureModalContext';
import { PictureModalContextType } from '@/types/PictureModalContextType';
import editIcon from '../public/edit.svg'
import mailIcon from '../public/mail.svg'
import greyImage from '../public/grey.png'
import UserContext from 'context/UserContext';
import { UserContextType } from '@/types/UserContextType';
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import Link from 'next/link';
import { ApiService } from '@/services/ApiService';
import { useRouter } from 'next/router';
import { ClientProfile } from '@/types/ClientProfile';

type ContainerProps = {
  isProfile: boolean
}

const Container = styled.div<ContainerProps>`
  position: relative;

  min-height: ${props => props.isProfile ? '40rem' : '20rem'};
  @media only screen and (max-width: 900px){
    min-height: ${porps => porps.isProfile ? '60rem': '40rem'};
    height: auto;

  }
  .main-info{
    
    .top{
      
      position: absolute;
      width: 100%;
      height: 22rem;
      top: 0;
      left: 0;
      .label-back{
        background-color: var(--surface);
        border-radius: 50%;
        height: 4rem;
        width: 4rem;
        position: absolute;
        top: 1rem;
        right: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          position: unset;
        }
      }
    }
    display: flex;
    align-items: center;
    background-color: var(--surface);
    padding: 3rem;
    border-radius: 3rem;
    height: auto;
    gap: 1rem;
    .cover-photo{
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      width: 100%;
      border-top-left-radius: 3rem;
      border-top-right-radius: 3rem;
      object-fit: cover;
    }
    .profile{    
        
      height: ${porps => porps.isProfile ? '20rem': '10rem'};
      width: ${porps => porps.isProfile ? '20rem': '10rem'};
      border-radius: 50%;
      object-fit: cover;
      position: relative;
      @media only screen and (max-width: 900px){
        margin-bottom: unset;
      }
    }
    @media only screen and (max-width: 900px){
      flex-direction: column;
    }
    .sub-content{
      
      @media only screen and (max-width: 900px){
        flex-direction: column;
        gap: 2rem;
        margin-top: unset;
        margin-left: unset;
      }
      margin-top: ${porps => porps.isProfile ? '20rem': 'unset'};
      margin-left: ${porps => porps.isProfile ? '10rem': '2rem'};
      width: 60%;
      
      .form{
        display: flex;
        flex-direction: column;
        gap: 10px;
        @media only screen and (max-width: 900px){
          justify-content: center;
         align-items: center;
        } 
        label{
          opacity: 70%;
        }
        li{
          display: flex;
          gap:10px;
        }
        p{
          width: auto;
        }
        input{
          height: 18px;
          font-size: 18px;
          width:250px;
          padding: 0;
          border-radius: 5px;
          padding-left: 10px;
        }
        button{
          width: 100px;
          height: 25px;
          padding: 5px;
          margin-top: 10px;
        }
      }
    }
    .about{
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      min-width: 15rem;
      color: var(--surface-2);
      background-color: red;
      @media only screen and (max-width: 900px){
        align-items: center;
        min-width: 100%;
      }
    }
    .about-2{
      
      position: relative;
      @media only screen and (max-width: 900px){
        align-items: center;
        text-align: center;
      }
      height: 100%;
      display: flex;
      color: var(--surface-2);
      flex-direction: column;
      justify-content: flex-end;
      gap: 0.5rem;
      p{
        gap: .5rem;
      }
    }
    .contact{
    
      
      
      .icon{
        height: 2rem;
        width: 2rem;
        cursor: pointer;
        opacity: 0.7;
        transition: all .5s;
        :hover{
          opacity: 1;
        }
      }
    }
    .current-agency{
      background-color: var(--surface);
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 1rem;
      border-radius: 1rem;
      position: absolute;
      bottom: ${porps => porps.isProfile ? '20rem': 'unset'};
      right: 2rem;
      @media only screen and (max-width: 900px){
        position: unset;
      }
      .agency{
        height: 3rem;
        width: 3rem;
      }
    }
    .profile-pointer{
      cursor: pointer;
    }
    h1{
      font-weight: normal;
    }
    h3{
      color: var(--star);
    }
    p{
      width: 60rem;
      max-height: 10rem;
      display: block; 
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`

type MainInfoClientProps = {
  userSigned: ClientProfile
  isProfile: boolean
}

const MainInfoClient = ({ userSigned , isProfile}: MainInfoClientProps) => {

  console.log("USEEEEER",userSigned)
  const { user, setUser } = useContext(UserContext) as UserContextType

  const [editing, setEditing] = useState(false)

  const [firstName, setFirstName] = useState(userSigned?.firstName)

  const [lastName, setLastName] = useState(userSigned?.lastName)

  const [adress, setAdress] = useState("")

  const [sessionProfile, setSessionProfile] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const localId = localStorage.getItem('id')
    const accounType = localStorage.getItem('accountType')
    if(Number(localId) === userSigned?.id && accounType === 'client'){
      setSessionProfile(true)
    } 

  }, [user.id, userSigned?.id])

  const handleChangeCover = (e:React.ChangeEvent) => {

    const target = e.target as HTMLInputElement

    const files = target.files as FileList

    const file = files[0]

    if(FileReader && file){
      const fr = new FileReader()
      const token = localStorage.getItem('token')
      const accountType = localStorage.getItem('accountType')

      const onload = async () => {
        const img = document.getElementById('cover-pic') as HTMLImageElement
        const apiService = new ApiService()

        img.src = fr.result as string

        const text = await apiService.updateCoverPicture(accountType as string, fr, token as string)
        
        if(text === 'updated'){

          setUser({id: user.id, token: user.token, coverPicture: fr.result as string, profilePicture: user.profilePicture, accountType: user.accountType})
          router.reload()
        }
      }

      fr.onload = onload

      fr.readAsDataURL(file)
    }

  }

  function sendInfo(e: any){
    e.preventDefault() 

    console.log(firstName)
    console.log(lastName)
    console.log(adress)

    console.log("enviar")
    //enviar alterações
    router.reload()
    
  }

  function startEditing(e: any){
    e.preventDefault() 
    setEditing(!editing)
  }

  return (

  <Container isProfile={isProfile}>
    <div className="main-info border">
      <div className='top'>
        {isProfile && (
          <>
            <Image height={1000} width={1000} src={greyImage} alt='cover image' className='cover-photo'/>
            {sessionProfile && (
              <>
                <div className='label-back'>
                  <label htmlFor="cover-pic">
                    <Image className='edit-main' src={editIcon} alt='edit icon'/>
                  </label>
                </div>
                <input onChange={e => handleChangeCover(e)} id="cover-pic" type="file" />
              </>
            )}
          </>
        )}
      </div>
      <Image width={100} height={100} className= {isProfile ? "profile profile-pointer" : 'profile' } src={profileIcon} alt='profile icon'/>
      

      <div className="sub-content">
        <form className="form">
          <li>
            <label>Nome: </label>
            {editing?
              <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
              :<p>{firstName}</p>
            }
          </li>
          <li>
            <label>Sobrenome: </label>
            {editing?
              <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
              :<p>{lastName}</p>
            }
          </li>
          <li>
            <label>Endereço: </label>
            {editing?
              <input type="text" value={adress} onChange={(e)=>setAdress(e.target.value)}/>
              :<p>{adress}</p> 
            }
          </li>
          <li>
            <label>Email: </label>
            <p>{userSigned?.email}</p>
            <div className="contact">
          {userSigned?.email ? (
            <Link href={'mailto: ' + userSigned.email} target='_blank'>
              <Image className='icon' src={mailIcon} alt='mail icon'/>
            </Link>
          ) : '' }
        </div>
          </li>

        {editing?
        <button className='button' onClick={(e)=>sendInfo(e)}>Salvar</button>
        :<button className='button' onClick={(e)=>startEditing(e)}>Editar</button>
        }
        </form>
        
        
      </div>

      
    </div>
  </Container>

  );
};

export default MainInfoClient;