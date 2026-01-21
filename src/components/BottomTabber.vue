<template>
  <van-tabbar route placeholder>
    <van-tabbar-item name="home" to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item name="NeteaseCloudMusic" :to="{ name: 'NeteaseCloudMusic' }" icon="music-o">音乐</van-tabbar-item>
    <van-tabbar-item name="profile" to="/profile" icon="setting-o">配置</van-tabbar-item>
    <van-tabbar-item name="about" to="/about" icon="contact-o">关于</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
// import { onMounted, ref } from "vue";
// import { useRoute, useRouter } from "vue-router";

// const router = useRouter();
// const route = useRoute();
// const active = ref(route.name);
</script>

<style scoped lang="less">
// .title {
//   color: red;
//   text-align: center;
// }
</style>
