// service/request/index.ts
import axios from "axios";
// import { showToast } from "vant";
// import { showSuccessToast, showFailToast } from "vant";
// import "vant/lib/toast/style";
// import { showNotify } from "vant";
class HYRequest {
    instance;
    constructor(config) {
        this.instance = axios.create(config);
        this.instance.interceptors.request.use((config) => {
            // console.log("全局请求成功的拦截", config);
            return config;
        }, (err) => {
            console.log("全局请求失败的拦截", err);
            return err;
        });
        this.instance.interceptors.response.use((res) => {
            console.log("全局响应成功的拦截", res);
            // showToast("响应成功");
            // showNotify("响应成功");
            return res;
        }, (err) => {
            console.log("全局响应失败的拦截", err);
            // showToast("响应失败");
            // showNotify("响应失败");
            return err;
        });
        if (config.interceptors) {
            // 针对单个实例添加拦截器
            this.instance.interceptors.request.use(config.interceptors?.requestSuccessFn, config.interceptors?.requestFailureFn);
            this.instance.interceptors.response.use(config.interceptors?.responseSuccessFn, config.interceptors?.responseFailureFn);
        }
    }
    request(config) {
        return this.instance.request(config);
    }
}
export default HYRequest;
