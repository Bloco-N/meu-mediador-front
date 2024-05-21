import React, { useContext, useEffect, useRef, useState } from 'react';
import profileIcon from '../../public/profile.svg'
import PictureModalContext from 'context/PictureModalContext';
import { PictureModalContextType } from '@/types/PictureModalContextType';
import editIcon from '../../public/edit.svg'
import whatsappIcon from '../../public/whatsapp.svg'
import mailIcon from '../../public/mail.svg'
import webIcon from '../../public/web.svg'
import instagramIcon from '../../public/instagram.svg'
import facebookIcon from '../../public/facebook.svg'
import greyImage from '../../public/grey.png'
import UserContext from 'context/UserContext';
import { UserContextType } from '@/types/UserContextType';
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import Link from 'next/link';
import { ApiService } from '@/services/ApiService';
import { useRouter } from 'next/router';
import { AgencyProfile } from '@/types/AgencyProfile';
import MainInfoAgencyEditModalContext from 'context/MainInfoAgencyEditModal';
import locales from 'locales';
import SimplePopup from '../Popup';
import IconTrash from '../../public/icons-trash.png';
import * as C from './styles'
import { CropImage, Img, MainInfoProfileEditModal, Modal, ModalCity, ModalLanguage, RenderConditional, Spinner } from '@components/index';
import axios from 'axios';
import api from '@/services/api';
import { useIsMobile } from 'hooks';


type MainInfoAgencyProps = {
  userSigned: AgencyProfile
  isProfile: boolean
  onTrash?:() => void
}

const MainInfoAgency = ({ userSigned , isProfile, onTrash}: MainInfoAgencyProps) => {

  const { setData } = useContext(PictureModalContext) as PictureModalContextType

  const { user, setUser } = useContext(UserContext) as UserContextType
  const isMobile = useIsMobile()

  const { setOpen: mainInfoSetOpen } = useContext(MainInfoAgencyEditModalContext) as ModalOpenContextType

  const [openModalEditPictures, setOpenModalEditPictures] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalCity, setCityModalOpen] = useState(false);
  const [openModalLanguage, setLanguageModalOpen] = useState(false);
  const [sessionProfile, setSessionProfile] = useState(false)

  const childSizeModal = {
    width: "90rem",
    height:isMobile? "98%": "100%",
    radius: 10,
  };

  const childSizeModalCity = {
    width: "100%",
    height: "100%",
    radius: 10,
  };

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  useEffect(() => {
     const localId = localStorage.getItem('id')
    const accounType = localStorage.getItem('accountType')
    if(Number(localId) === userSigned?.id && accounType === 'agency'){
      setSessionProfile(true)
    } 

  }, [user.id, userSigned?.id])

  function printCities() {
    const cities = userSigned?.AgencyCities?.map((city) => city.City.name);
    if (typeof window !== 'undefined'){
      if (window.innerWidth < 768) {
        return cities?.length > 0 ? ` ${cities[0]}` : "Ainda não adicionou cidades";
      } else {
        if (cities?.length > 3) return ` ${cities[0]}, ${cities[1]}`;
        if (cities?.length === 3)
          return ` ${cities[0]}, ${cities[1]} e ${cities[2]}`;
        if (cities?.length === 2) return ` ${cities[0]} e ${cities[1]}`;
        if (cities?.length === 1) return ` ${cities[0]}`;
        return "Ainda não adicionou cidades";
      }
    }
  }

  function printLanguage() {
    const cities = userSigned?.AgencyLanguages?.map((city) => city.Language?.name);
    if (typeof window !== 'undefined'){
      if (window.innerWidth < 768) {
        return cities?.length > 0 ? ` ${cities[0]}` : "Ainda não adicionou cidades";
      } else {
        if (cities?.length > 3) return ` ${cities[0]}, ${cities[1]}`;
        if (cities?.length === 3)
          return ` ${cities[0]}, ${cities[1]} e ${cities[2]}`;
        if (cities?.length === 2) return ` ${cities[0]} e ${cities[1]}`;
        if (cities?.length === 1) return ` ${cities[0]}`;
        return "Ainda não adicionou cidades";
      }
    }
  }
  return (

  <C.Container isProfile={isProfile}>
    <div className="main-info border">
      <div className='top'>
        {isProfile && (
          <>
            <Img id="coverPicture" height={1000} width={1000} file={greyImage} url={`${process.env.NEXT_PUBLIC_URL_STORAGE_UPLOADS}/${userSigned?.coverPicture}`} validateURL={!!userSigned?.coverPicture} alt='cover image' className='cover-photo'/>

            {sessionProfile && (
              <>
                <div className='deletAccount-back'>
                  <span onClick={onTrash}>
                  <Img file={IconTrash} alt="Trash Icon" color='#b5b3b3' />
                  </span>
                </div>
                <div className='label-back'>
                  <label htmlFor="cover-pic" onClick={() => setOpenModalEditPictures(true)}>
                    <Img className='edit-main' file={editIcon} alt='edit icon'/>
                  </label>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <Img 
        width={100}
        height={100}
        file={profileIcon}
        url={`${process.env.NEXT_PUBLIC_URL_STORAGE_UPLOADS}/${userSigned?.profilePicture}`}
        onClick={isProfile ? () => setData({open: true, userSigned}) : () => {}}
        className= {isProfile ? "profile profile-pointer" : 'profile' }
        alt='profile icon'
        id="profilePicture"
         />
      { isProfile && sessionProfile ? (
          <Img onClick={() => setOpenModalEdit(true)} className='edit-main' file={editIcon} alt='edit icon'/>
      ): ''}

      <div className="sub-content">
        <div className="about">
          <h1>{userSigned?.name}</h1>
        </div>
        <div className="about-2">
        {userSigned?.AgencyCities && (
          <p>
             <div className="cities">
                  <b style={{marginRight: "5px"}}>{t.mainInfo.workArea}</b>
                  
                  <span>{printCities()}</span>
                  {userSigned.AgencyCities.length > 3 ? (
                      <>
                      <span> e outras </span>
                      <SimplePopup textPopupList={t.mainInfo.cityPopup.textPopupList} qtdeCitys={userSigned.AgencyCities.length - 2} cities={userSigned.AgencyCities}/>
                      <span>cidades</span>
                      </>
                  ) : (
                    ""
                  )}
                </div>
            </p>
        )}
        <p> 
        <div className='idomas'>
            <b>
            {t.mainInfo.languages}
            </b>
            <span>{printLanguage()}</span>
            {userSigned?.AgencyLanguages?.length > 3 ? (
                      <>
                      <span> e outras </span>
                      <SimplePopup textPopupList={t.mainInfo.cityPopup.textPopupListLanguage} qtdeCitys={userSigned?.AgencyLanguages?.length - 2} cities={userSigned?.AgencyLanguages}/>
                      <span>cidades</span>
                      </>
                  ) : (
                    ""
                  )}
            {/* {userSigned?.AgencyLanguages?.map((language, index) => (
              ` ${language.Language.name} ${index < userSigned.AgencyLanguages.length -1 ? ',': ''} `
              ))} */}
              </div>
          </p>
          <p><b>{"Email: "}</b>{userSigned?.email}</p>
          <p><b>{"Telefone: "}</b>{userSigned?.phone}</p>
          <p><b>{"Endereço: "}</b>{userSigned?.address}</p>
        </div>
      </div>

      {isProfile ?  (
        <div className="contact">
          {userSigned?.email ? (
            <Link href={'mailto: ' + userSigned.email} target='_blank'>
              <Img className='icon' file={mailIcon} alt='mail icon'/>
            </Link>
          ) : '' }
          {userSigned?.website ? (
            <Link href={userSigned.website} target='_blank'>
              <Img className='icon' file={webIcon} alt='web icon'/>
            </Link>
          ) : '' }
          {userSigned?.whatsapp ? (
            <Link href={'https://wa.me/' + userSigned.whatsapp.split(' ').join('') + `${userSigned.wppText ? '?text=' + encodeURI(userSigned.wppText) :''}` } target='_blank'>
              <Img className='icon' file={whatsappIcon} alt='whatsapp icon'/>
            </Link>
          ) : '' }
          {userSigned?.instagram ? (
            <Link href={userSigned.instagram} target='_blank'>
              <Img className='icon' file={instagramIcon} alt='instagram icon'/>
            </Link>
          ) : '' }
          {userSigned?.facebook ? (
            <Link href={userSigned.facebook} target='_blank'>
              <Img className='icon' file={facebookIcon} alt='facebook icon'/>
            </Link>
          ) : '' }
        </div>
      ): ''}
      
    </div>

    <Modal
        isOpen={openModalEditPictures}
        onClose={() => setOpenModalEditPictures(false)}
        childSize={{ height: "100%", width: "100%", radius: 10 }}
      >
        <ModalChangePictures
          profile={userSigned}
          open={openModalEditPictures}
          setOpen={setOpenModalEditPictures}
        />
      </Modal>

      <Modal
        isOpen={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
        childSize={childSizeModal}
      >
        <MainInfoProfileEditModal
          setOpen={setOpenModalEdit}
          setOpenCity={setCityModalOpen}
          setOpenLanguage={setLanguageModalOpen}
        />
      </Modal>

      <Modal
        isOpen={openModalCity}
        onClose={() => setCityModalOpen(false)}
        childSize={childSizeModalCity}
      >
        <ModalCity setOpen={setCityModalOpen} />
      </Modal>

      <Modal
        isOpen={openModalLanguage}
        onClose={() => setLanguageModalOpen(false)}
        childSize={childSizeModalCity}
      >
        <ModalLanguage setOpen={setLanguageModalOpen} />
      </Modal>
  </C.Container>

  );
};

export default MainInfoAgency;


interface ModalChangePicturesProps {
  profile: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalChangePictures: React.FC<ModalChangePicturesProps> = ({
  profile,
  open,
  setOpen,
}) => {
  const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);

  const [progress1, setProgress1] = useState<number>(0);
  const [progress2, setProgress2] = useState<number>(0);

  const [isUploadComplete1, setIsUploadComplete1] = useState<boolean>(false);
  const [isUploadComplete2, setIsUploadComplete2] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const profileImageRef = useRef<HTMLImageElement>(null);
  const coverImageRef = useRef<HTMLImageElement>(null);

  const cropImageRef1 = useRef<any>(null);
  const cropImageRef2 = useRef<any>(null);

  useEffect(() => {
    handlePreviewImagesDefault();
  }, [profile, open]);


  const handlePreviewImagesDefault = () => {
    if (profile?.profilePicture) {
      if (profileImageRef.current) {
        profileImageRef.current.src = `${process.env.NEXT_PUBLIC_URL_STORAGE_UPLOADS}/${profile.profilePicture}`;
      }
    }
    if (profile?.coverPicture) {
      if (coverImageRef.current) {
        coverImageRef.current.src = `${process.env.NEXT_PUBLIC_URL_STORAGE_UPLOADS}/${profile.coverPicture}`;
      }
    }
  };

  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile1(e.target.files[0]);
      cropImageRef1.current?.open();
      setIsUploadComplete1(false)
      setProgress1(0)
    }
  };

  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile2(e.target.files[0]);
      cropImageRef2.current?.open();
      setIsUploadComplete2(false)
      setProgress2(0)
    }
  };

  const handleChangeCover = (file: File | null, idImage: string) => {
    if (FileReader && file) {
      const fr = new FileReader();
      const onload = async () => {
        const img = document.getElementById(idImage) as HTMLImageElement;
        img.src = fr.result as string;
      };
      fr.onload = onload;
      fr.readAsDataURL(file);
    }
  };

  const handleUpload = async (
    file: File | null,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    setIsUploadComplete: React.Dispatch<React.SetStateAction<boolean>>,
    nameFile: string
  ) => {
    if (!file) return;
    setProgress(0);
    setIsUploadComplete(false);

    const fileName = `${nameFile}${file.type?.replace("image/", ".")}`;

    const formData = new FormData();
    formData.append("file", file, fileName);

    await axios
    .post("https://storage-production-7c83.up.railway.app/api/save?projectName=uploads&projectScope", formData, {
      onUploadProgress: (progressEvent:any) => {
        let progress: number = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        setProgress(progress)
        console.log(`A imagem ${file.name} está ${progress}% carregada... `);
      },
    })
    .then(async(response) => {
      console.log(`A imagem ${file.name} já foi enviada para o servidor!`);
    })
    .catch((err) => {
      console.error(`Houve um problema ao fazer upload da imagem ${file.name} no servidor`);
      console.log(err);
    });

    await api.put("agency/picture", {[nameFile?.split("-")[1]]:fileName})
    .then(() => {
      setIsUploadComplete(true)
      setProgress(0)
    })
    .catch(err => console.log(err.message))
  };

  const handleSave = async() => {

    if(!selectedFile1 && !selectedFile2) return 

    setIsLoading(true)

    if(selectedFile1){
      await handleUpload1()
    }

    if(selectedFile2){
      await handleUpload2()
    }
    handleClose()
  };

  const handleUpload1 = async() => {
    await handleUpload(selectedFile1, setProgress1, setIsUploadComplete1, `A${profile?.id}-profilePicture`);
    handleChangeCover(selectedFile1, 'profilePicture');
    handleChangeCover(selectedFile1, 'profilePictureNav');
    localStorage.setItem("pic",`A${profile?.id}-profilePicture${selectedFile1?.type?.replace("image/", ".")}`)
  }

  const handleUpload2 = async() => {
    await handleUpload(selectedFile2, setProgress2, setIsUploadComplete2, `A${profile?.id}-coverPicture`);
    handleChangeCover(selectedFile2, 'coverPicture');
  }


  const handleClose = () => {
    setSelectedFile1(null);
    setSelectedFile2(null);
    setProgress1(0);
    setProgress2(0);
    setIsUploadComplete1(false);
    setIsUploadComplete2(false);
    setOpen(false);
    setIsLoading(false)
  };

  return (
    <C.Modal>
      <C.ModalContent>
        <C.PreviewCardProfile>
          <C.PreviewCardProfileTop>
            {selectedFile1 && (
              <C.PreviewProfileImage
                src={URL.createObjectURL(selectedFile1)}
                alt="Selected"
              />
            )}
            {!selectedFile1 && (
              <C.PreviewProfileImage ref={profileImageRef} alt="Selected" />
            )}

            {selectedFile2 && (
              <C.PreviewProfileCoverImage
                src={URL.createObjectURL(selectedFile2)}
                alt="Selected"
              />
            )}
            {!selectedFile2 && (
              <C.PreviewProfileCoverImage ref={coverImageRef} alt="Selected" />
            )}
          </C.PreviewCardProfileTop>

          <C.PreviewCardProfileBottom>
            <C.FileInputContainer>
              <label htmlFor="inputFile1">
                <span />
                <p>Alterar Foto de Perfil</p>
                <Img width={40} file={editIcon} alt="edit icon" />
              </label>
              <input id="inputFile1" type="file" onChange={handleFileChange1} />
              <RenderConditional isTrue={isUploadComplete1}>
                <span><b>Upload Concluido!</b></span>
              </RenderConditional>
              {(selectedFile1 && !isUploadComplete1) &&(
                <>
                  <C.ProgressBar>
                    <C.Progress width={progress1}>
                      <p>{progress1}%</p>
                    </C.Progress>
                  </C.ProgressBar>                                                                                                                      
                </>
              )}
            </C.FileInputContainer>

            <C.FileInputContainer>
              <label htmlFor="inputFile2">
                <span />
                <p>Alterar Foto de capa</p>
                <Img width={40} file={editIcon} alt="edit icon" />
              </label>
              <input id="inputFile2" type="file" onChange={handleFileChange2} />

              <RenderConditional isTrue={isUploadComplete2}>
                  <span><b>Upload Concluido!</b></span>
              </RenderConditional>

              {(selectedFile2 && !isUploadComplete2) && (
                <>
                  <C.ProgressBar>
                    <C.Progress width={progress2}>
                      <p>{progress2}%</p>
                    </C.Progress>
                  </C.ProgressBar>
                </>
              )}
            </C.FileInputContainer>
          </C.PreviewCardProfileBottom>
        </C.PreviewCardProfile>

        <CropImage
          ref={cropImageRef1}
          src={selectedFile1}
          onCrop={setSelectedFile1}
        />
        <CropImage
          ref={cropImageRef2}
          src={selectedFile2}
          onCrop={setSelectedFile2}
        />

        <C.FooterChangePictures>
          <button onClick={handleClose}>
            Fechar
          </button>

          <button
            disabled={isLoading}
            onClick={handleSave}
            style={{
              backgroundColor: 'green'
            }}
          >
            <RenderConditional isTrue={isLoading}>
                Aplicando as alteraçoes... <Spinner/>
            </RenderConditional>
            
            <RenderConditional isTrue={!isLoading}>
              Aplicar alterações
            </RenderConditional>
          </button>
        </C.FooterChangePictures>
      </C.ModalContent>
    </C.Modal>
  );
};
