<template>
  <div>
    <h1>About页面</h1>
    <div>测试</div>
    <div>{{ name }}, {{ count }},{{ doubleCount }}</div>
    <button @click="store.increment">+1</button>
    <button @click="handleClick">增加</button>
    <div><van-button @click="getPlayList">getlist</van-button></div>
    <div>
      <!-- <iframe id="iframe"></iframe> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";

// import { fetchPlayList } from "@/service/radio/radiofoshan";

function getPlayList() {
  // fetchPlayList("https://app.radiofoshan.com.cn//pc/index/ajaxGetBsPlayList?id=46&date=").then((res) => {
  //   console.log(res);
  // });
  // 目标接口（可配置）
  const targetUrl = "https://app.radiofoshan.com.cn//pc/index/ajaxGetBsPlayList?id=46&date=";

  // 发起请求获取数据
  // window.postMessage({ type: "getData", targetUrl }, "*");

  // 发送消息的窗口
  // const targetWindow = document.getElementById("iframe")?.contentWindow!;
  window.parent.postMessage("Hello World!", targetUrl);

  // 接收消息的窗口
  window.addEventListener(
    "message",
    function (event) {
      if (event.origin !== "https://app.radiofoshan.com.cn") {
        // 来自未知源的消息，不予处理
        return;
      }
      console.log("Received message:", event.data);
    },
    false
  );
}

const store = useCounterStore();
// `name` 和 `doubleCount` 都是响应式引用
// 下面的代码同样会提取那些来自插件的属性的响应式引用
// 但是会跳过所有的 action 或者非响应式（非 ref 或者 非 reactive）的属性
const { name, count, doubleCount } = storeToRefs(store);
// 名为 increment 的 action 可以被解构
const { increment } = store;
const handleClick = () => {
  // increment() 可以被调用
  increment();
};
</script>

<style scoped lang="less"></style>
