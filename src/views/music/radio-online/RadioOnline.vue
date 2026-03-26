<template>
  <div>
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab v-for="radio in fileList" :key="radio.title" :title="radio.title">
        <BaseRadio :radioList="radio"></BaseRadio>
      </van-tab>
      <!-- <van-tab v-for="radio in fileList" :title="radio.title">
        <BaseRadio :radioList="radio"></BaseRadio>
      </van-tab> -->
      <van-tab title="others">
        <ul>
          <li>
            云听：https://radio.cn/(中央广播电视总台),例如：
            <a
              href="https://ytcastmp3.radio.cn/82/stream_12518.mp3?type=1&key=a0c96f50c482c43bf6ed5dfa0a65c538&time=69c343ab"
              target="_blank"
              rel="noopener noreferrer"
              >怀集音乐之声</a
            >
          </li>
          <li>瑞丢网络收音机：https://radio5.cn/(盗用其他网站资源)</li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { csvToJson } from "@/utils/csvToJson";

// import QingtingFM from "./cpns/QingtingFM.vue";
// import RadioFoshan from "./cpns/RadioFoshan.vue";
// import XimalayaRadio from "./cpns/XimalayaRadio.vue";
// const csvFile = import.meta.glob("@/assets/csv/qingtingFM.csv", { query: "?raw", import: "default", eager: true });
import qingtingFMFile from "@/assets/csv/qingtingFM.csv?raw";
import ximalayaFile from "@/assets/csv/ximalaya.csv?raw";
import foshanFile from "@/assets/csv/radiofoshan.csv?raw";
import hongkongFile from "@/assets/csv/香港电台.csv?raw";
import radioChinaFile from "@/assets/csv/全国广播电台2025.csv?raw";
import BaseRadio from "./cpns/BaseRadio.vue";
// console.log(csvFile);
// console.log(csvToJson(csvFile));

const active = ref(0);
// const qingtingFM = ref();

const fileList = [
  {
    title: "蜻蜓FM",
    data: csvToJson(qingtingFMFile).map((item) => {
      item.pic = item.imgUrl;
      delete item.imgUrl;
      item.title = item.电台;
      item.artist = "蜻蜓FM";
      item.播放地址 = `https://lhttp.qingting.fm/live/${item.id}/64k.mp3`;
      item.官方网站 = `https://www.qtfm.cn/radios/${item.id}`;
      return item;
    }),
  },
  {
    title: "喜马拉雅",
    data: csvToJson(ximalayaFile).map((item) => {
      item.pic = item.电台ID;
      item.title = item.电台名称;
      delete item.电台名称;
      item.官方网站 = `https://www.ximalaya.com/radio/${item.电台ID}`;
      item.电台节目信息 = `https://live.ximalaya.com/live-web/v1/getProgramSchedules?radioId=${item.电台ID}&device=ios`;
      item.电台信息 = `https://live.ximalaya.com/live-web/v1/radio?radioId=${item.电台ID}`;
      item.artist = "喜马拉雅";
      item.播放地址 = `https://live.ximalaya.com/radio-first-page-app/live/${item.电台ID}/64.m3u8`;
      return item;
    }),
  },
  {
    title: "佛山电台",
    data: csvToJson(foshanFile).map((item) => {
      item.pic = `/media/imgs/foshan/${item.封面图片}`;
      delete item.封面图片;
      item.title = item.电台;
      delete item.电台;
      return item;
    }),
  },
  {
    title: "香港电台",
    data: csvToJson(hongkongFile).map((item) => {
      item.pic = "/media/imgs/music.webp";
      item.title = item.电台名称;
      item.artist = "香港电台";
      // item.播放地址 = "香港电台";
      return item;
    }),
  },
  {
    title: "全国电台",
    data: csvToJson(radioChinaFile).map((item) => {
      item.pic = "/media/imgs/music.webp";
      item.title = item.电台名称;
      item.artist = "全国电台";
      // item.播放地址 = "香港电台";
      return item;
    }),
  },
];

const onClickTab = (obj: any) => {
  // console.log(obj);
  getCsv(obj.name);
};

function getCsv(name: string) {
  console.log("getCsv", name);
  // qingtingFM.value = csvToJson(csvFile);
  // fetch("csv/qingtingFM.csv")
  //   .then((res) => res.text())
  //   .then((text) => {
  //     console.log(text);
  //     qingtingFM.value = csvToJson(text);
  //     // console.log(data);
  //   });
}
</script>

<style scoped lang="less">
.title {
  color: red;
  text-align: center;
}
</style>
