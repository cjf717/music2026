<template>
  <div class="player">
    <div class="cover-container" @click="handelPlay">
      <img class="cover" :src="music.pic?.value" alt="cover" />
      <div class="play-icon-wrapper">
        <van-icon v-if="!isPlaying" name="play-circle-o" class="play-icon-o" size="50" />
      </div>
    </div>
    <div class="info-container">
      <div class="content-wrapper">
        <div class="content">
          <span class="title">{{ music.title }}</span>
          <span> - </span>
          <span class="artist">{{ music.artist }}</span>
        </div>
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
      <a :href="music.src.value">播放地址</a>
    </figure>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";
import { formatNumberToTime } from "@/utils/formatTime";
// import { IMusic } from "@/stores/music/type";
import { storeToRefs } from "pinia";
import { useMusicStore } from "@/stores/music/music";

const musicStore = useMusicStore();
const music = storeToRefs(musicStore);

// const { music } = defineProps<{
//   music: IMusic;
// }>();

const audioRef = useTemplateRef<HTMLAudioElement>("audioRef");
// const audioRef = ref<HTMLAudioElement>();
const currentTime = ref(0);
const duration = ref(0);
const currentTimePercent = ref(0);
const isPlaying = ref(false);
onMounted(() => {
  if (!audioRef.value) return;
  audioRef.value.addEventListener("play", () => {
    isPlaying.value = true;
  });
  audioRef.value.addEventListener("pause", () => {
    isPlaying.value = false;
  });
  audioRef.value.addEventListener("canplay", () => {
    // console.log(audioRef.value.duration);
    duration.value = audioRef.value?.duration || 0;
  });

  audioRef.value.addEventListener("durationchange", () => {
    // console.log(audioRef.value.duration);
    duration.value = audioRef.value?.duration || 0;
  });
  audioRef.value.addEventListener("loadedmetadata", () => {
    // console.log(audioRef.value);
    duration.value = audioRef.value?.duration || 0;
  });
  audioRef.value.addEventListener("timeupdate", () => {
    // console.log(audioRef.value.currentTime);
    currentTime.value = audioRef.value?.currentTime || 0;
    currentTimePercent.value = Math.floor((currentTime.value / duration.value) * 100);
  });
});

const handelControl = (num: number) => {
  // console.log("鼠标点击的播放条", num);
  // console.log(Math.floor(duration.value * (num / 100)));
  audioRef.value!.currentTime = Math.floor(duration.value * (num / 100));
  // console.log("鼠标的位置：", event.pageX, event.offsetX, event.clientX);
  // audioRef.value.play();
};
const handelPlay = () => {
  // console.log("点击播放");
  if (audioRef.value?.paused) {
    audioRef.value?.play();
  } else {
    audioRef.value?.pause();
  }
};
</script>

<style scoped lang="less">
.player {
  position: sticky;
  bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  margin: 10px 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  background-color: #fff;
  .cover-container {
    position: relative;
    width: 80px;
    height: 80px;
    // max-width: 500px;
    // max-height: 500px;
    overflow: hidden;
    // border-radius: 50%;
    // background-color: #fff;
    // box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    &:hover {
      cursor: pointer;
    }
    .cover {
      vertical-align: top;
      width: 100%;
    }
    .play-icon-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      // height: 100%;
      // width: 100%;
      transform: translate(-50%, -50%);
      opacity: 0.9;
      z-index: 1;
      .play-icon-o {
        color: #eee;
        opacity: 0.8;
      }
    }
  }
  .info-container {
    flex: 1;
    margin: 5px;
    // width: 100%;
    overflow: hidden;
    .content-wrapper {
      width: 100%;
      animation: marquee-wrap 5s infinite linear;
      .content {
        float: left;
        white-space: nowrap;
        min-width: 100%;
        animation: marquee-content 5s infinite linear;
        .title {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
    .line-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 30px;
      // width: 80%;

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
    width: 25%;
    height: 100%;
    margin: 5px;
    overflow: hidden;
    .controls {
      display: flex;
      justify-content: space-between;
    }
    .controller {
      width: 100%;
      animation: marquee-wrap 10s infinite linear;
      .progress {
        float: left;
        margin-right: 5px;
        white-space: nowrap;
        min-width: 100%;
        animation: marquee-content 10s infinite linear;
      }
    }
  }
}
@keyframes marquee-wrap {
  0%,
  20% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(100%);
  }
  80%,
  100% {
    transform: translateX(0%);
  }
}

@keyframes marquee-content {
  0%,
  20% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-100%);
  }
  80%,
  100% {
    transform: translateX(0%);
  }
}
</style>
