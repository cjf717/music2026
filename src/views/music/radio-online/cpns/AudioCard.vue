<template>
  <div class="card">
    <div class="album">
      <van-image lazy-load :src="radio.pic">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>
    <div class="content">
      <!-- <div class="title">{{ radio.title }}</div> -->
      <van-highlight :keywords="keywords" :source-string="radio.title" class="title" />

      <div class="flex-item">
        <template v-for="(val, key) in radio" :key="key">
          <template v-if="key === 'pic' || key === 'title' || key === 'artist'"></template>
          <template v-else-if="val.startsWith('http')">
            <div>{{ key }}: <a :href="val" target="_blank" referrerpolicy="no-referrer">链接</a></div>
          </template>
          <template v-else>
            <div>{{ key }}: {{ val }}</div>
          </template>
        </template>
      </div>
      <div class="actions"><van-button @click="handPlay" size="small">添加播放</van-button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
// import { useMusicStore } from "@/stores/music/music";
// const { actionChangeMusic } = useMusicStore();

const { radio, keywords } = defineProps<{ radio: any; keywords: any }>();
// console.log(radio);
const emit = defineEmits(["play"]);

const imgSize = ref(120);
const imgSizePx = computed(() => `${imgSize.value * 1}px`);
function handPlay() {
  emit("play", radio);
}
// const play = async () => {
//   // console.log("播放歌曲");
//   const audio = {
//     title: radio.电台,
//     artist: "蜻蜓FM",
//     src: `https://lhttp.qingting.fm/live/${radio.id}/64k.mp3`,
//     pic: radio.imgUrl,
//   };
//   actionChangeMusic(audio);
// };
</script>

<style scoped lang="less">
.card {
  height: v-bind(imgSize);
  margin: 5px 0;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  // background-color: var(--color-background);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  .album {
    width: v-bind(imgSizePx);
    height: v-bind(imgSizePx);
    text-align: center;
    margin: auto;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: v-bind(imgSizePx);
      height: v-bind(imgSizePx);
      object-fit: cover;
    }
  }
  .content {
    position: relative;
    flex: 1;
    padding: 0 5px;
    height: v-bind(imgSizePx);
    font-size: 14px;
    overflow: hidden;
    .title {
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      line-height: 1.5;
      color: var(--color-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .actions {
      position: absolute;
      bottom: 0;
      // left: 0;
      right: 0;
      // width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
    }
    &:nth-child(n) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.flex-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  div {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
