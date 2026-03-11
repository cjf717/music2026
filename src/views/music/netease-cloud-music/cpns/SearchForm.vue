<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="handelSearch"
        @cancel="onCancel"
        @focus="focusSearch"
        @blur="blurSearch"
      >
        <template #action>
          <div @click="handelSearch">搜索</div>
        </template>
      </van-search>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { storeToRefs } from "pinia";
import { useNeteaseStore } from "@/stores/netease-cloud-music";
import { localCache } from "@/utils/cache";
const store = useNeteaseStore();
// const { songCount, songs } = storeToRefs(store);
const { actionSearch } = store;

const keywordsList = localCache.getCache("keywordsList") || [];
const keywords = ref(keywordsList[0] || "中国人");
const currentPage = ref(1);
const loading = ref(false);

const searchMusic = async (page: number = 1) => {
  const limit = 30;
  const offset = (page - 1) * limit;
  loading.value = true;
  await actionSearch(keywords.value, limit, offset).finally(() => {
    loading.value = false;
  });
  const keywordList = localCache.getCache("keywordsList") || [];
  if (keywordList.includes(keywords.value)) {
    keywordList.splice(keywordList.indexOf(keywords.value), 1);
  }
  keywordList.unshift(keywords.value);
  keywordList.splice(10);
  localCache.setCache("keywordsList", keywordList);
};

const handelSearch = async () => {
  currentPage.value = 1;
  store.$reset();
  await searchMusic();
};
const onCancel = () => {
  keywords.value = "";
};

const focusSearch = () => {
  console.log("focusSearch");
};
const blurSearch = () => {
  console.log("blurSearch");
};
// 暴露给父组件的方法
defineExpose({
  searchMusic,
  loading,
  currentPage,
});
</script>

<style scoped lang="less">
.title {
  color: red;
  text-align: center;
}
</style>
