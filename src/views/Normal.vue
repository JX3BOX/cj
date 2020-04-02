<template>
    <main class="c-main m-cj-index">
        <router-link :to="{ name: 'home' }">home</router-link>
        <Sidebar :general="general"/>
        <!--<Achievement/>-->
        <Info/>
    </main>
</template>

<script>
    import Sidebar from '@/components/Sidebar.vue';
    import Info from '@/components/Info.vue';

    const axios = require("axios");

    export default {
        name: 'Normal',
        props: ['general'],
        data: function () {
            return {
                achievements: null,
            }
        },
        computed: {},
        methods: {
            // 获取成就列表
            get_achievements(menu, submenu) {
                var that = this;
                if (!menu) return [];
                let list_url = `${JX3BOX.__helperUrl}api/achievements/${menu}`;
                if (submenu) list_url = `${list_url}/${submenu}`;

                axios({
                    method: "GET",
                    url: list_url,
                }).then(function (data) {
                    data = data.data;
                    //if (data.code === 200) {
                    that.achievements = data.data.achievements;
                    //}
                }, function () {
                    that.achievements = false;
                });
            }
        },
        mounted: function () {
        },
        components: {
            Info,
            Sidebar
        }
    }
</script>