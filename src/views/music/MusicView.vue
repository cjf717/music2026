<template>
  <div>
    <TopTabber />
    <RouterView />
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
.title {
  color: red;
  text-align: center;
}
</style>
