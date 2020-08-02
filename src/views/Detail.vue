<template>
    <div id="m-cj-view" class="m-cj-index">
        <Achievement :achievement="achievement" />
        <div
            v-if="post && JSON.stringify(post) === '{}'"
            class="m-cj-post-null"
        >
            <span>暂无攻略，我要</span>
            <a class="s-link" :href="publish_url(`cj/${achievement.ID}`)"
                >完善攻略</a
            >
        </div>
        <div
            v-if="post && JSON.stringify(post) !== '{}'"
            class="m-archive-list"
        >
            <div class="cj-module m-cj-post">
                <div class="u-head">
                    <a
                        class="el-button el-button--primary u-publish s-link"
                        :href="publish_url(`cj/${achievement.ID}`)"
                    >
                        <i class="el-icon-edit"></i>
                        <span>完善成就攻略</span>
                    </a>
                    <QRcode class="u-qr" />
                    <h4 class="u-title">
                        <img
                            class="u-icon"
                            svg-inline
                            src="../assets/img/cj.svg"
                        />
                        <span class="u-txt">成就攻略</span>
                    </h4>
                </div>
                <div class="u-body">
                    <div class="content m-single-primary">
                        <Article :content="post.content" />
                    </div>

                    <div class="other">
                        <div v-if="post.user_avatar" class="avatar">
                            <img :src="post.user_avatar" />
                        </div>
                        <div class="done" v-text="post.user_nickname"></div>
                        <div class="star" v-text="'综合难度：' + $options.filters.star(post.level)"></div>
                        <div class="updated" v-text="'最后编辑于 ' + $options.filters.date_format(post.updated)"></div>
                        <a
                            class="comment"
                            href="javascript:void(0)"
                            @click="go_to_comment"
                            v-text="'前往评论'"
                        ></a>
                        <div class="remark">
                            可通过评论通知原贡献者进行更改与署名补充
                        </div>
                    </div>
                </div>
            </div>

            <div class="cj-module m-cj-relations" v-show="show_relations">
                <div class="u-head">
                    <span
                        class="u-boss"
                        @click="
                            show_relations_primary = !show_relations_primary
                        "
                        :class="{ on: !show_relations_primary }"
                        >BOSS属性参考</span
                    >
                    <h4 class="u-title">
                        🔗 相关成就<em>&nbsp;同BOSS其它成就</em>
                    </h4>
                </div>
                <div class="u-body">
                    <Relations
                        ref="relations"
                        :achievement_id="achievement.ID"
                        :show_primary="show_relations_primary"
                        @relations_got="relations_got"
                    />
                </div>
            </div>

            <div class="cj-module m-cj-revisions">
                <div class="u-head">
                    <h4 class="u-title">📄 历史版本</h4>
                </div>
                <div class="u-body">
                    <Revisions :achievement_id="achievement.ID" />
                </div>
            </div>

            <div class="cj-module m-cj-comments">
                <div class="u-head">
                    <h4 class="u-title">💖 评论</h4>
                </div>
                <div class="u-body">
                    <Comments :achievement_id="achievement.ID" />
                </div>
            </div>
        </div>
        <ins
            class="adsbygoogle"
            style="display:block;max-width:100%;overflow:hidden;margin:10px;"
            data-ad-client="ca-pub-4388499329141185"
            data-ad-slot="1787190081"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    </div>
</template>

<script>
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import Achievement from "@/components/Achievement.vue";
import Relations from "@/components/Relations.vue";
import Revisions from "@/components/Revisions.vue";
import Comments from "@/components/Comments.vue";
import { postStat } from "@/service/stat.js";

const { JX3BOX } = require("@jx3box/jx3box-common");

export default {
    name: "Detail",
    props: [],
    data: function() {
        return {
            achievement: {},
            post: null,
            show_relations: false,
            show_relations_primary: true,
        };
    },
    components: {
        Achievement,
        Relations,
        Revisions,
        Comments,
        Article,
    },
    methods: {
        relations_got(relations) {
            this.show_relations = this.$_.get(relations, "length", 0) > 0;
        },
        go_to_comment() {
            let target = document.querySelector("#m-reply-form");
            target.scrollIntoView(true);
        },
        publish_url: function(val) {
            return JX3BOX.__Links.dashboard.publish + "#/" + val;
        },
        // 获取成就
        get_achievement: function() {
            if (!this.$route.params.cj_id) return;
            this.$http({
                url: `${JX3BOX.__helperUrl}api/achievement/${this.$route.params.cj_id}`,
                headers: { Accept: "application/prs.helper.v2+json" },
                withCredentials: true,
            })
                .then((data) => {
                    data = data.data;
                    if (data.code === 200) {
                        this.achievement = data.data.achievement;
                        this.$store.state.sidebar.general = parseInt(
                            this.achievement.General
                        );
                        this.$store.state.sidebar.sub = this.achievement.Sub;
                        this.$store.state.sidebar.detail = this.achievement.Detail;
                    }
                })
                .catch((e) => {
                    this.achievement = false;
                });
        },
        // 获取成就最新攻略
        get_achievement_newest_post() {
            if (!this.$route.params.cj_id) return;
            this.$http({
                url: `${JX3BOX.__helperUrl}api/achievement/${this.$route.params.cj_id}/post`,
                headers: { Accept: "application/prs.helper.v2+json" },
                withCredentials: true,
            })
                .then((res) => {
                    this.post = res.data.data.post || {};
                })
                .catch((err) => {
                    this.post = null;
                });
        },
        // 获取成就攻略
        get_achievement_post() {
            if (!this.$route.params.post_id) return;
            this.$http({
                url: `${JX3BOX.__helperUrl}api/achievement/post/${this.$route.params.post_id}`,
                headers: { Accept: "application/prs.helper.v2+json" },
                withCredentials: true,
            })
                .then((res) => {
                    this.post = res.data.data.post || {};
                })
                .catch((err) => {
                    this.post = null;
                });
        },
    },
    mounted: function() {
        postStat(this.$route.params.cj_id);
    },
    watch: {
        "$route.params.cj_id": {
            immediate: true,
            handler(newval) {
                // 获取成就
                this.get_achievement();
                // 获取成就最新攻略
                if (!this.$route.params.post_id)
                    this.get_achievement_newest_post();
            },
        },
        "$route.params.post_id": {
            immediate: true,
            handler(newval) {
                // 获取成就攻略
                this.get_achievement_post();
            },
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/detail.less";
</style>
