import { defineStore } from "pinia";
import { proxyUrl } from "@/utils/proxyUrl";
import type { platformType, IRadio, IRadioOnlineList } from "./type";
import { getQingtingFM, getXimalaya, getFoshanRadio, getHongkongRadio, getRadioChina } from "@/service/radio-online/radio-online";
import { qingtingFMPlayBillsRequest } from "@/service/radio-online/qingtingFM";
import { ximalayaPlayBillsRequest } from "@/service/radio-online/ximalaya";
import { foshanPlayListRequest } from "@/service/radio-online/radiofoshan";

export const useRadioOnlineStore = defineStore("radio-online", {
  state: (): IRadioOnlineList => ({
    // title: "默认标签",
    radioOnlineList: [],
    playbills: null,
  }),
  // getters: {
  //   doubleCount: (state) => state.count * 2,
  // },
  actions: {
    radioListAction() {
      const qingtingFM: IRadio[] = getQingtingFM().map((item) => {
        return {
          id: item.id,
          platform: "蜻蜓FM",
          cover: item.imgUrl + "!200",
          title: item.电台,
          playUrl: `https://lhttp.qingting.fm/live/${item.id}/64k.mp3`,
          类型: item.类型,
          城市: item.城市,
          地理位置: item.地理位置,
          官方网址: `https://www.qtfm.cn/radios/${item.id}`,
          节目表: `https://webapi.qtfm.cn/api/pc/radio/${item.id}`,
        };
      });
      const foshanRadio: IRadio[] = getFoshanRadio().map((item) => {
        return {
          id: item.id,
          platform: "佛山电台",
          cover: `/media/imgs/foshan/${item.封面图片}`,
          title: item.电台,
          playUrl: item.播放地址,
          官方网址: item.网页地址,
          节目表: item.节目表,
        };
      });
      const ximalaya: IRadio[] = getXimalaya().map((item) => {
        // item.platform = "喜马拉雅";
        // item.title = item.电台名称;
        // item.cover = item.coverSmall;
        // delete item.电台名称;
        // item.官方网站 = `https://www.ximalaya.com/radio/${item.电台ID}`;
        // item.节目表 = `https://live.ximalaya.com/live-web/v1/getProgramSchedules?radioId=${item.电台ID}&device=ios`;
        // item.电台信息 = `https://live.ximalaya.com/live-web/v1/radio?radioId=${item.电台ID}`;
        // item.播放地址 = `https://live.ximalaya.com/radio-first-page-app/live/${item.电台ID}/64.m3u8`;
        // return item;
        return {
          platform: "喜马拉雅",
          title: item.电台名称,
          cover: item.coverSmall,
          playUrl: `https://live.ximalaya.com/radio-first-page-app/live/${item.电台ID}/64.m3u8`,
          官方网址: `https://www.ximalaya.com/radio/${item.电台ID}`,
          节目表: `https://live.ximalaya.com/live-web/v1/getProgramSchedules?radioId=${item.电台ID}&device=ios`,
          电台信息: `https://live.ximalaya.com/live-web/v1/radio?radioId=${item.电台ID}`,
        };
      });

      const hongkongRadio: IRadio[] = getHongkongRadio().map((item) => {
        // item.platform = "香港电台";
        // item.title = item.电台名称;
        // item.cover = "/media/imgs/music.webp";
        // return item;
        return {
          platform: "香港电台",
          title: item.电台名称,
          cover: "/media/imgs/music.webp",
          playUrl: item.播放地址,
          // 官方网址: item.官方网址,
          // 节目表: item.节目表,
        };
      });
      const radioChina: IRadio[] = getRadioChina().map((item) => {
        // item.platform = "全国电台";
        // item.cover = "/media/imgs/music.webp";
        // item.title = item.电台名称;
        // // item.播放地址 = "香港电台";
        // return item;
        return {
          platform: "全国电台",
          title: item.title,
          cover: "/media/imgs/music.webp",
          playUrl: item.播放地址,
          // 官方网址: item.官方网址,
          // 节目表: item.节目表,
        };
      });

      this.radioOnlineList = [
        { title: "蜻蜓FM", list: qingtingFM },
        { title: "佛山电台", list: foshanRadio },
        { title: "喜马拉雅", list: ximalaya },
        { title: "香港电台", list: hongkongRadio },
        { title: "全国电台", list: radioChina },
      ];
    },
    async playbillsAction(url: string, platform: platformType | null = null) {
      // 获取节目表
      // console.log("playbillsAction", url, platform);
      this.playbills = null;
      let url_request = url;
      try {
        switch (platform) {
          case "蜻蜓FM": {
            const res = await qingtingFMPlayBillsRequest(url_request);
            this.playbills = {
              当前播放节目: res.album.nowplaying,
              昨天节目表: { ...res.pList["2"] },
              今天节目表: { ...res.pList["3"] },
              明天节目表: { ...res.pList["4"] },
            };
            break;
          }
          case "佛山电台": {
            url_request = proxyUrl(url);
            const res = await foshanPlayListRequest(url_request);
            this.playbills = res.data ?? res;
            break;
          }
          case "喜马拉雅": {
            // url_request = proxyUrl(url);
            url_request = "https://proxy.jef.cc.cd/?target=https://live.ximalaya.com/live-web/v1/getProgramSchedules?radioId=248&device=ios";
            // url_request = "/api/live-web/v1/getProgramSchedules?radioId=248&device=ios";
            // fetch(url_request)
            //   .then((response) => response.json())
            //   .then((data) => console.log(data));
            const res = await ximalayaPlayBillsRequest(url_request);
            console.log("喜马拉雅playlist", res);
            break;
          }
          default:
            break;
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});
