// import Vue from "vue";
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ElementUI);

Vue.config.productionTip = false;
// const { JX3BOX } = require("@jx3box/jx3box-common");

// import Header from "../node_modules/@jx3box/jx3box-common/vue/Header.vue";
import Header from './components/Header.vue'
new Vue({
    render: h => h(Header),
    el: '#c-header'
});

// import App from "./App.vue";
// new Vue({
//     render: h => h(App),
// }).$mount("#app");

