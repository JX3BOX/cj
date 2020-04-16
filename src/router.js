import VueRouter from "vue-router";
import store from "./store";

// 组件懒加载
const Home = () => import("./views/Home.vue");
const Normal = () => import("./views/Normal.vue");
const Detail = () => import("./views/Detail.vue");
const Search = () => import("./views/Search.vue");
const Publish = () => import("./views/Publish.vue");

Vue.use(VueRouter);

const routes = [
    {
        name: 'home', path: '/home', component: Home, beforeEnter: (to, from, next) => {
            store.state.sidebar.general = 1;
            next();
        }
    },
    {
        name: 'normal', path: '/:sub(\\d+)/:detail(\\d+)?', component: Normal, beforeEnter: (to, from, next) => {
            store.state.sidebar.general = 1;
            next();
        }
    },
    {
        name: 'top_five',
        path: '/top_five/:sub(\\d+)/:detail(\\d+)?',
        component: Normal,
        beforeEnter: (to, from, next) => {
            store.state.sidebar.general = 2;
            next();
        }
    },
    {name: 'view', path: '/view/:cj_id(\\d+)', component: Detail},
    {name: 'search', path: '/search/:keyword(.+)?', component: Search},
    {name: 'publish', path: '/publish/:cj_id(\\d+)?', component: Publish},
    {path: '*', redirect: 'home'}
];

const router = new VueRouter({
    routes
});

export default router;
