import VueRouter from "vue-router";

import Index from "../views/Index.vue";
import List from "../views/List.vue";
import View from "../views/View.vue";
import Publish from "../views/Publish.vue";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Index },
    { path: '/list', component: List },
    { path: '/view', component: View },
    { path: '/publish', component: Publish },
]

const router = new VueRouter({
    routes
});

export default router;
