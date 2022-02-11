<template>
    <div class="m-detail-view">
        <AchievementSingle v-if="wiki_post && wiki_post.source" :achievement="wiki_post.source" show-favorite="true" />

        <div class="m-wiki-post-panel" v-if="wiki_post && wiki_post.post">
            <WikiPanel :wiki-post="wiki_post">
                <template slot="head-title">
                    <img class="u-icon" svg-inline src="../assets/img/achievement.svg" />
                    <span class="u-txt">成就攻略</span>
                </template>
                <template slot="head-actions">
                    <a class="el-button el-button--primary" :href="publish_url(`achievement/${id}`)">
                        <i class="el-icon-edit"></i>
                        <span>完善成就攻略</span>
                    </a>
                </template>
                <template slot="body">
                    <Article :content="wiki_post.post.content" />
                    <Thx class="m-thx" slot="single-append" :postId="id" postType="achievement" :userId="author_id" :adminBoxcoinEnable="isRevision" :userBoxcoinEnable="isRevision" mode="wiki" />
                </template>
            </WikiPanel>

            <Relations :source-id="id" />

            <!-- 历史版本 -->
            <WikiRevisions type="achievement" :source-id="id" />

            <!-- 百科评论 -->
            <WikiComments type="achievement" :source-id="id" />
        </div>
        <div class="m-wiki-post-empty" v-else>
            <i class="el-icon-s-opportunity"></i>
            <span>暂无攻略，我要</span>
            <a class="s-link" :href="publish_url(`achievement/${id}`)">完善攻略</a>
        </div>
    </div>
</template>

<script>
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
import WikiRevisions from "@jx3box/jx3box-common-ui/src/wiki/WikiRevisions";
import WikiComments from "@jx3box/jx3box-common-ui/src/wiki/WikiComments";
import AchievementSingle from "@/components/AchievementSingle.vue";
import Relations from "@/components/Relations.vue";
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { WikiPost } from "@jx3box/jx3box-common/js/helper";
import { publishLink } from "@jx3box/jx3box-common/js/utils";

export default {
    name: "Detail",
    data() {
        return {
            wiki_post: null,
        };
    },
    computed: {
        id() {
            return this.$route.params.source_id;
        },
        isRevision: function() {
            return !!this.$route.params.post_id;
        },
        author_id: function() {
            return ~~this.wiki_post.post.user_id;
        },
        client: function() {
            return this.$store.state.client;
        },
    },
    methods: {
        publish_url: publishLink,
        triggerStat: function() {
            if (this.client == "origin") {
                postStat("origin_cj", this.id);
            } else {
                postStat("cj", this.id);
            }
        },
    },
    created() {},
    components: {
        AchievementSingle,
        WikiPanel,
        WikiRevisions,
        WikiComments,
        Relations,
        Article,
    },
    watch: {
        id: {
            immediate: true,
            handler() {
                // 获取最新攻略
                if (this.id) {
                    WikiPost.newest("achievement", this.id).then(
                        (res) => {
                            res = res.data;
                            this.wiki_post = res.data;
                            if (this.wiki_post && this.wiki_post.source) {
                                let pet = this.wiki_post.source.pet;
                                if (pet && pet.id) postStat("pet", pet.id);
                            }

                            this.triggerStat();
                        },
                        () => {
                            this.wiki_post = null;
                        }
                    );
                }
            },
        },
        "$route.params.post_id": {
            immediate: true,
            handler() {
                if (this.$route.params.post_id) {
                    // 获取指定攻略
                    WikiPost.view(this.$route.params.post_id, { type: "achievement" }).then(
                        (res) => {
                            res = res.data;
                            this.wiki_post = res.data;

                            this.triggerStat();
                        },
                        () => {
                            this.wiki_post = null;
                        }
                    );
                }
            },
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/views/detail.less";
</style>
