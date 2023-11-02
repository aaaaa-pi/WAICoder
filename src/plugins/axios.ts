// Add a request interceptor
import axios from "axios";
import { OpenAPI } from "../../generated";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// 携带凭证
OpenAPI.WITH_CREDENTIALS = true;
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8121"
    : "http://8.130.113.31";

OpenAPI.BASE = baseUrl;
// console.log("当前环境：", process.env.NODE_ENV, "请求地址", baseUrl);
