import hyRequest from "..";
export function qingtingFMPlayBillsRequest(url: string) {
  return hyRequest.get({ url: url });
}
