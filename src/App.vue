<template>
  <!-- 开启顶部安全区适配 -->
  <!-- <van-nav-bar safe-area-inset-top /> -->
  <!-- <TopTabber /> -->
  <main>
    <RouterView />
  </main>
  <van-back-top bottom="66px" />
  <BottomTabber />
  <!-- 开启底部安全区适配 -->
  <van-number-keyboard safe-area-inset-bottom />
</template>
<script setup lang="ts">
// import TopTabber from "./components/TopTabber.vue";
import BottomTabber from "./components/BottomTabber.vue";
</script>
<style scoped lang="less"></style>
