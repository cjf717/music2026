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
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    action: "/",
});
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.vanSearch | typeof __VLS_components.VanSearch | typeof __VLS_components.vanSearch | typeof __VLS_components.VanSearch} */
vanSearch;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onSearch': {} },
    ...{ 'onCancel': {} },
    modelValue: (__VLS_ctx.keywords),
    showAction: true,
    placeholder: "请输入搜索关键词",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSearch': {} },
    ...{ 'onCancel': {} },
    modelValue: (__VLS_ctx.keywords),
    showAction: true,
    placeholder: "请输入搜索关键词",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ search: {} },
    { onSearch: (__VLS_ctx.onSearch) });
const __VLS_7 = ({ cancel: {} },
    { onCancel: (__VLS_ctx.onCancel) });
const { default: __VLS_8 } = __VLS_3.slots;
{
    const { action: __VLS_9 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.onSearch) },
    });
    // @ts-ignore
    [keywords, onSearch, onSearch, onCancel,];
}
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
if (__VLS_ctx.loading) {
    let __VLS_10;
    /** @ts-ignore @type {typeof __VLS_components.vanLoading | typeof __VLS_components.VanLoading | typeof __VLS_components.vanLoading | typeof __VLS_components.VanLoading} */
    vanLoading;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
        size: "24px",
        color: "#1989fa",
    }));
    const __VLS_12 = __VLS_11({
        size: "24px",
        color: "#1989fa",
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    const { default: __VLS_15 } = __VLS_13.slots;
    // @ts-ignore
    [loading,];
    var __VLS_13;
}
if (__VLS_ctx.songCount) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    (__VLS_ctx.songCount);
    for (const [song] of __VLS_vFor((__VLS_ctx.songs))) {
        const __VLS_16 = AlbumCard;
        // @ts-ignore
        const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
            song: (song),
            keywords: (__VLS_ctx.keywords),
            key: (song.id),
        }));
        const __VLS_18 = __VLS_17({
            song: (song),
            keywords: (__VLS_ctx.keywords),
            key: (song.id),
        }, ...__VLS_functionalComponentArgsRest(__VLS_17));
        // @ts-ignore
        [keywords, songCount, songCount, songs,];
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
