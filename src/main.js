// import Vue from "vue";
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = require("axios");
Vue.prototype.$_ = require("lodash");

import Header from "../node_modules/@jx3box/jx3box-common/vue/Header.vue";

new Vue({
    render: h => h(Header),
    el: '#c-header'
});

import router from "./router";
import store from "./store";
import App from "./App.vue";

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");

// 注册全局过滤器
import * as filters from "./filters";

Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});

