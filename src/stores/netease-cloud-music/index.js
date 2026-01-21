import { defineStore } from "pinia";
import { fetchSearch } from "@/service/netease-cloud-music";
export const useNeteaseStore = defineStore("netease-cloud-music", {
    state: () => ({ songCount: 0, songs: [] }),
    // getters: {
    //   doubleCount: (state) => state.count * 2,
    // },
    actions: {
        async actionSearch(keywords) {
            const res = await fetchSearch(keywords);
            // console.log(res);
            this.songCount = res.data.result.songCount;
            this.songs = res.data.result.songs;
        },
    },
});
