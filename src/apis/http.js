import axios from "axios";

export let ip = "http://127.0.0.1:8081"

export class API {
  BASE_URL = ip
  baseJsonHeaders = {
    "Content-Type": "application/json",
  };

  baseFormHeaders = {
    "Content-Type": "multipart/form-data",
    Athorization: "Token " + this.token,
  };
  token = "";

  constructor () {
    this.token = localStorage.getItem('token')
    // restoreToken().then((res)=>{
    //     if(res){
    //       this.token =  `${res}`
    //     }
    // })
  }

  async getHeaders (protectedRoute=false) {
    // this.token = await restoreToken()
    // console.log(`There it is again ${this.token}`)

    const headers = protectedRoute
      ? { ...this.baseJsonHeaders, Authorization: "Token " + this.token }
      : this.baseJsonHeaders;

    // console.log(headers)
    return headers
  }

  async getRequest(endpoint, protectedRoute = false) {
    const headers = await this.getHeaders(protectedRoute);
    console.log(this.BASE_URL)
   
    try {
      const response = await axios({
        method: "get",
        url: `${this.BASE_URL}${endpoint}`,
        headers: headers,
      });

      return response;
    } catch (e) {
      return { error: e };
    }
  }

  async postRequest(endpoint, body, protectedRoute = false) {
      // console.table("Here we are")
      const headers = await this.getHeaders(protectedRoute);
      // console.log(headers)
      const response = await axios({
        method: "post",
        url: `${this.BASE_URL}${endpoint}`,
        headers: headers,
        data:body,

      });
      // const response = await axios.post(this.BASE_URL+endpoint, body, {
      //   headers: headers,
      // });
     
      return response;
    
  }

  async putRequest(endpoint, body, protectedRoute = false) {
    const headers = this.getHeaders(protectedRoute);
    try {
      const response = await axios({
        method: "put",
        url: `${this.BASE_URL}${endpoint}`,
        headers: headers,
        data: body,
      });

      return response;
    } catch (e) {
      return { error: e };
    }
  }

  
}

