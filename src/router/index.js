import VueRouter from "vue-router";

import List from "../views/List.vue";
import View from "../views/View.vue";
import Publish from "../views/Publish.vue";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: List },
    { path: '/view', component: View },
    { path: '/publish', component: Publish },
]

const router = new VueRouter({
    routes
});

export default router;
