<template>
  <div class="player">
    <div class="cover-container" @click="handlePlay">
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
        <!-- <div class="line" @click="handleControl"></div> -->
        <van-slider step="0.1" v-model="currentTimePercent" @change="handleControl" />
      </div>
    </div>
    <div class="control-container">
      <div class="controls">
        <van-icon name="arrow-double-left" />
        <van-icon :name="isPlaying ? 'pause' : 'play'" class="play-icon" @click="handlePlay" />
        <van-icon name="arrow-double-right" />
        <van-icon name="bars" />
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
        <div class="flex-item">
          <van-icon name="volume" />
          <van-icon name="down" class="rotate-90" />
          <van-icon name="sort" :class="isLoop ? 'rotate-90' : 'rotate-90 loop'" @click="changeLoop" />
          <!-- <van-icon name="exchange" @click="handLoop" class="loop" /> -->
          <van-icon name="list-switch" />
        </div>
      </div>
    </div>
  </div>
  <div class="audio-source">
    <figure>
      <!-- <figcaption>Listen to the T-Rex:</figcaption> -->
      <audio :src="music.src.value" controls ref="audioRef" :loop="isLoop"></audio>
      <a :href="music.src.value">播放地址</a>
    </figure>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from "vue";
import { formatNumberToTime } from "@/utils/formatTime";
// import { IMusic } from "@/stores/music/type";
import { storeToRefs } from "pinia";
import { useMusicStore } from "@/stores/music/music";

const musicStore = useMusicStore();
const music = storeToRefs(musicStore);

// const { music } = defineProps<{
//   music: IMusic;
// }>();

// const audioRef = useTemplateRef<InstanceType<typeof Audio>>("audioRef");
const audioRef = useTemplateRef<HTMLMediaElement>("audioRef");
// const audioRef = ref<HTMLAudioElement>();
const currentTime = ref(0);
const duration = ref(0);
const currentTimePercent = ref(0);
const isPlaying = ref(false);
const isLoop = ref(false); // 是否循环播放

onMounted(() => {
  const audio = audioRef.value;
  if (!audio) return;

  // audio.addEventListener("load", () => {
  //   console.log("监听load：是否加载完成");
  //   // isPlaying.value = true;
  // });
  audio.addEventListener("play", () => {
    // console.log("监听play：播放开始");
    isPlaying.value = true;
  });
  audio.addEventListener("pause", () => {
    // console.log("监听pause：播放暂停");
    isPlaying.value = false;
  });
  // audio.addEventListener("ended", () => {
  //   console.log("监听ended：播放到媒体的结束位置，播放停止。");
  //   // isPlaying.value = false;
  // });
  // audio.
  // audio.audioTracks.onaddtrack = function (event: any) {
  //   console.log("检测何时音轨从 <audio> 元素中添加", event);
  //   // trackEditor.addTrack(event.track);
  // };
  // audio.addEventListener("addtrack", () => {
  //   console.log("监听addtrack：检测何时音轨从 <audio> 元素中添加");
  //   // isPlaying.value = false;
  // });
  // audio.addEventListener("canplay", () => {
  //   // console.log(audio.duration);
  //   duration.value = audio?.duration || 0;
  // });

  // audio.addEventListener("durationchange", () => {
  //   // console.log(audio.duration);
  //   duration.value = audio?.duration || 0;
  // });
  audio.addEventListener("loadedmetadata", () => {
    // console.log(audio);
    duration.value = audio?.duration || 0;
  });
  audio.addEventListener("timeupdate", () => {
    // console.log(audio.currentTime);
    currentTime.value = audio.currentTime || 0;
    if (duration.value > 0) {
      currentTimePercent.value = (currentTime.value / duration.value) * 100;
    }
  });
  audio.addEventListener("ended", () => {
    // 播放到媒体的结束位置，播放停止
    // console.log(audio.currentTime);
    currentTime.value = 0;
    currentTimePercent.value = 0;
    isPlaying.value = false;
  });
});

// 监听音乐源变化，重置状态
watch(
  () => music.src.value,
  () => {
    currentTime.value = 0;
    duration.value = 0;
    currentTimePercent.value = 0;
    isPlaying.value = false;
    const audio = audioRef.value;
    if (audio) {
      audio.load();
      setTimeout(() => handlePlay());
      // handlePlay();
    }
  }
);
const handleControl = (num: number) => {
  // console.log("鼠标点击的播放条", num);
  // console.log(Math.floor(duration.value * (num / 100)));
  const audio = audioRef.value;
  if (!audio) return;
  audio.currentTime = (duration.value * num) / 100;
  // console.log("鼠标的位置：", event.pageX, event.offsetX, event.clientX);
  // audioRef.value.play();
};
const handlePlay = () => {
  // console.log("点击播放/暂停按钮");
  const audio = audioRef.value;
  if (!audio) return;
  if (audio.paused) {
    audio.play().catch((err) => console.error("播放失败:", err));
  } else {
    audio.pause();
  }
};
const changeLoop = () => {
  // console.log("点击了handLoop，是否循环播放");
  isLoop.value = !isLoop.value;
};

// 暴露函数handlePlay
defineExpose({ handlePlay });
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
  margin: 15px 0;
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
      // animation: marquee-wrap 10s infinite linear;
      .progress {
        // float: left;
        margin-right: 5px;
        white-space: nowrap;
        min-width: 100%;
        // animation: marquee-content 10s infinite linear;
      }
      .loop {
        position: relative;
        // color: red;
        // background-color: blue;
        // background: linear-gradient(-45deg, transparent 49.5%, rgb(53, 51, 52) 49.5%, deeppink 50.5%, transparent 50.5%);
        // background: linear-gradient(-45deg, transparent 100%);
        // 添加从左上到右下的斜线
        &::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          // height: 150px;
          height: 100%;
          width: 1px;
          background: #0a0a0a;
          transform: translate(-50%, -50%) rotate(45deg);
        }
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
.flex-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rotate-90 {
  transform: rotate(-90deg);
}
</style>
