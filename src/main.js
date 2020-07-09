// 第三方UI组件
import Vue from "vue";
import ElementUI from "element-ui";
Vue.use(ElementUI);

// 通用UI模块
import JX3BOX_UI from '@jx3box/jx3box-common-ui'
import "@jx3box/jx3box-common/css/element.css";
import "@jx3box/jx3box-common/css/normalize.css";
Vue.use(JX3BOX_UI);


Vue.prototype.$http = require("axios");
Vue.prototype.$_ = require("lodash");

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);

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

