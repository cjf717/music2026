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
import csvFile from "@/assets/csv/qingtingFM.csv?raw";
import AlbumCard from "./AlbumCard.vue";
import { useMusicStore } from "@/stores/music/music";
const { actionChangeMusic } = useMusicStore();

const jsonList = csvToJson(csvFile);
const jsonMap = jsonList.map((item) => {
  item.pic = item.imgUrl;
  delete item.imgUrl;
  item.title = item.电台;
  return item;
});

function play(radio: any) {
  console.log("play", radio);
  const audio = {
    title: radio.title,
    artist: "蜻蜓FM",
    src: `https://lhttp.qingting.fm/live/${radio.id}/64k.mp3`,
    pic: radio.pic,
  };
  actionChangeMusic(audio);
}
</script>

<style scoped lang="less"></style>
