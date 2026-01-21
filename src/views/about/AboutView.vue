<template>
  <div>
    <h1>About页面</h1>
    <div>测试</div>
    <div>{{ name }}, {{ count }},{{ doubleCount }}</div>
    <button @click="store.increment">+1</button>
    <button @click="handleClick">增加</button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";
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
