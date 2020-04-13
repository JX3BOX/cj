import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Normal from "../views/Normal.vue";
import Detail from "../views/Detail.vue";
import Publish from "../views/Publish.vue";

import store from "../store";

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
    {name: 'publish', path: '/publish', component: Publish},
    {path: '*', redirect: 'home'}
];

const router = new VueRouter({
    routes
});

export default router;
