<template>
  <div>
    <!-- <h3 class="title">APlayer</h3> -->
    <div ref="aplayerRef" id="aplayer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
// import APlayer from "APlayer";
import "aplayer/dist/APlayer.min.css";
import { useAudioPlayerStore } from "@/stores/audio-player";
// import { useNeteaseStore } from "@/stores/netease-cloud-music";
// import { storeToRefs } from "pinia";

const store = useAudioPlayerStore();
// const { ap } = storeToRefs(store);
const { actionInit } = store;
// const { ap } = store;
// const store = useNeteaseStore();
// const { songCount, songs } = storeToRefs(store);
// const { actionSearch } = store;

const aplayerRef = ref();
// const ap = ref();
// let ap: APlayer | null = null;

onMounted(() => {
  const container = aplayerRef.value;
  if (!container) {
    console.error("APlayer container not found");
    return;
  }

  const options = {
    container,
    fixed: true,
    autoplay: false,
    theme: "#FADFA3",
    loop: "none" as const,
    order: "list" as const,
    preload: "none" as const,
    volume: 0.8,
    listFolded: false,
    listMaxHeight: "90vh",
    audio: [
      {
        name: "怀集音乐之声",
        artist: "蜻蜓FM",
        url: "https://lhttp.qingting.fm/live/4804/64k.mp3",
        cover: new URL(`@/assets/img/icon/fm0758.png`, import.meta.url).href,
      },
      {
        name: "广州交通电台",
        artist: "蜻蜓FM",
        url: "https://lhttp.qtfm.cn/live/4955/64k.mp3",
        lrc: "[00:00.000]广州交通电台_蜻蜓FM",
        cover: new URL(`@/assets/img/icon/fm1061.png`, import.meta.url).href,
      },
    ],
  };

  actionInit(options);

  // 添加更多音频到列表
  // ap.list.add([
  //   {
  //     name: "广州交通电台",
  //     artist: "蜻蜓FM",
  //     url: "https://lhttp.qtfm.cn/live/4955/64k.mp3",
  //     lrc: "[00:00.000]广州交通电台_蜻蜓FM",
  //     cover: new URL(`@/assets/img/icon/fm1061.png`, import.meta.url).href,
  //   },
  // ]);
});

// onUnmounted(() => {
//   if (ap) {
//     ap.destroy();
//     store.$reset();
//   }
// });

// 暴露函数
// defineExpose({
//   ap,
// });
</script>

<style scoped lang="less">
:deep(#aplayer) {
  .aplayer.aplayer-fixed {
    bottom: 50px !important;
  }
  .aplayer.aplayer-fixed .aplayer-body {
    bottom: 50px !important;
  }

  .aplayer.aplayer-fixed .aplayer-lrc {
    // bottom: 50px !important;
    top: 0;
    height: 46px !important;
    // padding: 50px 0;
    // border: 50px solid #0f0;
    // box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.9);

    p {
      font-size: 16px !important;
      // height: 16px !important;
      // line-height: 16px !important;
    }
  }
}
</style>
