<template>
    <div class="m-normal-view">
        <Achievements :achievements="achievements" :fold="true"/>
    </div>
</template>

<script>
    import Achievements from "@/components/Achievements.vue";

    const {JX3BOX} = require("@jx3box/jx3box-common");

    export default {
        name: "Normal",
        data: function () {
            return {
                achievements: null,
            };
        },
        computed: {},
        methods: {
            // 获取成就列表
            get_achievements(sub, detail) {
                let that = this;
                if (!sub) return [];
                let list_url = `${JX3BOX.__helperUrl}api/achievements/${sub}`;
                if (detail) list_url = `${list_url}/${detail}`;

                this.$http({
                    method: "GET",
                    url: list_url,
                    headers: {Accept: "application/prs.helper.v2+json"},
                    withCredentials: true,
                }).then((data) => {
                        data = data.data;
                        if (data.code === 200) {
                            that.achievements = data.data.achievements && data.data.achievements.length && data.data.achievements.sort((a, b) => {
                                let a_level = this.$_.get(a.post, 'level', 1);
                                let b_level = this.$_.get(b.post, 'level', 1);
                                return a_level - b_level
                            });
                        }
                    },
                    () => {
                        that.achievements = false;
                    }
                );
            },
        },
        mounted: function () {
        },
        components: {
            Achievements,
        },
        watch: {
            $route: {
                immediate: true,
                handler() {
                    // 获取成就列表
                    this.get_achievements(
                        this.$route.params.sub,
                        this.$route.params.detail
                    );
                },
            },
        },
    };
</script>
