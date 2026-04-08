<template>
  <div>
    <div>
      <h5>地区：</h5>
      <ul>
        <li v-for="item in province.data" :key="item.provinceCode">
          <span @click="changeProvince(item.provinceCode)" :class="provinceCode == item.provinceCode ? 'select' : ''">{{ item.provinceName }}</span>
        </li>
      </ul>
    </div>
    <div>
      <h5>类型：</h5>
      <ul>
        <li v-for="item in category.data" :key="item.id">
          <span @click="changecategory(item.id)" :class="categoryID == item.id ? 'select' : ''">{{ item.categoryName }}</span>
        </li>
      </ul>
    </div>
    <div class="list">
      <div v-for="radio in radioList" class="card">
        <img :src="radio.image" alt="radio.title" class="cover" />
        <div class="info">
          <!-- <p class="title">{{ radio.title }}</p> -->
          <div class="subtitle">{{ radio.subtitle }}</div>
          <div>
            <van-button @click="handlePlay(radio, 'mp3PlayUrlHigh')" size="mini">高音质</van-button>
            <van-button @click="handlePlay(radio, 'mp3PlayUrlLow')" size="mini">低音质1</van-button>
            <van-button @click="handlePlay(radio, 'playUrlLow')" size="mini">低音质2</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import province from "./province.json";
import category from "./category.json";
import { broadcastRequest } from "@/service/radio/radio-cn";
import { md5 } from "@/utils/md5";
import { useMusicStore } from "@/stores/music/music";
const { actionChangeMusic } = useMusicStore();

const provinceCode = ref(440000);
const categoryID = ref("0");
const key = "f0fc4c668392f9f9a447e48584c214ee";
const radioList = ref();

onMounted(() => {
  getBroadcast();
});
function getBroadcast() {
  const timestamp = new Date().getTime();
  const sign = md5(`categoryId=${categoryID.value}&provinceCode=${provinceCode.value}&timestamp=${timestamp}&key=${key}`);
  broadcastRequest(provinceCode.value, categoryID.value, sign, timestamp).then((res) => {
    // console.log(res);
    radioList.value = res.data.data;
  });
}
function changeProvince(code: number) {
  provinceCode.value = code;
  getBroadcast();
}
function changecategory(id: string) {
  categoryID.value = id;
  getBroadcast();
}

function handlePlay(radio: any, size: string) {
  console.log("handlePlay", radio);
  const src = radio[size];
  const audio = {
    title: radio.title,
    artist: radio.artist,
    src,
    pic: radio.image,
  };
  actionChangeMusic(audio);
}
</script>

<style scoped lang="less">
ul {
  display: flex;
  flex-wrap: wrap;
  li {
    margin: 0 5px;
    padding: 6px;
    word-break: keep-all;
    color: black;
    .select {
      border-radius: 3px;
      color: #ffffff;
      background-color: #f85251;
    }
    span:hover {
      color: #ffffff;
      background-color: #f85251;
      cursor: pointer;
    }
  }
}
.list {
  display: flex;
  flex-wrap: wrap;
  .card {
    width: 175px;
    height: 200px;
    margin: 5px;
    border-radius: 3px;
    background-color: #f5f5f5;
    img {
      width: 175px;
      height: 150px;
      object-fit: cover;
    }
    .subtitle {
      font-size: 12px;
      word-break: keep-all;
    }
    // &:hover {
    //   cursor: pointer;
    // }
  }
}
</style>
