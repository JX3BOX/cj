import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Normal from "../views/Normal.vue";
import View from "../views/View.vue";
import Publish from "../views/Publish.vue";

Vue.use(VueRouter);

const routes = [
    {name: 'home', path: '/home', component: Home},
    {name: 'normal', path: '/:sub/:detail?', component: Normal, props: {general: 1}},
    {name: 'top_five', path: '/top_five/:sub/:detail?', component: Normal, props: {general: 2}},
    {name: 'view', path: '/view', component: View},
    {name: 'publish', path: '/publish', component: Publish},
    {path: '*', redirect: 'home'}
]

const router = new VueRouter({
    routes
});

export default router;
