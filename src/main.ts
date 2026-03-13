import { createApp } from "vue";
// import './assets/css/style.css'
import "./assets/css/index.less";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

// vant组件及样式
import { Lazyload } from "vant";
import "vant/es/notify/style";
import "vant/es/toast/style";
import "vant/es/dialog/style";
import "@vant/touch-emulator"; // 桌面端适配

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Lazyload);

app.mount("#app");
