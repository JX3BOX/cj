<template>
    <main class="c-main m-cj-index">
        <Achievements :achievements="achievements" :fold="true"/>
    </main>
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
            }
        },
        methods: {
            // 获取成就搜索列表
            search_achievements(keyword, page, length) {
                if (!keyword) return [];
                let data = {keyword: keyword, page: page};
                if (typeof length !== 'undefined') data['limit'] = length;
                return new Promise((resolve, reject) => {
                    this.$http({
                        method: 'GET',
                        url: `${JX3BOX.__helperUrl}api/achievement/search`,
                        params: data
                    }).then(function (data) {
                        data = data.data;
                        //if (data.code === 200) {
                        resolve(data.data);
                        //}
                    }, function () {
                        resolve(false);
                    });
                })
            }
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
                    let data = await this.search_achievements(this.$route.params.keyword);
                    this.achievements = data.achievements;
                }
            },
        }
    }
</script>