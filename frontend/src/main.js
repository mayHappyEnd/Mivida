// import { createApp } from "vue";
// import App from "./App.vue";
// import { router } from "./routes";

// const app = createApp(App);
// app.use(router);
// app.mount("#app");
import { store } from "./store";
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);

app.use(store);
app.use(router);
console.log("挂载中");
app.mount("#app");
