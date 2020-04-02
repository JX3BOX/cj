<template>
    <div id="app">
        <Breadcrumb/>
        <Sidebar @moduleChange="module_change_handle" @menuChange="menu_change_handle"/>
        <router-view/>
    </div>
</template>

<script>
    import Breadcrumb from './components/Breadcrumb.vue';
    import Sidebar from './components/Sidebar.vue';

    export default {
        name: "App",
        data: function () {
            return {};
        },
        computed: {},
        methods: {
            // 模块发生变化
            module_change_handle(module) {
                console.log(444, module)
            },
            // 菜单发生变化
            menu_change_handle(menu) {

            },
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
            Breadcrumb,
            Sidebar
        }
    };
</script>

<style lang="less">
</style>
