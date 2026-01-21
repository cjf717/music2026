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
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
(__VLS_ctx.name);
(__VLS_ctx.count);
(__VLS_ctx.doubleCount);
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.store.increment) },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.handleClick) },
});
// @ts-ignore
[name, count, doubleCount, store, handleClick,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
