<template>
    <main class="c-main m-cj-index">
        <!--<Achievement/>-->
        <Info/>
    </main>
</template>

<script>
    import Info from '@/components/Info.vue';

    const axios = require("axios");

    export default {
        name: 'List',
        props: [],
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
            Info
        }
    }
</script>