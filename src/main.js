import { createApp } from "vue";
// import './assets/css/style.css'
import "./assets/css/index.less";
// vant桌面端适配
import "@vant/touch-emulator";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { Lazyload } from "vant";
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(Lazyload);
app.mount("#app");
