<template>
    <ul class="m-cjs">
        <Achievement
            v-for="(achievement, key) in achievements"
            :key="key"
            :achievement="achievement"
            :fold="fold"
            :target="target"
            :jump="jump"
            :toggle_load_url="toggle_load_url"
        />
    </ul>
</template>

<script>
import Achievement from "@/components/Achievement.vue";

export default {
    name: "Achievements",
    props: ["achievements", "fold", "target", "jump", "toggle_load_url"],
    components: {
        Achievement,
    },
};
</script>
