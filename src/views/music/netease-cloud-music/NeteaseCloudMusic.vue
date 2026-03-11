<template>
  <div>
    <SearchForm ref="searchRef" />
    <div v-if="songCount">
      <div>总数量：{{ songCount }}</div>
      <div>
        <template v-for="song in songs" :key="song.id">
          <AlbumCard :song="song" :keywords="keywords" />
        </template>
      </div>
      <div v-if="!searchRef?.loading">
        <van-pagination v-model="currentPage" :total-items="songCount" :items-per-page="30" mode="simple" @change="changePage" />
      </div>
    </div>
    <div v-if="searchRef?.loading" class="loading">
      <van-loading size="24px" color="#1989fa">Loading...</van-loading>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { storeToRefs } from "pinia";
import { useNeteaseStore } from "@/stores/netease-cloud-music";
import AlbumCard from "./cpns/AlbumCard.vue";
import { localCache } from "@/utils/cache";
import SearchForm from "./cpns/SearchForm.vue";

const store = useNeteaseStore();
const { songCount, songs } = storeToRefs(store);
// const { actionSearch } = store;
// const loading = ref(false);
const currentPage = ref(1);
const keywordsList = localCache.getCache("keywordsList") || [];
const keywords = ref(keywordsList[0] || "中国人");

const searchRef = useTemplateRef("searchRef");
const changePage = (page: number) => {
  // console.log(page);
  currentPage.value = page;
  searchRef.value?.searchMusic(page);
};
</script>

<style scoped lang="less">
.van-loading {
  margin: 10px auto;
  text-align: center;
}
</style>
