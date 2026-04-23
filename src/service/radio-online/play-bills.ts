import hyRequest from "..";
export function playBillsRequest(url: string) {
  return hyRequest.request({ url: url, method: "GET" });
}
