<template>
  <div>
    <div class="container">
      <div class="item" v-for="item in jsonMap" :key="item.id">
        <AlbumCard :radio="item" @play="play" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { csvToJson } from "@/utils/csvToJson";
import csvFile from "@/assets/csv/ximalaya.csv?raw";
import AlbumCard from "./AlbumCard.vue";
import { useMusicStore } from "@/stores/music/music";
const { actionChangeMusic } = useMusicStore();

const jsonList = csvToJson(csvFile);
const jsonMap = jsonList.map((item) => {
  item.pic = item.电台ID;
  item.title = item.电台名称;
  delete item.电台名称;
  return item;
});

function play(radio: any) {
  console.log("play", radio);
  const audio = {
    title: radio.title,
    artist: "喜马拉雅",
    src: radio.播放地址,
    pic: radio.pic,
  };
  actionChangeMusic(audio);
}
</script>

<style scoped lang="less"></style>
