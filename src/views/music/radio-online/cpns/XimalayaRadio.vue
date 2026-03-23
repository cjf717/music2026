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
// # 电台节目信息：https://live.ximalaya.com/live-web/v1/getProgramSchedules?radioId=966&device=ios
// # 电台信息：https://live.ximalaya.com/live-web/v1/radio?radioId=966
// # 广东地区电台列表：https://mobile.ximalaya.com/radio-first-page-app/search?locationId=440000&locationTypeId=0&categoryId=0&pageNum=1&pageSize=48
// # 网络台信息 url = "https://mobile.ximalaya.com/radio-first-page-app/search?locationId=0&locationTypeId=4&categoryId=0&pageNum=1&pageSize=48"
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
  item.官方网站 = `https://www.ximalaya.com/radio/${item.电台ID}`;
  item.电台节目信息 = `https://live.ximalaya.com/live-web/v1/getProgramSchedules?radioId=${item.电台ID}&device=ios`;
  item.电台信息 = `https://live.ximalaya.com/live-web/v1/radio?radioId=${item.电台ID}`;
  return item;
});

function play(radio: any) {
  console.log("play", radio);
  const audio = {
    title: radio.title,
    artist: "喜马拉雅",
    // src: radio.播放地址,
    src: `https://live.ximalaya.com/radio-first-page-app/live/${radio.电台ID}/64.m3u8`,
    pic: radio.pic,
  };
  actionChangeMusic(audio);
}
</script>

<style scoped lang="less"></style>
