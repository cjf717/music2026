import { defineStore } from "pinia";
import { proxyUrl } from "@/utils/proxyUrl";
import type { platformType, IRadio, IRadioOnlineList } from "./type";
import { getQingtingFM, getXimalaya, getFoshanRadio, getHongkongRadio, getRadioChina } from "@/service/radio-online/radio-online";
import { playBillsRequest } from "@/service/radio-online/play-bills";

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
      // console.log("playbillsAction", url, platform);
      this.playbills = null;
      let url_request = url;
      if (platform === "佛山电台" || platform === "喜马拉雅") {
        url_request = proxyUrl(url);
      }
      try {
        const res = await playBillsRequest(url_request);
        console.log("res", res);
        if (platform === "蜻蜓FM") {
          this.playbills = { nowplaying: res.data.album.nowplaying, ...res.data.pList };
        } else {
          this.playbills = res.data.data ?? res.data;
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});
