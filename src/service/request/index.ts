// service/request/index.ts
import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import type { HYRequestConfig } from "./type";
// import { showToast } from "vant";
// import { showSuccessToast, showFailToast } from "vant";
// import "vant/lib/toast/style";
// import { showNotify } from "vant";

class HYRequest {
  instance: AxiosInstance;
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("全局请求成功的拦截", config);
        return config;
      },
      (err) => {
        // console.log("全局请求失败的拦截", err);
        return Promise.reject(err);
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // console.log("全局响应成功的拦截", res);
        // showToast("响应成功");
        // showNotify("响应成功");
        return res.data;
      },
      (err) => {
        // console.log("全局响应失败的拦截", err);
        // showToast("响应失败");
        // showNotify("响应失败");
        return Promise.reject(err);
      }
    );

    // 针对单个实例添加拦截器
    this.instance.interceptors.request.use(config.interceptors?.requestSuccessFn, config.interceptors?.requestFailureFn);
    this.instance.interceptors.response.use(config.interceptors?.responseSuccessFn, config.interceptors?.responseFailureFn);
  }

  request<T = any>(config: HYRequestConfig<T>) {
    // 单次接口请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config as InternalAxiosRequestConfig);
    }
    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应成功的拦截器
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }
          resolve(res);
        })
        .catch((err: any) => {
          // 单次响应失败的拦截器
          if (config.interceptors?.responseFailureFn) {
            err = config.interceptors.responseFailureFn(err);
          }
          reject(err);
        });
    });
  }
  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "GET" });
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "POST" });
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "DELETE" });
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default HYRequest;
