import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://apiluc.zendvn.com/api/',
    headers: {'accept': 'application/json'}
  });

  export default axiosInstance
  // 