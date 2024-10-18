import axios from "axios";
import { getToke } from "../utils/localStorageUtils";
import { getFirstItemFromIndexedDB } from "../helpers/indexedDB";

export const ip = process.env.REACT_APP_BASE_URL_LOCAL;


console.log(ip)
export class API {
  BASE_URL = process.env.REACT_APP_BASE_URL_LOCAL
  // BASE_URL = "https://rri-backend.mosipcmuafrica.me/api"
  baseJsonHeaders = {
    "Content-Type": "application/json",
  };

  baseFormHeaders = {
    "Content-Type": "multipart/form-data",
    Athorization: this.token,
  };
  token = null

  async getHeaders(protectedRoute = false) {
    // this.token = await restoreToken()
    // console.log(`There it is again ${this.token}`)
    const data = await getFirstItemFromIndexedDB('GoogleCredentialsDB', 'CredentialsStore')
      .catch((error) => {
        console.error('Error:', error);
        return null; // Return null if there's an error
      });
    // Check if data exists and retrieve the accessToken
    if (data && data.accessToken) {
      this.token = data.accessToken; // Save the token
    } else {
      console.log('No data found in IndexedDB.');
      this.token = null; // Ensure token is null if not found
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
      console.log('protected: ', protectedRoute)
      // Await the result of getHeaders (which returns a promise)
      const headers = await this.getHeaders(protectedRoute);

      console.log('Authorization Header:', headers.Authorization); // Verify the headers are correctly resolved

      // Make the POST request with axios
      const response = await axios({
        method: "post",
        url: `${this.BASE_URL}${endpoint}`,
        headers: headers,  // Use the resolved headers here
        data: body,        // Pass the body of the request
      });

      return response;  // Return the response after the request
    } catch (e) {
      console.error('Error in postRequest:', e);  // Log any errors for debugging
      throw e;  // Rethrow the error to handle it outside the function
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
      console.log('response: ',response)
      return response;
    } catch (e) {
      return e;
    }
  }


}

