<template>
  <div>
    <van-tabs v-model:active="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
    <h3 class="title">RadioMusic</h3>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const active = ref(0);
</script>

<style scoped lang="less">
.title {
  color: red;
  text-align: center;
}
</style>
