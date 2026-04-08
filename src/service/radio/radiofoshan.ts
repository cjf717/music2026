import hyRequest from "..";
export function fetchPlayList(url: string) {
  return hyRequest.request({
    url: url,
    // params: { keywords, limit, offset },
    method: "GET",
  });
}
