class AppData {
  constructor(){
    this.data = {}
  }

  setAccessToken(token){
    this.data.accessToken = token
  }

  getAccessToken(){
    return this.data.accessToken
  }
}

export default new AppData()