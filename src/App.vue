<template>
    <div id="app">
        <Header />
        <Breadcrumb>
            <CJBreadcrumb/>
        </Breadcrumb>
        <LeftSidebar>
            <Sidebar :sidebar="$store.state.sidebar"/>
        </LeftSidebar>
        <Main>
            <Search/>
            <router-view/>
            <Info/>
            <Footer/>
        </Main>
    </div>
</template>

<script>
    import CJBreadcrumb from './components/CJBreadcrumb.vue';
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
            CJBreadcrumb,
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
        padding-right:10px;
    }
    @media screen and (max-width:@ipad){
        .c-sidebar-right-msg,.c-github-repo{
            margin-left:0;
            margin-right:0;
        }
        .m-rank,.m-group{
            padding-left:5px;
            padding-right:5px;
        }
    }
</style>
