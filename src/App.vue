<template>
    <div id="app">
        <Header />
        <Breadcrumb/>
        <Sidebar :sidebar="$store.state.sidebar"/>
        <main class="c-main">
            <Search/>
            <router-view/>
            <Info/>
        </main>
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
    .u-list-empty {
        .db;
        .u-msg-yellow;
        .mt(5px);
        text-align:center;
    }
    .c-main{
        padding-left:10px;
        padding-right:@aside-right + 10px !important;
    }
</style>
