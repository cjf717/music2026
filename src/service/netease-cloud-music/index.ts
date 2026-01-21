import hyRequest from "..";
export function fetchSearch(keywords: string = "中国人") {
  return hyRequest.request({
    url: "cloudsearch",
    params: { keywords },
    method: "GET",
  });
}
export function matchMusic(id: number) {
  return hyRequest.request({
    url: "song/url/match",
    params: { id },
    method: "GET",
  });
}
