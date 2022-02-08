import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

// 组件懒加载
const Home = () => import("./views/Home.vue");
const Normal = () => import("./views/Normal.vue");
const Detail = () => import("./views/Detail.vue");
const Search = () => import("./views/Search.vue");
const Newest = () => import("./views/Newest.vue");
const Waiting = () => import("./views/Waiting.vue");
const OutPrint = () => import("./views/OutPrint.vue");
const Adventure = () => import("./views/Adventure.vue");
const Rare = () => import("./views/Rare.vue");

Vue.use(VueRouter);

const routes = [
    // 主页
    {
        name: 'home', path: '/home', component: Home, beforeEnter: (to, from, next) => {
            store.state.sidebar.general = 1;
            next();
        }
    },
    // 常规
    {
        name: 'normal', path: '/:sub(\\d+)/:detail(\\d+)?', component: Normal, beforeEnter: (to, from, next) => {
            store.state.sidebar.general = 1;
            next();
        }
    },
    // 五甲
    {
        name: 'top_five', path: '/top_five/:sub(\\d+)?/:detail(\\d+)?', component: Normal,
        beforeEnter: (to, from, next) => {
            store.state.sidebar.general = 2;
            next();
        }
    },
    // 单页
    { name: 'view', path: '/view/:source_id(\\d+)/:post_id(\\d+)?', component: Detail },
    // 搜索
    { name: 'search', path: '/search/:keyword(.+)?', component: Search },
    // 最新成就
    {
        name: 'newest', path: '/newest', component: Newest, beforeEnter: (to, from, next) => {
            store.state.sidebar.general = 3;
            next();
        }
    },
    // 待攻略成就
    {
        name: 'waiting', path: '/waiting', component: Waiting, beforeEnter: (to, from, next) => {
            store.state.sidebar.general = 3;
            next();
        }
    },
    // 绝版成就
    {
        name: 'out_print', path: '/out_print', component: OutPrint, beforeEnter: (to, from, next) => {
            store.state.sidebar.general = 3;
            next();
        }
    },
    // 奇遇成就
    {
        name: 'adventure', path: '/adventure', component: Adventure, beforeEnter: (to, from, next) => {
            store.state.sidebar.general = 5;
            next();
        }
    },
    // 宠物成就
    {
        name: 'rare', path: '/rare', component: Rare, beforeEnter: (to, from, next) => {
            store.state.sidebar.general = 4;
            next();
        }
    },

    // 默认页重定向
    { path: '*', redirect: 'home' }
];

const router = new VueRouter({
    routes
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

export default router;
