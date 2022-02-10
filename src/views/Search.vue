<template>
    <div class="m-search-view">
        <Achievements :achievements="achievements" :fold="true" />
        <el-pagination
            background
            :total="achievements_count"
            hide-on-single-page
            layout="prev, pager, next"
            :current-page="page"
            :page-size="length"
            prev-html="&laquo;"
            next-html="&raquo;"
            @current-change="page_change_handle"
        ></el-pagination>
    </div>
</template>

<script>
import Achievements from "@/components/Achievements.vue";
import { searchAchievements } from "../service/achievement";

export default {
    name: "Search",
    props: [],
    data() {
        return {
            achievements: [],
            achievements_count: 0,
            page: 1,
            length: 15,
        };
    },
    methods: {
        // 获取成就搜索列表
        get_achievements(keyword, page, length) {
            let data = { keyword: keyword, page: page };
            if (typeof length !== "undefined") data["limit"] = length;
            return new Promise((resolve, reject) => {
                searchAchievements(data).then(
                    (data) => {
                        data = data.data;
                        resolve(data.data);
                    },
                    () => {
                        resolve(false);
                    }
                );
            });
        },
        page_change_handle(page) {
            this.$router.push({
                name: "search",
                params: { keyword: this.$route.params.keyword },
                query: { page: page },
            });
        },
    },
    components: {
        Achievements,
    },
    watch: {
        $route: {
            immediate: true,
            async handler() {
                this.page = parseInt(this.$route.query.page) || 1;
                let data = await this.get_achievements(this.$route.params.keyword, this.page, this.length);
                this.achievements = data.achievements;
                this.achievements_count = data.total;
            },
        },
    },
};
</script>
