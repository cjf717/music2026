import { defineStore } from "pinia";
import { fetchSearch } from "@/service/netease-cloud-music";
import type { IState } from "./type";

export const useNeteaseStore = defineStore("netease-cloud-music", {
  state: (): IState => ({ songCount: 0, songs: [] }),
  // getters: {
  //   doubleCount: (state) => state.count * 2,
  // },
  actions: {
    async actionSearch(keywords: string) {
      const res = await fetchSearch(keywords);
      // console.log(res);
      this.songCount = res.data.result.songCount;
      this.songs = res.data.result.songs;
    },
  },
});
