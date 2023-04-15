import '@/styles/globals.css'
import { RealtorList } from '@/types/RealtorList'
import Layout from 'components/Layout'
import SearchContext from 'context/SearchContext'
import SearchResultContext from 'context/SearchResultContext'
import UserContext from 'context/UserContext'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { RealtorProfile } from '@/types/RealtorProfile'
import { User } from '@/types/User'
import ProfilePictureMoldal from 'components/ProfilePictureModal'
import { PictureModalData } from '@/types/PictureModalData'
import PictureModalContext from 'context/PictureModalContext'
import MainInfoProfileEditModal from 'components/MainInfoProfileEditModal'
import MainInfoProfileEditModalContext from 'context/MainInfoProfileEditModalContext'
import AddPropertyModal from 'components/AddPropertyModal'
import AddPropertyModalContext from 'context/AddPropertyModalContext'
import AddServiceModal from 'components/AddServiceModal'
import AddServiceModalContext from 'context/AddServiceModalContext'

export default function App({ Component, pageProps }: AppProps) {

  const [dataPictureModal, setDataPictureModal] = useState<PictureModalData>({
    open: false,
    realtor: null
  })

  const [openAddPropertyModal, setOpenAddPropertyModal] = useState(false)

  const [openAddServiceModal, setOpenAddServiceModal] = useState(false)

  const [openMainInfoModal, setOpenMainInfoModal] = useState(false)

  const [user, setUser] = useState<User>({
    id: null,
    token:'',
    profilePicture: null
  })

  const [search, setSearch] = useState('')

  const [searchResult, setSearchResult] = useState<RealtorList>({
    list: [] as RealtorProfile [],
    currentPage: 0,
    totalOfPages: 0
  })

  useEffect(() => {
    setUser({
      token: localStorage.getItem('token') as string,
      id: null,
      profilePicture: null
    })
  }, [])

  return (
    <SearchContext.Provider value = {{search, setSearch}}>
      <SearchResultContext.Provider value = {{ searchResult, setSearchResult}}>
        <UserContext.Provider value = {{user, setUser}}>
          <PictureModalContext.Provider value = {{data: dataPictureModal, setData: setDataPictureModal}}>
            <MainInfoProfileEditModalContext.Provider value= {{open:openMainInfoModal, setOpen:setOpenMainInfoModal}}>
                <AddPropertyModalContext.Provider value={{open: openAddPropertyModal, setOpen: setOpenAddPropertyModal}}>
                  <AddServiceModalContext.Provider value={{open: openAddServiceModal, setOpen: setOpenAddServiceModal}}>
                    <ProfilePictureMoldal data={dataPictureModal} setData={setDataPictureModal}/>    
                    <MainInfoProfileEditModal open={openMainInfoModal} setOpen={setOpenMainInfoModal}/>
                    <AddPropertyModal open={openAddPropertyModal} setOpen={setOpenAddPropertyModal}/>
                    <AddServiceModal open={openAddServiceModal} setOpen={setOpenAddServiceModal}/>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </AddServiceModalContext.Provider>
                </AddPropertyModalContext.Provider>
            </MainInfoProfileEditModalContext.Provider>
          </PictureModalContext.Provider>
        </UserContext.Provider>
      </SearchResultContext.Provider>
    </SearchContext.Provider>
    ) 
}
