<template>
  <div>
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab title="蜻蜓FM" name="qingtingFM">
        <qingtingFM :data="qingtingFM"></qingtingFM>
      </van-tab>
      <van-tab title="喜马拉雅">
        <ximalaya-radio />
      </van-tab>
      <van-tab title="佛山电台">
        <radio-foshan></radio-foshan>
      </van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
    <h3 class="title">RadioMusic</h3>
  </div>
</template>

<script setup lang="ts">
// import { csvToJson } from "@/utils/csvToJson";
import { ref } from "vue";

import QingtingFM from "./cpns/QingtingFM.vue";
import RadioFoshan from "./cpns/RadioFoshan.vue";
import XimalayaRadio from "./cpns/XimalayaRadio.vue";
// const csvFile = import.meta.glob("@/assets/csv/qingtingFM.csv", { query: "?raw", import: "default", eager: true });

// console.log(csvFile);
// console.log(csvToJson(csvFile));

const active = ref(0);
const qingtingFM = ref();

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
