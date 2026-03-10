<template>
  <div class="player">
    <div class="cover-container">
      <img class="cover" :src="music.pic?.value" alt="cover" />
    </div>
    <div class="info-container">
      <div class="info">
        <span class="title">{{ music.title }}</span>
        <span> - </span>
        <span class="artist">{{ music.artist }}</span>
      </div>
      <div class="line-wrapper">
        <!-- <div class="line" @click="handelControl"></div> -->
        <van-slider step="0.1" v-model="currentTimePercent" @change="handelControl" />
      </div>
    </div>
    <div class="control-container">
      <div class="controls">
        <van-icon name="arrow-double-left" />
        <van-icon :name="isPlaying ? 'pause' : 'play'" class="play-icon" @click="handelPlay" />
        <van-icon name="arrow-double-right" />
        <!-- <span>上一曲</span>
        <span>播放</span>
        <span>下一曲</span> -->
      </div>
      <div class="controller">
        <div class="progress">
          <span class="currentTime">{{ formatNumberToTime(currentTime) }}</span>
          <span> / </span>
          <span class="duration">{{ formatNumberToTime(duration) }}</span>
        </div>
        <div class="volume">
          <!-- <button>-</button>
          <button>+</button> -->
        </div>
      </div>
    </div>
  </div>
  <div class="audio-source">
    <figure>
      <!-- <figcaption>Listen to the T-Rex:</figcaption> -->
      <audio controls :src="music.src.value" ref="audioRef"></audio>
      <!-- <a href="/shared-assets/audio/t-rex-roar.mp3"> Download audio </a> -->
    </figure>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from "vue";
import { formatNumberToTime } from "@/utils/formatTime";
// import { IMusic } from "@/stores/music/type";
import { storeToRefs } from "pinia";
import { useMusicStore } from "@/stores/music/music";

const musicStore = useMusicStore();
const music = storeToRefs(musicStore);

// const { music } = defineProps<{
//   music: IMusic;
// }>();

const audioRef = shallowRef();
const currentTime = ref(0);
const duration = ref(0);
const currentTimePercent = ref(0);
const isPlaying = ref(false);
onMounted(() => {
  audioRef.value.addEventListener("play", () => {
    isPlaying.value = true;
  });
  audioRef.value.addEventListener("pause", () => {
    isPlaying.value = false;
  });
  audioRef.value.addEventListener("canplay", () => {
    // console.log(audioRef.value.duration);
    duration.value = audioRef.value.duration;
  });

  audioRef.value.addEventListener("durationchange", () => {
    // console.log(audioRef.value.duration);
    duration.value = audioRef.value.duration;
  });
  audioRef.value.addEventListener("loadedmetadata", () => {
    // console.log(audioRef.value);
    duration.value = audioRef.value.duration;
  });
  audioRef.value.addEventListener("timeupdate", () => {
    // console.log(audioRef.value.currentTime);
    currentTime.value = audioRef.value.currentTime;
    currentTimePercent.value = Math.floor((currentTime.value / duration.value) * 100);
  });
});

const handelControl = (num: number) => {
  // console.log("鼠标点击的播放条", num);
  // console.log(Math.floor(duration.value * (num / 100)));
  audioRef.value.currentTime = Math.floor(duration.value * (num / 100));
  // console.log("鼠标的位置：", event.pageX, event.offsetX, event.clientX);
  // audioRef.value.play();
};
const handelPlay = () => {
  if (audioRef.value.paused) {
    audioRef.value.play();
  } else {
    audioRef.value.pause();
  }
};
</script>

<style scoped lang="less">
.player {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  margin: 10px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  // background-color: #e2e2e2;
  .cover-container {
    width: 80px;
    height: 80px;
    // max-width: 500px;
    // max-height: 500px;
    overflow: hidden;
    // border-radius: 50%;
    // background-color: #fff;
    // box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    .cover {
      vertical-align: top;
      width: 100%;
    }
  }
  .info-container {
    flex: 1;
    margin: 5px;
    .info {
      display: flex;
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      & > span {
        // font-size: 20px;
        // font-weight: bold;
        margin: 5px;
      }
    }
    .line-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 30px;
      width: 80%;
      padding: 0 10px;
      .line {
        height: 5px;
        background-color: #e2e2e2;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .control-container {
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: space-around;
    width: 150px;
    height: 100%;
    margin: 5px;
    .controls {
      display: flex;
      justify-content: space-between;
    }
    .controller {
      display: flex;
    }
  }
}
</style>
