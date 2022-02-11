import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

let store = {
    state: {
        scroll_tops: {},
        sidebar: {
            general: 1,
            sub: null,
            detail: null,
        },
        client: location.href.includes("origin") ? "origin" : "std",
        role: "",
        achievements: [],
    },
    mutations: {
        SET_STATE: (state, { key, value }) => {
            state[key] = value;
        },
    },
    getters: {},
    actions: {},
    modules: {},
};

export default new Vuex.Store(store);
