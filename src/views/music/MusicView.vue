<template>
  <div>
    <TopTabber />
    <RouterView class="router-view" />
    <!-- <AudioPlayer /> -->
    <audio-player />
  </div>
</template>

<script setup lang="ts">
// import AudioPlayer from "@/base-ui/AudioPlayer.vue";
import TopTabber from "@/components/TopTabber.vue";
import AudioPlayer from "@/base-ui/AudioPlayer/AudioPlayer.vue";
</script>

<style scoped lang="less">
.router-view {
  // color: red;
  // text-align: center;
  min-height: calc(100vh - 180px);
  // background-color: red;
}
</style>
