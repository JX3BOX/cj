import Vuex from "vuex";

Vue.use(Vuex);

let store = {
    state: {
        sidebar: {
            general: 1,
            sub: null,
            detail: null,
        }
    },
    mutations: {
    },
    getters: {
    },
    actions: {},
    modules: {},
};

export default new Vuex.Store(store);
