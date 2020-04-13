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
        }
    };
</script>

<style lang="less">
</style>
