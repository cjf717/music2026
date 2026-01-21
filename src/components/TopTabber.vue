<template>
  <nav>
    <RouterLink :to="{ name: 'home' }"><span>Home</span></RouterLink>
    <RouterLink :to="{ name: 'NeteaseCloudMusic' }"><span>网易云音乐</span></RouterLink>
    <RouterLink :to="{ name: 'RadioOnline' }"><span>在线电台</span></RouterLink>
    <RouterLink :to="{ name: 'about' }"><span>About</span></RouterLink>
  </nav>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
</script>

<style scoped lang="less">
nav {
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  margin: 10px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  z-index: 999;
}
.router-link-active {
  color: red;
  span {
    margin: 5px 0;
    border-bottom: 2px solid red;
  }
}
</style>
