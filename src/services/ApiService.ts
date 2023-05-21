export class ApiService{
  public async updateProfilePicture(entity: string, fr: FileReader, token: string){
    try {

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/${entity}/`, {
        method: 'PUT',
        body: JSON.stringify({
          profilePicture: fr.result
        }),
        headers:{
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      const text = await response.text()
  
      return text
      
    } catch (error) {
      console.log(error)
    }

  }

  public async updateCoverPicture(accountType: string, fr: FileReader, token: string){
    try {

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/${accountType}/`, {
        method: 'PUT',
        body: JSON.stringify({
          coverPicture: fr.result
        }),
        headers:{
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      const text = await response.text()
  
      return text
      
    } catch (error) {
      console.log(error)
    }

  }
}