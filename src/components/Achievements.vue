<template>
    <ul class="m-achievement-singles">
        <AchievementSingle
            v-for="(achievement, key) in achievements"
            :key="key"
            :achievement="achievement"
            :fold="fold"
            :target="target"
            :jump="jump"
        />
    </ul>
</template>

<script>
import AchievementSingle from "@/components/AchievementSingle.vue";

export default {
    name: "Achievements",
    props: ["achievements", "fold", "target", "jump"],
    components: {
      AchievementSingle,
    },
    watch:{
        achievements(){
            if (this.$route && typeof this.$store.state.scroll_tops[this.$route.name] !== 'undefined') {
                setTimeout(() => {
                    window.scrollTo(0, this.$store.state.scroll_tops[this.$route.name]);
                }, 200);
            }
        }
    }
};
</script>
