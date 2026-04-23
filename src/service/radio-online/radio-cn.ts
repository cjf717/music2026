import hyRequest from "..";
export function broadcastRequest(provinceCode: number, categoryId: string, sign: string, timestamp: number) {
  return hyRequest.request({
    baseURL: "https://ytmsout.radio.cn/",
    url: "web/appBroadcast/list",
    params: { provinceCode, categoryId },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      sign: sign,
      timestamp: timestamp,
      platformCode: "WEB",
      equipmentId: "0000",
      version: "4.0.0",
    },
  });
}
