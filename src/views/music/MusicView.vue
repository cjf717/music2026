<template>
  <div>
    <TopTabber />
    <RouterView />
    <AudioPlayer />
  </div>
</template>

<script setup lang="ts">
import AudioPlayer from "@/base-ui/AudioPlayer.vue";
import TopTabber from "@/components/TopTabber.vue";

// import APlayer from "@/components/APlayer.vue";

// import { ref } from 'vue';
</script>

<style scoped lang="less">
.title {
  color: red;
  text-align: center;
}
</style>
