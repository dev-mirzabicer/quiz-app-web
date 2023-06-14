import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import cookie from "vue-cookies";

createApp(App).use(cookie, { expires: "90d" }).use(router).mount("#app");
