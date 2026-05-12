export function proxyUrl(url: string) {
  // const proxy = "https://proxy.jef.cc.cd/?target=";
  const proxySite = import.meta.env.VITE_PROXY_SITE;
  return proxySite + url;
}
