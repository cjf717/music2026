import { createWebHashHistory, createRouter } from "vue-router";
import HomeView from "../views/home/HomeView.vue";
import AboutView from "../views/about/AboutView.vue";
import NeteaseCloudMusic from "@/views/music/netease-cloud-music/NeteaseCloudMusic.vue";
import ProfileView from "@/views/profile/ProfileView.vue";
import NotFound from "@/views/not-found/NotFound.vue";
import RadioOnline from "@/views/music/radio-online/RadioOnline.vue";
import MusicView from "@/views/music/MusicView.vue";
const routes = [
    { path: "/", name: "home", component: HomeView },
    {
        path: "/music",
        name: "music",
        component: MusicView,
        children: [
            { path: "netease-cloud-music", name: "NeteaseCloudMusic", component: NeteaseCloudMusic },
            { path: "radio-online", name: "RadioOnline", component: RadioOnline },
        ],
    },
    // { path: "/netease-cloud-music", name: "NeteaseCloudMusic", component: NeteaseCloudMusic },
    { path: "/profile", name: "profile", component: ProfileView },
    { path: "/about", name: "about", component: AboutView },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;
