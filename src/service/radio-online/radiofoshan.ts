import hyRequest from "..";
export function foshanPlayListRequest(url: string) {
  return hyRequest.get({
    url: url,
    // params: { keywords, limit, offset },
  });
}
