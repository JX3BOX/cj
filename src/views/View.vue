<template>
    <main class="c-main m-cj-index">
        <Sidebar :general="general" :sub="sub" :detail="detail" />

    </main>
</template>

<script>
    import Sidebar from '@/components/Sidebar.vue';

    const {JX3BOX} = require("@jx3box/jx3box-common");
    const axios = require("axios");

    export default {
        name: 'View',
        props: [],
        data: function () {
            return {
                achievement: {},
                general: null,
                sub: null,
                detail: null,
            }
        },
        components: {
            Sidebar,
        },
        methods: {
            // 获取成就
            get_achievement: function () {
                axios({
                    url: `${JX3BOX.__helperUrl}api/achievement/${this.$route.params.cj_id}`,
                    headers: {Accept: "application/prs.helper.v2+json"}
                }).then(data => {
                    data = data.data;
                    if (data.code === 200) {
                        this.achievement = data.data.achievement;
                        this.general = this.achievement.General;
                        this.sub = this.achievement.Sub;
                        this.detail = this.achievement.Detail;
                    }
                }).catch(() => {
                    this.achievement = false;
                });
            },
        },
        mounted: function () {
            // 获取成就
            this.get_achievement();
        },
    }
</script>