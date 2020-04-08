<template>
    <main class="c-main m-cj-index">
        <Sidebar :general="general" @node_change="node_change_handle"/>
        <Achievements :achievements="achievements" :fold="true"/>
        <Info/>
    </main>
</template>

<script>
    import Sidebar from '@/components/Sidebar.vue';
    import Info from '@/components/Info.vue';
    import Achievements from '@/components/Achievements.vue';

    const {JX3BOX} = require("@jx3box/jx3box-common");
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
            get_achievements(sub, detail) {
                var that = this;
                if (!sub) return [];
                let list_url = `${JX3BOX.__helperUrl}api/achievements/${sub}`;
                if (detail) list_url = `${list_url}/${detail}`;

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
            },
            node_change_handle(data, node) {
                // 获取成就列表
                this.get_achievements(data.sub, data.detail);
            }
        },
        mounted: function () {
            // 获取成就列表
            this.get_achievements(this.$route.params.sub, this.$route.params.detail);
        },
        components: {
            Info,
            Sidebar,
            Achievements,
        }
    }
</script>