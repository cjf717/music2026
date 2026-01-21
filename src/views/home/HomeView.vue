<template>
  <div>
    <h3>{{ title }}</h3>
    <!-- <div>{{ store }}</div> -->
    <van-button type="primary">vant按钮</van-button>
    <button @click="handleClick">网络请求Demo</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { useCounterStore } from "@/stores/counter";
import { getDemo } from "@/service/modules";

const title = ref("main");
// 在组件内部的任何地方均可以访问变量 `store` ✨
// const store = useCounterStore();

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
