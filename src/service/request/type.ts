// service/request/type.ts
// 在axios最新版本中请求拦截器的类型，已经从AxiosRequestConfig变成了InternalAxiosRequestConfig
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

// 针对AxiosRequestConfig配置进行扩展
export interface HYInterceptors {
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  requestFailureFn?: (err: any) => any;
  responseSuccessFn?: (res: AxiosResponse) => AxiosResponse;
  responseFailureFn?: (err: any) => any;
}

export interface HYRequestConfig extends AxiosRequestConfig {
  interceptors?: HYInterceptors;
}
