import axios from "axios";
import router from "../router";

const redirectNotAuthorized = () => {
  router.push("/");
};

const axiosInstance = axios.create({
  baseURL: "http://apiluc.zendvn.com/api/",
  headers: { accept: "application/json" }
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const {
      response: { status }
    } = error;
    if (status === 401) {
      redirectNotAuthorized();
    }
  }
);

export default axiosInstance;
