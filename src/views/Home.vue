<template>
    <div class="m-cj-index m-cj-home">

        <h5>首页计划模块：</h5>
        <ol>
            <li>最新成就</li>
            <li>7天热门统计数据</li>
            <li>奇遇成就</li>
            <li>副本成就?</li>
            <li>阅读成就?</li>
            <li>最近攻略</li>
        </ol>

        <div class="cj-module pd" style="margin-top:5px;background-color:#F9F9F9;border:1px solid #DDDDDD;">
            <p style="text-indent:2em;color:#666666;">
                欢迎各路成就巨佬或者有爱小伙伴前来完善攻略，建议大家更换一下自己喜爱的头像，本站成就百科刚上线不久，如果遇到什么问题或有什么意见可以及时向我们反馈，JX3BOX成就扣扣群：
                <a href="https://jq.qq.com/?_wv=1027&k=5S50j08"
                   style="text-decoration:underline">614370825</a>
            </p>
        </div>

        <div class="cj-module">
            <div class="u-head">
                <a class="other" href="https://www.jx3box.com/feedback/">反馈建议</a>
                <h4>便捷入口</h4>
            </div>
            <div class="u-body">
                <ul class="cj-qlinks">
                    <li class="qlink">
                        <a style="background-color:#FE7979;" target="_blank" href="https://www.jx3box.com/tool/9126/">游戏内看百科</a>
                    </li>
                    <li class="qlink">
                        <router-link :to="{name:'waiting'}">待攻略成就</router-link></li>
                    <li class="qlink">
                        <a target="_blank" href="https://www.jx3box.com/tool/8104/">隐藏成就</a></li>
                    <li class="qlink">
                        <router-link :to="{name:'out_print'}">绝版成就</router-link></li>
                </ul>
            </div>
        </div>

        <div class="cj-module">
            <div class="u-head">
                <router-link class="other" :to="{name:'newest'}">查看更多</router-link>
                <h4>最新成就</h4>
            </div>
            <div class="u-body">
                <el-row class="cj-newest-list">
                    <el-col :xs="12" :md="8" class="newest" v-for="(newest,key) in newest_achievements" :key="key">
                        <router-link :to="{name:'view',params:{cj_id:newest.ID}}">
                            <img @error.once="img_error_handle" :src="icon_url_filter(newest.IconID)">
                            <span v-text="newest.Name"></span>
                        </router-link>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="cj-module">
            <div class="u-head">
                <h4>最近攻略</h4>
            </div>
            <div class="u-body">
                <el-row class="cj-post-list" :gutter="30">
                    <el-col :md="12" class="cj-post" v-for="(post,key) in newest_posts" :key="key" :data-cj-id="post.cj_id">
                        <div class="left">
                            <img v-if="post.cj_icon_id" class="post-icon" @error.once="img_error_handle"
                                 :src="icon_url_filter(post.cj_icon_id)">
                            <router-link class="post-title" :to="{name:'view',params:{cj_id:post.cj_id}}"
                                         v-text="post.title"></router-link>
                        </div>
                        <div class="right">
                            <span class="post-author" target="_blank">
                                <span v-text="post.user_nickname"></span>
                                <img :src="post.user_avatar" :alt="post.user_nickname">
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    const {JX3BOX} = require("@jx3box/jx3box-common");

    export default {
        name: 'Home',
        props: [],
        data: function () {
            return {
                newest_achievements: null,
                newest_posts: null,
            }
        },
        computed: {},
        methods: {
            img_error_handle(e) {
                e.target.src = `${JX3BOX.__ossMirror}image/common/nullicon.png`;
            },
            // 成就图标过滤
            icon_url_filter(icon_id) {
                if (isNaN(parseInt(icon_id))) {
                    return `${JX3BOX.__ossMirror}image/common/nullicon.png`;
                } else {
                    return `${JX3BOX.__ossMirror}icon/${icon_id}.png`;
                }
            },
            // 获取成就列表
            get_achievements(page) {
                let that = this;
                this.$http({
                    method: "GET",
                    url: `${JX3BOX.__helperUrl}api/achievements/newest`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                    params: {page: page}
                }).then(function (data) {
                    data = data.data;
                    if (data.code === 200) {
                        that.newest_achievements = data.data.achievements;
                    }
                }, function () {
                    that.newest_achievements = false;
                });
            },
            // 获取成就攻略
            get_achievement_posts() {
                let that = this;
                that.$http({
                    method: "GET",
                    url: `${JX3BOX.__helperUrl}api/achievement/posts/newest`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                }).then(function (data) {
                    data = data.data;
                    if (data.code === 200) {
                        that.newest_posts = data.data.newest;
                    }
                }, function () {
                    that.newest_posts = false;
                });
            },
        },
        mounted: function () {
            this.get_achievements();
            this.get_achievement_posts();
        },
        components: {}
    }
</script>

<style lang="less">
    .m-cj-home {
        .cj-qlinks {
            list-style: none;

            .qlink {
                display: inline-block;
                margin: 0 10px;
                padding: 5px 0;

                a {
                    display: block;
                    padding: 6px 14px;
                    background-color: #3A97EB;
                    color: #FFFFFF;
                    border-radius: 4px;
                    transition: opacity .2s linear;

                    &:hover {
                        opacity: 0.8;
                    }
                }
            }
        }

        .cj-newest-list {
            list-style: none;
            overflow: hidden;

            .newest {
                padding: 3px 10px;

                * {
                    vertical-align: middle;
                }

                a {
                    display: block;
                    color: #666666;

                    &:hover span {
                        color: @color-link;
                        box-shadow: 0 1px 0 @color-link;
                    }

                    @media screen and (max-width: @ipad) {
                        span {
                            display: inline-block;
                            width: calc(~"100% - 30px");
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                    }
                }

                img {
                    width: 20px;
                    margin-right: 5px;
                    border-radius: 3px;
                }
            }
        }

        .cj-post-list {
            list-style: none;
            overflow: hidden;

            .cj-post {
                padding: 2px 10px;
                overflow: hidden;

                .left, .right {
                    * {
                        vertical-align: middle;
                    }
                }

                .left {
                    float: left;
                }

                .right {
                    float: right;
                    text-align: right;
                }

                .post-icon {
                    width: 20px;
                    margin-right: 5px;
                    border-radius: 3px;
                }

                .post-title {
                    color: #666666;

                    &:hover {
                        color: @color-link;
                        box-shadow: 0 1px 0 @color-link;
                    }
                }

                .post-author {
                    color: #666666;

                    &:hover {
                        color: @color-link;
                    }

                    img {
                        width: 20px;
                        height: 20px;
                        margin-left: 5px;
                        object-fit: cover
                    }
                }
            }
        }
    }

    @media screen and (max-width: @ipad) {
        .m-cj-home {
            .cj-post-list {
                .cj-post {
                    width: 100%;
                }
            }
        }
    }
</style>