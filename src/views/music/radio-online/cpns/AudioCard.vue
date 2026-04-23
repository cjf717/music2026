<template>
  <div class="card">
    <div class="album">
      <van-image lazy-load :src="radio.cover">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>
    <div class="content">
      <!-- <div class="title">{{ radio.title }}</div> -->
      <van-highlight :keywords="keywords" :source-string="radio.title" class="title" />

      <div class="flex-item">
        <template v-for="(val, key) in radio" :key="key">
          <template v-if="key === 'cover' || key === 'title' || key === 'platform'"></template>
          <template v-else-if="val.startsWith('http')">
            <div>{{ key }}: <a :href="val" target="_blank" referrerpolicy="no-referrer">链接</a></div>
          </template>
          <template v-else>
            <div>{{ key }}: {{ val }}</div>
          </template>
        </template>
      </div>
      <div class="actions">
        <van-button v-if="radio.节目表" @click="handleBills" size="small">查看节目表</van-button>
        <van-popup v-model:show="showBills" class="bills">
          <ul>
            <template v-for="(item, key) in playbills">
              <li>
                <h3>{{ key }}</h3>
                <template v-if="typeof item === 'object'">
                  <template v-for="(i, k) in item">
                    <div :style="`${i.type == 1 ? 'color:red' : ''}`">{{ k }}: {{ i }}</div>
                  </template>
                </template>
                <template v-else>
                  <div>{{ item }}</div>
                </template>
              </li>
            </template>
          </ul>
          <div v-if="isLoading" class="loading"><van-loading type="spinner" /></div>
          <div v-if="!playbills && !isLoading">暂无数据</div>
        </van-popup>
        <van-button @click="handlePlay" size="small">添加播放</van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { useRadioOnlineStore } from "@/stores/radio-online/radio-online";
import { storeToRefs } from "pinia";

const { radio, keywords } = defineProps<{ radio: any; keywords: any }>();
// console.log(radio);
const emit = defineEmits(["play"]);

const imgSize = ref(120);
const imgSizePx = computed(() => `${imgSize.value * 1}px`);
const showBills = ref(false);
const isLoading = ref(false);
const radioOnlineStore = useRadioOnlineStore();
const { playbills } = storeToRefs(radioOnlineStore);

function handlePlay() {
  emit("play", radio);
}
function handleBills() {
  // console.log(radio);
  showBills.value = true;
  isLoading.value = true;
  const url = radio.节目表;
  radioOnlineStore.playbillsAction(url, radio.platform).finally(() => {
    isLoading.value = false;
  });
}
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
    .actions {
      position: absolute;
      bottom: 0;
      // left: 0;
      right: 0;
      // width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
    }
    &:nth-child(n) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.flex-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  div {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.bills {
  max-height: 80%;
  max-width: 80%;
  min-width: 100px;
  min-height: 100px;
  padding: 10px;
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
