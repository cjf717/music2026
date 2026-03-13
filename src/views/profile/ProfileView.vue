<template>
  <div class="profile">
    <h3 class="title">个人配置信息</h3>
    <div>
      <van-button type="primary" @click="getAllStore">获取所有localStorage所有</van-button>
      <van-button type="primary" @click="clearStore">清除所有localStorage</van-button>
    </div>
    <div v-if="stores">
      <div>所有localStorage:</div>
      <div v-for="(value, key) of stores">{{ key }}: {{ value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { localCache } from "@/utils/cache";
const stores = ref();
const getAllStore = () => {
  console.log(window.localStorage);
  stores.value = window.localStorage;
};
const clearStore = () => {
  localCache.clearLocal();
  stores.value = null;
};
</script>

<style scoped lang="less">
.title {
  color: red;
  text-align: center;
}
.profile {
  padding: 10px;
}
</style>
