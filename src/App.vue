<template>
    <div id="app">
        <Breadcrumb/>
        <Sidebar :sidebar="$store.state.sidebar"/>
        <Search/>
        <router-view/>
        <Info/>
    </div>
</template>

<script>
    import Breadcrumb from './components/Breadcrumb.vue';
    import Sidebar from '@/components/Sidebar.vue';
    import Search from '@/components/Search.vue';
    import Info from '@/components/Info.vue';

    export default {
        name: "App",
        data: function () {
            return {};
        },
        computed: {},
        methods: {},
        filters: {},
        mounted: function () {
        },
        components: {
            Breadcrumb,
            Sidebar,
            Search,
            Info,
        },
        watch: {
            $route: {
                immediate: true,
                handler() {
                    if (!this.$route.params.sub && !this.$route.params.detail && !this.$route.params.cj_id) {
                        this.$store.state.sidebar.sub = null;
                        this.$store.state.sidebar.detail = null;
                    } else {
                        if (this.$route.params.sub) this.$store.state.sidebar.sub = this.$route.params.sub;
                        if (this.$route.params.detail) this.$store.state.sidebar.detail = this.$route.params.detail;
                    }
                }
            },
        }
    };
</script>

<style lang="less">
</style>
