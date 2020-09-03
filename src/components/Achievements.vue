<template>
    <ul class="m-cjs">
        <Achievement
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
import Achievement from "@/components/Achievement.vue";

export default {
    name: "Achievements",
    props: ["achievements", "fold", "target", "jump"],
    components: {
        Achievement,
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
