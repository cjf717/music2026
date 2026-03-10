<template>
  <div>
    <h3>{{ title }}</h3>
    <!-- <div>{{ store }}</div> -->
    <van-button type="primary">vant按钮</van-button>
    <button @click="handleClick">网络请求Demo</button>
    <!-- <div>
      <audio-player :music="music" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { useCounterStore } from "@/stores/counter";
import { getDemo } from "@/service/modules";
// import AudioPlayer from "@/components/AudioPlayer/AudioPlayer.vue";
// import { IMusic } from "@/stores/music/type";
// import { storeToRefs } from "pinia";
// import { useMusicStore } from "@/stores/music/music";

// const musicStore = useMusicStore();
// const music_store = storeToRefs(musicStore);
// console.log(music_store);
const title = ref("main");
// // 在组件内部的任何地方均可以访问变量 `store` ✨
// // const store = useCounterStore();
// const music = ref<IMusic>({
//   title: "标题123",
//   artist: "艺术家123",
//   src: "https://m701.music.126.net/20260310165704/c5a4c610ecc24fc6bed6b3b8680ce662/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/35937892785/36fa/894e/a091/290c32011452599b4535b2d154ba1de8.mp3?vuutv=kMnJPi/pkxcrA1SBF12rMTRZwvpB9fYQI2agV8CBJWro1sr4OdhdUMiZ5JtBdXSkSXtRJV4h5UygAA1MhFGJU28lfpT/dMnQgJ6+hFj2qq8=",
//   pic: "https://picsum.photos/80/80",
// });
const handleClick = () => {
  getDemo().then((res) => {
    console.log(res);
  });
};
</script>

<style scoped lang="less">
.title {
  font-size: 2em;
  text-align: center;
}
</style>
