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
            cj_icon_url(icon_id) {
                return 'https://oss.jx3box.com/icon/' + icon_id + '.png';
            },
            // 描述过滤
            cj_description: function (value) {
                var matchs = /text="(.*?)(\\\\\\n)?"/.exec(value);
                if (matchs && matchs.length > 1) value = matchs[1].trim();
                if (value) value = value.replace(/\\n/g, "<br>");
                return value;
            },
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
