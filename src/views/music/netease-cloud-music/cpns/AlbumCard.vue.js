import { ref, computed } from "vue";
import { matchMusic } from "@/service/netease-cloud-music";
import { formatTime } from "@/utils/formatTime";
import { useAudioPlayerStore } from "@/stores/audio-player";
const store = useAudioPlayerStore();
const { actionAdd } = store;
const __VLS_props = defineProps();
const { song, keywords } = __VLS_props;
const url = ref("");
const imgSize = ref(150);
const imgSizePx = computed(() => `${150 * 1}px`);
const handelMatchMusic = async () => {
    // console.log("获取歌曲链接");
    matchMusic(song.id).then((res) => {
        // console.log(res);
        url.value = res.data.data;
    });
};
const play = async () => {
    if (!url.value) {
        await handelMatchMusic();
    }
    const audio = {
        name: song.name,
        artist: song.ar[0]?.name,
        url: url.value,
        cover: `${song.al.picUrl}?param=${imgSize}y${imgSize}`,
    };
    actionAdd(audio);
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
(__VLS_ctx.imgSize);
(__VLS_ctx.imgSizePx);
(__VLS_ctx.imgSizePx);
(__VLS_ctx.imgSizePx);
(__VLS_ctx.imgSizePx);
(__VLS_ctx.imgSizePx);
// @ts-ignore
[imgSize, imgSizePx, imgSizePx, imgSizePx, imgSizePx, imgSizePx,];
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card" },
});
/** @type {__VLS_StyleScopedClasses['card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "album" },
});
/** @type {__VLS_StyleScopedClasses['album']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.vanImage | typeof __VLS_components.VanImage | typeof __VLS_components.vanImage | typeof __VLS_components.VanImage} */
vanImage;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    lazyLoad: true,
    src: (`${song.al.picUrl}?param=${__VLS_ctx.imgSize}y${__VLS_ctx.imgSize}`),
}));
const __VLS_2 = __VLS_1({
    lazyLoad: true,
    src: (`${song.al.picUrl}?param=${__VLS_ctx.imgSize}y${__VLS_ctx.imgSize}`),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
{
    const { loading: __VLS_6 } = __VLS_3.slots;
    let __VLS_7;
    /** @ts-ignore @type {typeof __VLS_components.vanLoading | typeof __VLS_components.VanLoading} */
    vanLoading;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        type: "spinner",
        size: "20",
    }));
    const __VLS_9 = __VLS_8({
        type: "spinner",
        size: "20",
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    // @ts-ignore
    [imgSize, imgSize,];
}
// @ts-ignore
[];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "content" },
});
/** @type {__VLS_StyleScopedClasses['content']} */ ;
let __VLS_12;
/** @ts-ignore @type {typeof __VLS_components.vanHighlight | typeof __VLS_components.VanHighlight} */
vanHighlight;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    keywords: (keywords),
    sourceString: (song.name),
    ...{ class: "title" },
}));
const __VLS_14 = __VLS_13({
    keywords: (keywords),
    sourceString: (song.name),
    ...{ class: "title" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "artists" },
});
/** @type {__VLS_StyleScopedClasses['artists']} */ ;
for (const [artist, index] of __VLS_vFor((song.ar))) {
    (index);
    let __VLS_17;
    /** @ts-ignore @type {typeof __VLS_components.vanHighlight | typeof __VLS_components.VanHighlight} */
    vanHighlight;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        keywords: (keywords),
        sourceString: (artist.name),
        ...{ class: "artist" },
    }));
    const __VLS_19 = __VLS_18({
        keywords: (keywords),
        sourceString: (artist.name),
        ...{ class: "artist" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    /** @type {__VLS_StyleScopedClasses['artist']} */ ;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
(__VLS_ctx.formatTime(song.dt, "mm:ss"));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
(__VLS_ctx.formatTime(song.publishTime, "YYYY-MM-DD"));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
(song.al.name);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "actions" },
});
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: (`https://music.163.com/#/song?id=${song.id}`),
    target: "_blank",
    rel: "noopener noreferrer",
});
if (__VLS_ctx.url) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        href: (__VLS_ctx.url),
        target: "_blank",
        rel: "noopener noreferrer",
    });
    let __VLS_22;
    /** @ts-ignore @type {typeof __VLS_components.vanIcon | typeof __VLS_components.VanIcon | typeof __VLS_components.vanIcon | typeof __VLS_components.VanIcon} */
    vanIcon;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
        name: "play-circle-o",
    }));
    const __VLS_24 = __VLS_23({
        name: "play-circle-o",
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    const { default: __VLS_27 } = __VLS_25.slots;
    // @ts-ignore
    [formatTime, formatTime, url, url,];
    var __VLS_25;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    let __VLS_28;
    /** @ts-ignore @type {typeof __VLS_components.vanButton | typeof __VLS_components.VanButton | typeof __VLS_components.vanButton | typeof __VLS_components.VanButton} */
    vanButton;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
        ...{ 'onClick': {} },
        size: "small",
    }));
    const __VLS_30 = __VLS_29({
        ...{ 'onClick': {} },
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    let __VLS_33;
    const __VLS_34 = ({ click: {} },
        { onClick: (__VLS_ctx.handelMatchMusic) });
    const { default: __VLS_35 } = __VLS_31.slots;
    let __VLS_36;
    /** @ts-ignore @type {typeof __VLS_components.vanIcon | typeof __VLS_components.VanIcon | typeof __VLS_components.vanIcon | typeof __VLS_components.VanIcon} */
    vanIcon;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
        name: "search",
    }));
    const __VLS_38 = __VLS_37({
        name: "search",
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    const { default: __VLS_41 } = __VLS_39.slots;
    // @ts-ignore
    [handelMatchMusic,];
    var __VLS_39;
    // @ts-ignore
    [];
    var __VLS_31;
    var __VLS_32;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
let __VLS_42;
/** @ts-ignore @type {typeof __VLS_components.vanButton | typeof __VLS_components.VanButton | typeof __VLS_components.vanButton | typeof __VLS_components.VanButton} */
vanButton;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    ...{ 'onClick': {} },
    size: "small",
}));
const __VLS_44 = __VLS_43({
    ...{ 'onClick': {} },
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_47;
const __VLS_48 = ({ click: {} },
    { onClick: (__VLS_ctx.play) });
const { default: __VLS_49 } = __VLS_45.slots;
// @ts-ignore
[play,];
var __VLS_45;
var __VLS_46;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
