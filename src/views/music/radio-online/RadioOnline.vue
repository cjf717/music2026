<template>
  <div>
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <!-- <van-tab v-for="radio in fileList" :key="radio.title" :title="radio.title">
        <BaseRadio :radioList="radio"></BaseRadio>
      </van-tab> -->

      <!-- <van-tab :title="title">
        <BaseRadio :radioList="radioList"></BaseRadio>
      </van-tab> -->
      <van-tab v-for="radio in radioOnlineList" :key="radio.title" :title="radio.title">
        <BaseRadio :radioList="radio.list"></BaseRadio>
        <!-- <div>{{ radio.list }}</div> -->
      </van-tab>
      <van-tab title="云听">
        <RadioCN />
      </van-tab>
      <van-tab title="others">
        <ul>
          <li>
            云听：https://radio.cn/(中央广播电视总台),例如：
            <a
              href="https://ytcastmp3.radio.cn/82/stream_12518.mp3?type=1&key=a0c96f50c482c43bf6ed5dfa0a65c538&time=69c343ab"
              target="_blank"
              rel="noopener noreferrer"
            >
              怀集音乐之声
            </a>
          </li>
          <li>瑞丢网络收音机: https://radio5.cn/ (盗用其他网站资源)</li>
          <li>fm365: https://fm365.space/ (盗用其他网站资源，有收藏和播放记录功能)</li>
          <li>听FM: https://tingfm.net/ (盗用其他网站资源，包含电台和电视播放。有账号登录、收藏和播放记录功能)</li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseRadio from "./cpns/BaseRadio.vue";

import { useRadioOnlineStore } from "@/stores/radio-online/radio-online";

import RadioCN from "./radio-cn/radio-cn.vue";
import { storeToRefs } from "pinia";

const active = ref(0);
// const qingtingFM = ref();
const radioOnlineStore = useRadioOnlineStore();
const { radioOnlineList } = storeToRefs(radioOnlineStore);
radioOnlineStore.radioListAction();
// console.log(radioOnlineStore);

// const fileList = [
//   {
//     title: "蜻蜓FM",
//     data: csvToJson(qingtingFMFile).map((item) => {
//       item.pic = item.imgUrl;
//       delete item.imgUrl;
//       item.title = item.电台;
//       item.artist = "蜻蜓FM";
//       item.播放地址 = `https://lhttp.qingting.fm/live/${item.id}/64k.mp3`;
//       item.官方网站 = `https://www.qtfm.cn/radios/${item.id}`;
//       // item.节目表 = `https://rapi.qtfm.cn//v2/channels/${item.id}/playbills?day=2,3,4`;
//       item.节目表 = `https://webapi.qtfm.cn/api/pc/radio/${item.id}`;
//       return item;
//     }),
//   },
//   {
//     title: "喜马拉雅",
//     data: csvToJson(ximalayaFile).map((item) => {
//       item.artist = "喜马拉雅";
//       item.pic = item.电台ID;
//       item.title = item.电台名称;
//       delete item.电台名称;
//       item.官方网站 = `https://www.ximalaya.com/radio/${item.电台ID}`;
//       item.节目表 = `https://live.ximalaya.com/live-web/v1/getProgramSchedules?radioId=${item.电台ID}&device=ios`;
//       item.电台信息 = `https://live.ximalaya.com/live-web/v1/radio?radioId=${item.电台ID}`;
//       item.播放地址 = `https://live.ximalaya.com/radio-first-page-app/live/${item.电台ID}/64.m3u8`;
//       return item;
//     }),
//   },
//   {
//     title: "佛山电台",
//     data: csvToJson(foshanFile).map((item) => {
//       item.artist = "佛山电台";
//       item.pic = `/media/imgs/foshan/${item.封面图片}`;
//       delete item.封面图片;
//       item.title = item.电台;
//       delete item.电台;
//       return item;
//     }),
//   },
//   {
//     title: "香港电台",
//     data: csvToJson(hongkongFile).map((item) => {
//       item.pic = "/media/imgs/music.webp";
//       item.title = item.电台名称;
//       item.artist = "香港电台";
//       // item.播放地址 = "香港电台";
//       return item;
//     }),
//   },
//   {
//     title: "全国电台",
//     data: csvToJson(radioChinaFile).map((item) => {
//       item.pic = "/media/imgs/music.webp";
//       item.title = item.电台名称;
//       item.artist = "全国电台";
//       // item.播放地址 = "香港电台";
//       return item;
//     }),
//   },
// ];
// const files = filesConfig;
const onClickTab = (obj: any) => {
  console.log(obj);
  // console.log(filesConfig);
  // getCsv(obj.name);
};

// function getCsv(name: string) {
//   console.log("getCsv", name);
//   // qingtingFM.value = csvToJson(csvFile);
//   // fetch("csv/qingtingFM.csv")
//   //   .then((res) => res.text())
//   //   .then((text) => {
//   //     console.log(text);
//   //     qingtingFM.value = csvToJson(text);
//   //     // console.log(data);
//   //   });
// }
</script>

<style scoped lang="less">
.title {
  color: red;
  text-align: center;
}
</style>
