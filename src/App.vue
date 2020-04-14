<template>
    <div id="app">
        <Breadcrumb/>
        <Sidebar :sidebar="$store.state.sidebar"/>
        <router-view/>
        <Info/>
    </div>
</template>

<script>
    import Breadcrumb from './components/Breadcrumb.vue';
    import Sidebar from '@/components/Sidebar.vue';
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
            Info,
        },
        watch:{
            $route: {
                immediate: true,
                handler() {
                    if (this.$route.params.sub) this.$store.state.sub = this.$route.params.sub;
                    if (this.$route.params.detail) this.$store.state.detail = this.$route.params.detail;
                }
            },
        }
    };
</script>

<style lang="less">
</style>
