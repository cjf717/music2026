import { defineStore } from "pinia";
import APlayer from "APlayer";

export const useAudioPlayerStore = defineStore("audio-player", {
  state: (): any => ({ ap: {} }),
  actions: {
    actionInit(options: any) {
      this.ap = new APlayer(options);
    },
    actionAdd(queryInfo: any) {
      // console.log("播放参数：", queryInfo)
      // return songDetail(queryInfo)
      this.ap.list.add(queryInfo);
      this.ap.list.switch(this.ap.list.audios.length - 1);
      // this.ap.play()
      this.ap.audio.play();
      // console.log(this.ap.audio)
      this.ap.on("play", function () {
        console.log("开始播放");
        // showNotify({ type: "success", message: `播放歌曲： ${queryInfo.name} - ${queryInfo.artist}` });
      });
    },
  },
});
