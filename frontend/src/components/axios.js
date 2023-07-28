import axios from 'axios';

export const BASE_URL = 'http://localhost:7000';


class APIService {
  constructor() {
    if (!APIService.instance) {
      APIService.instance = this;
    }
    return APIService.instance;
  }

  getHeaders = () => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };
    const authToken = localStorage.getItem('token');
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    return headers;
  };

  axiosSetup=()=>{
    const myAxios = axios.create({
        baseURL: BASE_URL,
        headers:this.getHeaders(),
        timeout: 5000
    })
    return myAxios
  };
  
  get(url) {
    const getData= async(url)=>{
        let getAxios =  this.axiosSetup()
        const response  = await getAxios.get(url)
        return response
    }
    return getData(url)
  }

  post(url, data) {
    const getData= async(url,data)=>{
        let getAxios =  this.axiosSetup()
        const response  = await getAxios.post(url,data)
        return response
    }
    return getData(url,data)
  }

 

}
const instance = new APIService();
export default instance;