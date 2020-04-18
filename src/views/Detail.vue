<template>
    <main id="m-cj-view" class="c-main m-cj-index">
        <Achievement :achievement="achievement"/>
        <div v-if="post && JSON.stringify(post) === '{}'" class="m-cj-post-null">
            <span>暂无攻略，我要</span>
            <router-link class="s-link" :to="{name:'publish', params: {cj_id: achievement.ID}}">完善攻略</router-link>
        </div>
        <div v-if="post && JSON.stringify(post) !== '{}'" class="m-archive-list">
            <div class="cj-module m-cj-post">
                <div class="u-head">
                    <router-link class="el-button el-button--primary u-publish s-link"
                                 :to="{name:'publish', params: {cj_id: achievement.ID}}">
                        <i class="el-icon-edit"></i>
                        <span>完善成就攻略</span>
                    </router-link>
                    <h4 class="u-title">
                        <img class="u-icon" svg-inline src="../assets/img/cj.svg"/>
                        <span>成就攻略</span>
                    </h4>
                </div>
                <div class="u-body">
                    <div class="content m-single-primary" v-html="post.content"></div>
                    <div class="other">
                        <div v-if="post.user_avatar" class="avatar"><img :src="post.user_avatar"></div>
                        <div class="done" v-text="post.user_nickname"></div>
                        <div class="updated" v-text="'最后编辑于 '+$options.filters.date_format(post.updated)"></div>
                        <a class="comment" :href="'/cj/'+post.id+'#comments'" v-text="'前往评论'"></a>
                        <div class="remark">可通过评论通知原贡献者进行更改与署名补充</div>
                    </div>
                </div>
            </div>

            <div class="cj-module m-cj-relations" v-if="$_.get($refs,'relations.relations.length')">
                <div class="u-head">
                    <span class="u-boss" @click="show_relations_primary=!show_relations_primary"
                          :class="{ on: !show_relations_primary }">BOSS属性参考</span>
                    <h4 class="u-title">🔗 相关成就<em>&nbsp;同BOSS其它成就</em></h4>
                </div>
                <div class="u-body">
                    <Relations ref="relations" :achievement_id="achievement.ID" :show_primary="show_relations_primary"/>
                </div>
            </div>

            <div class="cj-module m-cj-revisions">
                <div class="u-head">
                    <h4 class="u-title">📄 历史版本</h4>
                </div>
                <div class="u-body">
                    <Revisions :achievement_id="achievement.ID"/>
                </div>
            </div>

            <div class="cj-module m-cj-comments">
                <div class="u-head">
                    <h4 class="u-title">💖 评论</h4>
                </div>
                <div class="u-body">
                    <Comments :achievement_id="achievement.ID"/>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import Achievement from '@/components/Achievement.vue';
    import Relations from '@/components/Relations.vue';
    import Revisions from '@/components/Revisions.vue';
    import Comments from '@/components/Comments.vue';

    const {JX3BOX} = require("@jx3box/jx3box-common");

    export default {
        name: 'Detail',
        props: [],
        data: function () {
            return {
                achievement: {},
                post: null,
                show_relations_primary: true
            }
        },
        components: {
            Achievement,
            Relations,
            Revisions,
            Comments,
        },
        methods: {
            // 获取成就
            get_achievement: function () {
                if (!this.$route.params.cj_id) return;
                this.$http({
                    url: `${JX3BOX.__helperUrl}api/achievement/${this.$route.params.cj_id}`,
                    headers: {Accept: "application/prs.helper.v2+json"}
                }).then(data => {
                    data = data.data;
                    if (data.code === 200) {
                        this.achievement = data.data.achievement;
                        this.$store.state.sidebar.general = parseInt(this.achievement.General);
                        this.$store.state.sidebar.sub = this.achievement.Sub;
                        this.$store.state.sidebar.detail = this.achievement.Detail;
                    }
                }).catch((e) => {
                    this.achievement = false;
                });
            },
            // 获取成就攻略
            get_achievement_post: function () {
                if (!this.$route.params.cj_id) return;
                this.$http({
                    url: `${JX3BOX.__helperUrl}api/achievement/${this.$route.params.cj_id}/post`,
                    headers: {Accept: "application/prs.helper.v2+json"}
                }).then(res => {
                    this.post = res.data.data.post || {};
                }).catch(err => {
                    this.post = null;
                });
            }
        },
        mounted: function () {
        },
        watch: {
            '$route.params.cj_id': {
                immediate: true,
                handler() {
                    // 获取成就
                    this.get_achievement();
                    // 获取成就攻略
                    this.get_achievement_post();
                }
            },
        }
    }
</script>

<style lang="less">
    //文章列表
    #m-cj-view {
        .m-cj-post-null {
            .u-msg-yellow;
            //margin:20px;
            .x;
        }

        .m-cj-post {
            margin-top: 5px;

            .u-head {
                .u-title {
                    .u-icon {
                        width: 28px;
                        height: 28px;
                        margin-right: 5px;
                        vertical-align: middle;
                    }

                    span {
                        font-size: 18px;
                        font-weight: bold;
                        vertical-align: middle;
                    }
                }

                .u-publish {
                    float: right;
                    padding: 8px 10px;
                    margin-top: 9px;
                    margin-right: 15px;
                    font-size: 12px;
                    .fr;
                }
            }

            .u-body {
                padding: 15px;
            }

            .content {
                word-break: break-all;
                line-height: 1.6em;

                b, strong {
                    font-weight: bold;
                }
            }

            .other {
                margin: 20px auto 0;
                padding-top: 9px;
                font-size: 12px;
                color: #888888;
                overflow: hidden;

                .avatar {
                    float: left;
                    border-radius: 100%;
                    overflow: hidden;
                    width: 32px;
                    height: 32px;
                    margin: -8px 10px 1px 0;
                    box-shadow: 1px 1px 2px #AAAAAA;
                }

                .done {
                    float: left;
                }

                .updated {
                    float: left;
                    margin-left: 5px;
                }

                .remark,
                .comment {
                    float: right;
                    margin-left: 8px;
                }

                .remark {
                    opacity: 0.7;
                }

                .comment {
                    display: block;
                    color: #0366d6;
                }
            }

            .c-comments {
                margin-top: 15px;
                margin-left: -15px;
                margin-right: -15px;

                .title {
                    padding: 6px 12px;
                    color: #FFFFFF;
                    background-color: #CCCCCC;

                    .u-icon {
                        width: 16px;
                        height: 16px;
                    }
                }

                .comments {
                    padding-left: 15px;
                    list-style: none;

                    .comment {
                        padding: 10px 0;
                        border-bottom: 1px solid #EEEEEE;
                        overflow: hidden;
                    }

                    .left {
                        width: 60px;
                        float: left;
                    }

                    .right {
                        margin-left: 60px;
                    }

                    .avatar {
                        width: 48px;
                        height: 48px;
                    }

                    .content {
                        margin-top: 5px;
                        opacity: 0.8;
                    }
                }

                & > .comments {
                    padding: 8px 15px;
                }
            }
        }

        .histories {
            width: 100%;
            opacity: 0.8;

            th, td {
                padding: 8px 10px;
                font-weight: normal
            }

            th {
                border-bottom: 2px solid #DDDDDD;
            }

            td {
                border-bottom: 1px solid #DDDDDD;
            }

            tr:last-child td {
                border-bottom: none;
            }
        }
    }

    @media screen and (max-width: @ipad) {
        #m-cj-view {

            .m-cj-post {
                img {
                    height: auto;
                }

                .other {
                    position: relative;
                    padding-top: 0;

                    .avatar {
                        position: absolute;
                        left: 0;
                        top: 0;
                        margin: 1px 10px 0 0;
                    }

                    .updated {
                        width: 100%;
                        text-align: right;
                        margin-left: 0;
                        margin-bottom: 5px;
                    }

                    .done {
                        width: 100%;
                        margin-bottom: 5px;
                        text-align: right;
                    }
                }

                .c-comments {
                    .comments {
                        padding-left: 5px;
                    }

                    & > .comments {
                        padding: 8px 15px;
                    }
                }
            }
        }
    }

    .m-cj-relations {
        .u-head {
            em {
                .ml(10px);
                font-size: 12px;
                opacity: .5;
            }
        }

        .u-body {
            padding: 0;
        }

        .u-boss {
            .fr;
            .fz(13px);
            background-color: #3b6460;
            color: #fff;
            font-weight: normal;
            padding: 2px 5px;
            .mr(15px);
            .mt(9px);
            .r(2px);
            letter-spacing: 0.5px;
            .pointer;
            user-select: none;

            &:before {
                content: "▼";
            }

            &.on {
                &::before {
                    content: "▲";
                }
            }
        }
    }

    // cj-module
    //===============================
    .cj-module {
        display: block;
        margin-bottom: 15px;
        background-color: #FAFBFC;
        border: 1px solid #EEEEEE;
        border-radius: 5px;
        font-size: 14px;
        overflow: hidden;

        &.pd {
            padding: 10px 15px 12px;
        }

        .u-head {
            background-color: #F3F3F3;
            border-bottom: 1px solid #EEEEEE;

            & > h4 {
                padding: 10px 0 10px 15px;
                color: #6c645c;
                font-weight: normal;
            }

            & > .other {
                float: right;
                padding: 12px 0;
                margin-right: 15px;
                font-size: 14px;
                line-height: 1.1;
            }
        }

        .u-body {
            padding: 10px;
        }
    }

    @media screen and (max-width: @ipad) {
        .cj-module {
            width: 100%;
        }
    }
</style>