<template>
    <div class="m-normal-view">
        <Achievements :achievements="achievements" :fold="true" />
    </div>
</template>

<script>
import Achievements from "@/components/Achievements.vue";
import { getMenuAchievements } from "../service/achievement";

import { get } from 'lodash'

export default {
    name: "Normal",
    data() {
        return {
            achievements: null,
        };
    },
    methods: {
        // 获取成就列表
        get_achievements(sub, detail) {
            if (!sub) return [];
            getMenuAchievements(sub, detail).then(
                (data) => {
                    data = data.data;
                    if (data.code === 200) {
                        this.achievements =
                            data.data.achievements &&
                            data.data.achievements.length &&
                            data.data.achievements.sort((a, b) => {
                                let a_level = get(a.post, "level", 1);
                                let b_level = get(b.post, "level", 1);
                                return a_level - b_level;
                            });
                    }
                },
                () => {
                    this.achievements = false;
                }
            );
        },
    },
    components: {
        Achievements,
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                // 获取成就列表
                this.get_achievements(this.$route.params.sub, this.$route.params.detail);
            },
        },
    },
};
</script>
