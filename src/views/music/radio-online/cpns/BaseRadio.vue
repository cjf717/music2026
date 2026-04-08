<template>
  <div>
    <div class="container">
      <div>
        <van-search v-model="keywords" placeholder="多个关键词可用空格隔开" />
      </div>
      <div class="item" v-for="item in dataList" :key="item.id">
        <AudioCard :radio="item" :keywords="keywordList" @play="play" />
        <!-- {{ item.电台名称 }},{{ item.pic }} -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
// import { csvToJson } from "@/utils/csvToJson";
// import csvFile from "@/assets/csv/qingtingFM.csv?raw";
import AudioCard from "./AudioCard.vue";
import { useMusicStore } from "@/stores/music/music";
const { actionChangeMusic } = useMusicStore();

// const { radioList } = defineProps(["radioList"]);
// console.log(radioList);
const { radioList } = defineProps<{ radioList: any }>();
const keywords = ref("");
const keywordList = computed(() => keywords.value.split(" "));
// console.log("props", props.radioList);
const dataList = computed(() => {
  if (!keywords.value) {
    return radioList.data;
  }
  return radioList.data.filter((item: any) => {
    for (const keyword of keywordList.value) {
      if (!item.title.includes(keyword)) {
        return false;
      }
    }
    // for (let i = 0; i < keywordList.value.length; i++) {
    //   if (!item.title.includes(keywordList.value[i])) {
    //     return false;
    //   }
    // }
    return true;
  });
});

// const jsonList = csvToJson(csvFile);
// const jsonMap = jsonList.map((item) => {
//   item.pic = item.imgUrl;
//   delete item.imgUrl;
//   item.title = item.电台;
//   item.官方网站 = `https://www.qtfm.cn/radios/${item.id}`;
//   return item;
// });

function play(radio: any) {
  // console.log("play", radio);
  const audio = {
    title: radio.title,
    artist: radio.artist,
    src: radio.播放地址,
    pic: radio.pic,
  };
  actionChangeMusic(audio);
}
</script>

<style scoped lang="less"></style>
