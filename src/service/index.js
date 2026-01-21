// service/index.ts
import { BASE_URL, TIME_OUT } from "./request/config";
import HYRequest from "./request";
const hyRequest = new HYRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    // 实例拦截器
    interceptors: {
        requestSuccessFn: (config) => {
            // console.log("单个实例的请求成功的拦截");
            return config;
        },
        requestFailureFn: (err) => {
            // console.log("单个实例的请求失败的拦截");
            return err;
        },
        responseSuccessFn: (res) => {
            // console.log("单个实例的响应成功的拦截");
            return res;
        },
        responseFailureFn: (err) => {
            // console.log("单个实例的响应失败的拦截");
            return err;
        },
    },
});
export default hyRequest;
