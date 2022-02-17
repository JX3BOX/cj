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
                    <div class="m-wiki-compatible" v-if="compatible">
                        <i class="el-icon-warning-outline"></i> 暂无怀旧服攻略，以下为正式服攻略，仅作参考，<a class="s-link" :href="publish_url(`achievement/${id}`)">参与修订</a>。
                    </div>
                    <Article :content="wiki_post.post.content" />
                    <div class="m-wiki-signature">
                        <i class="el-icon-edit"></i>
                        本次修订由 <b>{{ user_name }}</b> 提交于{{ updated_at }}
                    </div>
                    <Thx class="m-thx" :postId="id" postType="achievement" :userId="author_id" :adminBoxcoinEnable="isRevision" :userBoxcoinEnable="isRevision" mode="wiki" :key="'achievement-thx-' + id"/>
                </template>
            </WikiPanel>

            <Relations :source-id="id" />

            <!-- 历史版本 -->
            <WikiRevisions type="achievement" :source-id="id" />

            <!-- 百科评论 -->
            <WikiComments type="achievement" :source-id="id" />
        </div>
        <div class="m-wiki-post-empty" v-if="is_empty">
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
import { ts2str } from "@jx3box/jx3box-common/js/utils.js";
export default {
    name: "Detail",
    data() {
        return {
            wiki_post: null,
            compatible: false,
            is_empty: true,
        };
    },
    computed: {
        id() {
            return this.$route.params.source_id;
        },
        post_id: function() {
            return this.$route.params.post_id;
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
        user_name: function() {
            return this.wiki_post?.post?.user_nickname;
        },
        updated_at: function() {
            return ts2str(this.wiki_post?.post.updated);
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
        loadData: function() {
            // 获取最新攻略
            if (this.id) {
                if (this.client == "std") {
                    WikiPost.newest("achievement", this.id, 1, "std").then((res) => {
                        let data = res?.data?.data;
                        this.wiki_post = data;
                        if (data) {
                            this.is_empty = false;
                        }
                        console.log("获取正式服攻略");
                    });
                } else {
                    WikiPost.newest("achievement", this.id, 1, "origin")
                        .then((res) => {
                            let data = res?.data?.data;
                            this.wiki_post = data;
                            if (data) {
                                this.is_empty = false;
                            }
                            console.log("获取怀旧服攻略");
                            return data;
                        })
                        .finally((data) => {
                            if (!data) {
                                console.log("兼容：获取正式服攻略");
                                WikiPost.newest("achievement", this.id, 1, "std").then((res) => {
                                    let data = res?.data?.data;
                                    this.wiki_post = data;
                                    if (data) {
                                        this.is_empty = false;
                                    }
                                    this.compatible = true;
                                });
                            }
                        });
                }
            }
            this.triggerStat();
        },
        loadRevision: function() {
            // 获取指定攻略
            WikiPost.view(this.post_id, { type: "achievement" }).then((res) => {
                this.wiki_post = res?.data?.data;
            });
            this.triggerStat();
        },
        ts2str,
    },
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
            handler() {
                this.loadData();
            },
        },
        post_id: {
            handler() {
                this.loadRevision();
            },
        },
    },
    mounted: function() {
        if (this.post_id) {
            this.loadRevision();
        } else {
            this.loadData();
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/views/detail.less";
</style>
