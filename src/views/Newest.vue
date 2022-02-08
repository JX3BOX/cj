<template>
    <div class="m-newest-view">
        <span class="u-list-empty" v-if="isEmpty">👻 暂无记录</span>
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
import { getNewestAchievements } from "../service/achievement";

import { get } from 'lodash'

export default {
    name: "Newest",
    data() {
        return {
            achievements: null,
            achievements_count: 0,
            page: 1,
            length: 15,
        };
    },
    methods: {
        // 获取成就列表
        get_achievements(page) {
            getNewestAchievements(page).then(
                (data) => {
                    data = data.data;
                    if (data.code === 200) {
                        this.achievements = data.data.achievements;
                        this.achievements_count = data.data.total;
                    }
                },
                () => {
                    this.achievements = false;
                }
            );
        },
        page_change_handle(page) {
            this.$router.push({
                name: "newest",
                params: { keyword: this.$route.params.keyword },
                query: { page: page },
            });
        },
    },
    components: {
        Achievements,
    },
    computed: {
        isEmpty() {
            return !get(this.achievements, 'length')
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.page = parseInt(this.$route.query.page);
                // 获取成就列表
                this.get_achievements(this.page);
            },
        },
    },
};
</script>
