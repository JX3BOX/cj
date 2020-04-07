<template>
    <div id="app">
        <Breadcrumb/>
        <router-view/>
    </div>
</template>

<script>
    import Breadcrumb from './components/Breadcrumb.vue';

    export default {
        name: "App",
        data: function () {
            return {};
        },
        computed: {},
        methods: {
        },
        filters: {},
        mounted: function () {
        },
        components: {
            Breadcrumb
        }
    };
</script>

<style lang="less">
</style>
