import axios from "axios";
import { getToke } from "../utils/localStorageUtils";

export let ip = "http://127.0.0.1:8081"

export class API {
  BASE_URL = ip
  baseJsonHeaders = {
    "Content-Type": "application/json",
  };

  baseFormHeaders = {
    "Content-Type": "multipart/form-data",
    Athorization:  this.token,
  };
  token = null

  async getHeaders (protectedRoute=false) {
    // this.token = await restoreToken()
    // console.log(`There it is again ${this.token}`)
    const response = getToke()
    if(response){
      this.token = response
    } 

    const headers = (protectedRoute && this.token)
      ? { ...this.baseJsonHeaders, Authorization: this.token }
      : this.baseJsonHeaders;

    // console.log(headers)
    return headers
  }

  async getRequest(endpoint, protectedRoute = false) {
    const headers = await this.getHeaders(protectedRoute);
    // console.log(this.BASE_URL)
   
    try {
      const response = await axios({
        method: "get",
        url: `${this.BASE_URL}${endpoint}`,
        headers: headers,
      });

      return response;
    } catch (e) {
        throw e
    }
  }

  async postRequest(endpoint, body, protectedRoute = false) {
    try {
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
    } catch (e) {
      throw e
  }
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
      return  e ;
    }
  }

  
}

