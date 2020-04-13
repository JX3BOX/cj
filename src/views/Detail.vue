<template>
    <main class="c-main m-cj-index">
        <Achievement :achievement="achievement"/>
    </main>
</template>

<script>
    import Achievement from '@/components/Achievement.vue';

    const {JX3BOX} = require("@jx3box/jx3box-common");
    const axios = require("axios");

    export default {
        name: 'Detail',
        props: [],
        data: function () {
            return {
                achievement: {},
            }
        },
        components: {
            Achievement,
        },
        methods: {
            // 获取成就
            get_achievement: function () {
                if (!this.$route.params.cj_id) return;
                axios({
                    url: `${JX3BOX.__helperUrl}api/achievement/${this.$route.params.cj_id}`,
                    headers: {Accept: "application/prs.helper.v2+json"}
                }).then(data => {
                    data = data.data;
                    if (data.code === 200) {
                        this.achievement = data.data.achievement;
                        this.$store.state.sidebar.general = this.achievement.General;
                        this.$store.state.sidebar.sub = this.achievement.Sub;
                        this.$store.state.sidebar.detail = this.achievement.Detail;
                    }
                }).catch((e) => {
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