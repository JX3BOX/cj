<template>
    <div id="app" >
        <Header></Header>
        <Breadcrumb
            name="成就百科"
            slug="achievement"
            root="/cj"
            :publishEnable="true"
            :feedbackEnable="true"
        >
            <img slot="logo" svg-inline src="./assets/img/achievement.svg" />
            <AchievementCount />
        </Breadcrumb>
        <LeftSidebar>
            <Sidebar :sidebar="$store.state.sidebar" />
        </LeftSidebar>
        <Main :withoutRight="false">
            <Search />
            <router-view />
            <RightSidebar>
                <Info />
            </RightSidebar>
            <Footer />
        </Main>
    </div>
</template>

<script>
import AchievementCount from "./components/AchievementCount.vue";
import Sidebar from "@/components/Sidebar.vue";
import Search from "@/components/Search.vue";
import Info from "@/components/Extend.vue";

export default {
    name: "App",
    data: function() {
        return {
        };
    },
    computed: {},
    methods: {},
    filters: {},
    mounted: function() {
    },
    components: {
        AchievementCount,
        Sidebar,
        Search,
        Info,
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                if (
                    !this.$route.params.sub &&
                    !this.$route.params.detail &&
                    !this.$route.params.source_id
                ) {
                    this.$store.state.sidebar.sub = null;
                    this.$store.state.sidebar.detail = null;
                } else {
                    if (this.$route.params.sub)
                        this.$store.state.sidebar.sub = this.$route.params.sub;
                    if (this.$route.params.detail)
                        this.$store.state.sidebar.detail = this.$route.params.detail;
                }

                if (
                    this.$store.state.sidebar.general == 3 &&
                    this.$route.name
                ) {
                    this.$set(
                        this.$store.state.sidebar,
                        "other",
                        this.$route.name
                    );
                }
            },
        },
    },
};
</script>

<style lang="less">
    @import './assets/css/index.less';
</style>