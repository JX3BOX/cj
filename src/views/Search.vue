<template>
    <div class="c-main m-cj-index">
        <Achievements :achievements="achievements" :fold="true"/>
        <el-pagination background :total="achievements_count" hide-on-single-page
                       layout="prev, pager, next" :current-page="page" :page-size="length"
                       prev-html="&laquo;" next-html="&raquo;"
                       @current-change="page_change_handle"></el-pagination>
    </div>
</template>

<script>
    import Achievements from '@/components/Achievements.vue';

    const {JX3BOX} = require("@jx3box/jx3box-common");

    export default {
        name: 'Search',
        props: [],
        data: function () {
            return {
                achievements: [],
                achievements_count: 0,
                page: 1,
                length: 15,
            }
        },
        methods: {
            // 获取成就搜索列表
            get_achievements(keyword, page, length) {
                if (!keyword) return [];
                let data = {keyword: keyword, page: page};
                if (typeof length !== 'undefined') data['limit'] = length;
                return new Promise((resolve, reject) => {
                    this.$http({
                        method: 'GET',
                        url: `${JX3BOX.__helperUrl}api/achievement/search`,
                        headers: {Accept: "application/prs.helper.v2+json"},
                        params: data,
                    }).then(function (data) {
                        data = data.data;
                        if (data.code === 200) {
                            resolve(data.data);
                        }
                    }, function () {
                        resolve(false);
                    });
                })
            },
            page_change_handle(page) {
                this.$router.push({
                    name: 'search',
                    params: {keyword: this.$route.params.keyword},
                    query: {page: page}
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
                async handler() {
                    this.page = parseInt(this.$route.query.page);
                    let data = await this.get_achievements(this.$route.params.keyword, this.page, this.length);
                    this.achievements = data.achievements;
                    this.achievements_count = data.total;
                }
            },
        }
    }
</script>