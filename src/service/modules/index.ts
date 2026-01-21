// service/modules/index.ts
import hyRequest from "..";
const BASE_URL = "http://httpbin.org/";
export function getDemo() {
  return hyRequest.request({ baseURL: BASE_URL, url: "get" });
}
