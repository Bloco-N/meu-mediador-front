import api from "./api"

export class ApiService{
  public async updateProfilePicture(entity: string, fr: FileReader, token: string){
    try {
      const data =  await  api.put(`/${entity}/`,{ profilePicture: fr.result})
      return data.data
      
    } catch (error) {
      console.log(error)
    }

  }

  public async updateCoverPicture(accountType: string, fr: FileReader, token: string){
    try {

      const data = await api.put(`/${accountType}/`,{ coverPicture: fr.result})
      return data.data
      
    } catch (error) {
      console.log(error)
    }

  }

  public async updateCoverPictureString(accountType: string, coverPicture: string, token: string){
    try {
     const data = await api.put(`/${accountType}/`,{ coverPicture: coverPicture})
     return data.data
      
    } catch (error) {
      console.log(error)
    }

  }

  //-------------------------------------------------------------------

  //get
  //realtor information
  public async getRealtorInformation(accountId: string){
    try {
      const data = await api.get(`/realtor/${accountId}`)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  public async getAgencyInformation(accountId: string){
    try {
      const data = await api.get(`/agency/${accountId}`)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  //get
  //realtor services
  public async getRealtorServices(accountId: string){
    try {
      const data = await api.get(`/service/realtor/${accountId}`)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  //get
  //realtor properties
  public async getRealtorProperties(accountId: string){
    try {
      const data = await api.get(`/property/realtor/${accountId}`)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  //get
  //realtor awards
  public async getRealtorAwards(accountId: string){
    try {
      const data = await api.get(`/award/realtor/${accountId}`)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  //get
  //realtor courses
  public async getRealtorCourses(accountId: string){
    try {
      const data = await api.get(`/course/realtor/${accountId}`)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  //get
  //realtor partnership
  public async getRealtorPartnership(accountId: string){
    try {
      const data = await api.get(`/partnership/realtor/${accountId}`)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  //get
  //realtor comments
  public async getRealtorComments(accountId: string){
    try {
      const data = await api.get(`/comment/realtor/${accountId}`)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  //-------------------------------------------------------------------

  //delete
  //realtor service
  public async deleteService(token: string, serviceId: number, accountType: string){
    try {
      const data = await api.delete(`/service/${accountType}/${serviceId}`)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  //delete
  //realtor property
  public async deleteRealtorProperty(token: string, propertyId: string, entity: string){
    try {
      const data = await api.delete(`/property/${entity}/${propertyId}`)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  //delete
  //realtor award
  public async deleteRealtorAward(token: string, awardId: string){
    try {
      const data = await api.delete(`/award/${awardId}`)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  //delete
  //realtor courses
  public async deleteRealtorCourse(token: string, courseId: string){
    try {
      const data = await api.delete(`/course/${courseId}`)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  //delete
  //realtor partnership
  public async deleteRealtorPartnership(token: string, partnershipId: string){
    try {
      const data = await api.delete(`/partnership/${partnershipId}`)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  public async deleteComment(token: string, commentId: string){
    try {
      const data = await api.delete(`/comment/realtor/${commentId}`)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  //---------------------------------------------------------------------------------------

  //create
  //realtor service
  public async createRealtorService(localId: number, serviceId: number){
    try {
     const data = await api.post(`/service/realtor`, {
        serviceId: Number(serviceId),
        realtorId: Number(localId)
      })
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  //update
  //realtor about
  public async updateRealtorAbout(token: string, introduction: string){
    try {
      const data = await api.put(`/realtor/`,{
        introduction
      })
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  //create
  //realtor property
  public async createRealtorProperty(localId: number, data: any, pic: string, price: number, grossArea: number, usefulArea: number){
    try {
      const dataFunc = await api.post(`/property`, {
        propertyData:{
          ...data,
          price,
          grossArea,
          usefulArea,
          profilePicture: pic,
        },
        realtorId: Number(localId)
      })
      return dataFunc.data
    } catch (error) {
      console.log(error)
    }
  }

  //create
  //realtor award
  public async createRealtorAward(localId: number, title: any){
    try {
      const data = await api.post(`/award`, {
        title,
        realtorId: Number(localId)
      })
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  //create
  //realtor partnership
  public async createRealtorPartnership(localId: number, data: any){
    try {
      const dataFunc = await api.post(`/partnership`, {
        ...data,
        realtorId: Number(localId)
      })
      return dataFunc.data
    } catch (error) {
      console.log(error)
    }
  }


}

