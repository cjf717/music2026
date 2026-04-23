import hyRequest from "..";
export function qingtingFMPlayBillsRequest(url: string) {
  return hyRequest.request({ url: url, method: "GET" });
}
