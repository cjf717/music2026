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
      <div class="flex-item">
        <div>用时：{{ formatTime(song.dt, "mm:ss") }}</div>
        <div>发行日期：{{ formatTime(song.publishTime, "YYYY-MM-DD") }}</div>
      </div>
      <div class="artists">
        歌手：
        <template v-for="(artist, index) in song.ar" :key="index">
          <!-- {{ item.name }} -->
          <van-highlight :keywords="keywords" :source-string="artist.name" class="artist" />
        </template>
      </div>

      <div>所属专辑：{{ song.al.name }}</div>
      <div class="actions">
        <div>
          <a :href="`https://music.163.com/#/song?id=${song.id}`" target="_blank" rel="noopener noreferrer">官方链接</a>
        </div>
        <div v-if="url">
          <a :href="url" target="_blank" rel="noopener noreferrer">
            <van-icon name="play-circle-o">播放地址</van-icon>
          </a>
          <!-- <div>
            <van-icon name="play-circle-o">添加到播放器</van-icon>
          </div> -->
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
// import { useAudioPlayerStore } from "@/stores/audio-player";
import { useMusicStore } from "@/stores/music/music";

import type { songType } from "@/stores/netease-cloud-music/type";

const { actionChangeMusic } = useMusicStore();
// const store = useAudioPlayerStore();
// const { actionAdd } = store;
const { song, keywords } = defineProps<{ song: songType; keywords: string }>();
const url = ref("");

const imgSize = ref(120);
const imgSizePx = computed(() => `${imgSize.value * 1}px`);
const handelMatchMusic = async () => {
  // console.log("获取歌曲链接");
  const res = await matchMusic(song.id);
  url.value = res.data.data;
};

const play = async () => {
  console.log("播放歌曲");
  if (!url.value) {
    await handelMatchMusic();
  }
  // console.log(url);
  const artists = song.ar.map((item) => item.name).join("&");
  const audio = {
    title: song.name,
    artist: artists,
    src: url.value,
    pic: `${song.al.picUrl}?param=${imgSize}y${imgSize}`,
  };
  // console.log("audio", audio);
  // actionAdd(audio);
  actionChangeMusic(audio);
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
    .artists {
      .artist {
        display: inline-block;
        // display: flex;
        // align-items: center;
        // flex-wrap: wrap;

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
      background-color: #fff;
    }
    // &:nth-child {
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    //   white-space: nowrap;
    // }
  }
}
.flex-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
