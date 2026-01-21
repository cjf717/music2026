<template>
  <div class="card">
    <div class="album">
      <!-- <img :src="song.al.picUrl" alt="" /> -->
      <!-- <img v-lazy="`${song.al.picUrl}?param=${imgSize}y${imgSize}`" alt="" /> -->
      <van-image lazy-load :src="`${song.al.picUrl}?param=${imgSize}y${imgSize}`">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>
    <div class="content">
      <!-- <div class="title">{{ song.name }}</div> -->
      <van-highlight :keywords="keywords" :source-string="song.name" class="title" />
      <div class="artists">
        歌手：
        <template v-for="(artist, index) in song.ar" :key="index">
          <!-- {{ item.name }} -->
          <van-highlight :keywords="keywords" :source-string="artist.name" class="artist" />
        </template>
      </div>
      <div>用时：{{ formatTime(song.dt, "mm:ss") }}</div>
      <div>发行日期：{{ formatTime(song.publishTime, "YYYY-MM-DD") }}</div>
      <div>所属专辑：{{ song.al.name }}</div>
      <div class="actions">
        <div>
          <a :href="`https://music.163.com/#/song?id=${song.id}`" target="_blank" rel="noopener noreferrer">官方链接</a>
        </div>
        <div v-if="url">
          <a :href="url" target="_blank" rel="noopener noreferrer">
            <van-icon name="play-circle-o">播放地址</van-icon>
          </a>
        </div>
        <div v-else>
          <van-button @click="handelMatchMusic" size="small">
            <van-icon name="search">获取地址</van-icon>
          </van-button>
        </div>
        <div><van-button @click="play" size="small">播放歌曲</van-button></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { matchMusic } from "@/service/netease-cloud-music";
import { formatTime } from "@/utils/formatTime";
import { useAudioPlayerStore } from "@/stores/audio-player";

import type { songType } from "@/stores/netease-cloud-music/type";

const store = useAudioPlayerStore();
const { actionAdd } = store;
const { song, keywords } = defineProps<{ song: songType; keywords: string }>();
const url = ref("");

const imgSize = ref(150);
const imgSizePx = computed(() => `${150 * 1}px`);
const handelMatchMusic = async () => {
  // console.log("获取歌曲链接");
  matchMusic(song.id).then((res) => {
    // console.log(res);
    url.value = res.data.data;
  });
};

const play = async () => {
  if (!url.value) {
    await handelMatchMusic();
  }
  const audio = {
    name: song.name,
    artist: song.ar[0]?.name,
    url: url.value,
    cover: `${song.al.picUrl}?param=${imgSize}y${imgSize}`,
  };
  actionAdd(audio);
};
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
    .artists {
      .artist {
        display: inline-block;
        // display: flex;
        // align-items: center;
        // flex-wrap: wrap;
        font-size: 14px;
        color: var(--color-text-secondary);
        margin-right: 8px;
      }
      // &:not(:last-child) {
      //   margin-right: 8px;
      // }
    }
    .actions {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &:nth-child {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
