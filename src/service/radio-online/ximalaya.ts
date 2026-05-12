import hyRequest from "..";
export function ximalayaPlayBillsRequest(url: string) {
  return hyRequest.get({
    baseURL: "https://live.ximalaya.com/",
    url: url,
    headers: {
      // "User-Agent": "Restfox/0.40.0",
      media: "media",
      // "Content-Type": "text/plain;charset=UTF-8",
      // sign: sign,
      // timestamp: timestamp,
      // platformCode: "WEB",
      // equipmentId: "0000",
      // version: "4.0.0",
    },
  });
}
