<template>
  <div>
    <form action="/">
      <van-search v-model="keywords" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </form>
    <van-loading v-if="loading" size="24px" color="#1989fa">Loading...</van-loading>
    <div v-if="songCount">
      <div>总数量：{{ songCount }}</div>
      <template v-for="song in songs" :key="song.id">
        <AlbumCard :song="song" :keywords="keywords" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useNeteaseStore } from "@/stores/netease-cloud-music";
import AlbumCard from "./cpns/AlbumCard.vue";

const store = useNeteaseStore();
const { songCount, songs } = storeToRefs(store);
const { actionSearch } = store;
const loading = ref(false);

const keywords = ref("中国人");

const onSearch = async () => {
  loading.value = true;
  store.$reset();
  actionSearch(keywords.value).finally(() => {
    loading.value = false;
  });
};
const onCancel = () => {
  keywords.value = "";
};
</script>

<style scoped lang="less">
.van-loading {
  margin: 10px auto;
  text-align: center;
}
</style>
