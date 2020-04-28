<template>
    <div class="m-cj-index">
        <span class="u-list-empty" v-if="!$_.get(achievements,'length')">👻 暂无记录</span>
        <Achievements :achievements="achievements" :fold="true"/>
    </div>
</template>

<script>
    import Achievements from '@/components/Achievements.vue';

    const {JX3BOX} = require("@jx3box/jx3box-common");

    export default {
        name: 'Waiting',
        data: function () {
            return {
                achievements: null,
                achievements_count: 0,
                page: 1,
            }
        },
        computed: {},
        methods: {
            // 获取成就列表
            get_achievements(page) {
                let that = this;
                this.$http({
                    method: "GET",
                    url: `${JX3BOX.__helperUrl}api/achievements/waiting`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                    params: {page: page}
                }).then(function (data) {
                    data = data.data;
                    if (data.code === 200) {
                        that.achievements = data.data.achievements;
                        that.achievements_count = data.data.total;
                    }
                }, function () {
                    that.achievements = false;
                });
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
                    this.page = parseInt(this.$route.query.page);
                    // 获取成就列表
                    this.get_achievements(this.page);
                }
            }
        }
    }
</script>