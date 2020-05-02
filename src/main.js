// import Vue from "vue";
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = require("axios");
Vue.prototype.$_ = require("lodash");

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);

import JX3BOX_UI from '@jx3box/jx3box-common/vue'
Vue.use(JX3BOX_UI);

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

