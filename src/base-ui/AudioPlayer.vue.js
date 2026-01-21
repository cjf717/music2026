import { ref } from "vue";
import { onMounted } from "vue";
// import APlayer from "APlayer";
import "aplayer/dist/APlayer.min.css";
import { useAudioPlayerStore } from "@/stores/audio-player";
// import { useNeteaseStore } from "@/stores/netease-cloud-music";
// import { storeToRefs } from "pinia";
const store = useAudioPlayerStore();
// const { ap } = storeToRefs(store);
const { actionInit } = store;
// const { ap } = store;
// const store = useNeteaseStore();
// const { songCount, songs } = storeToRefs(store);
// const { actionSearch } = store;
const aplayerRef = ref();
// const ap = ref();
// let ap: APlayer | null = null;
onMounted(() => {
    const container = aplayerRef.value;
    if (!container) {
        console.error("APlayer container not found");
        return;
    }
    const options = {
        container,
        fixed: true,
        autoplay: false,
        theme: "#FADFA3",
        loop: "none",
        order: "list",
        preload: "none",
        volume: 0.8,
        listFolded: false,
        listMaxHeight: "90vh",
        audio: [
            {
                name: "怀集音乐之声",
                artist: "蜻蜓FM",
                url: "https://lhttp.qingting.fm/live/4804/64k.mp3",
                cover: new URL(`@/assets/img/icon/fm0758.png`, import.meta.url).href,
            },
            {
                name: "广州交通电台",
                artist: "蜻蜓FM",
                url: "https://lhttp.qtfm.cn/live/4955/64k.mp3",
                lrc: "[00:00.000]广州交通电台_蜻蜓FM",
                cover: new URL(`@/assets/img/icon/fm1061.png`, import.meta.url).href,
            },
        ],
    };
    actionInit(options);
    // 添加更多音频到列表
    // ap.list.add([
    //   {
    //     name: "广州交通电台",
    //     artist: "蜻蜓FM",
    //     url: "https://lhttp.qtfm.cn/live/4955/64k.mp3",
    //     lrc: "[00:00.000]广州交通电台_蜻蜓FM",
    //     cover: new URL(`@/assets/img/icon/fm1061.png`, import.meta.url).href,
    //   },
    // ]);
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['aplayer']} */ ;
/** @type {__VLS_StyleScopedClasses['aplayer-fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['aplayer']} */ ;
/** @type {__VLS_StyleScopedClasses['aplayer-fixed']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "aplayerRef",
    id: "aplayer",
});
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
