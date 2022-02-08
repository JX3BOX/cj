<template>
    <div class="m-rare-view">
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
import { getRareAchievements } from "../service/achievement";

import { get } from 'lodash'

export default {
    name: "Rare",
    data() {
        return {
            achievements: null,
            achievements_count: 0,
            page: 1,
            length: 15,
        };
    },
    computed: {
        isEmpty() {
            return !get(this.achievements, 'length')
        }
    },
    methods: {
        // 获取成就列表
        get_achievements(page) {
            getRareAchievements(page).then(
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
                name: "rare",
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
            handler() {
                this.page = parseInt(this.$route.query.page);
                // 获取成就列表
                this.get_achievements(this.page);
            },
        },
    },
};
</script>
