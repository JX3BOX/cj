<template>
    <div class="m-cj-index m-cj-home">
        <!--<li>7天热门统计数据</li>-->
        <!--<li>副本成就?</li>
        <li>阅读成就?</li>-->

        <div class="cj-module no-border">
            <div class="u-head">
                <a class="other" target="_blank" :href="feedback">反馈建议 &raquo;</a>
                <h4>
                    <i class="el-icon-location-information"></i>
                    <span> 便捷入口</span>
                </h4>
            </div>
            <div class="u-body">
                <ul class="cj-qlinks">
                    <li class="qlink">
                        <a style="background-color:#FE7979;" target="_blank" href="https://www.jx3box.com/tool/9126/">
                            <i class="el-icon-trophy"></i>
                            <span> 游戏内看百科</span>
                        </a>
                    </li>
                    <li class="qlink">
                        <router-link :to="{ name: 'waiting' }">
                            <i class="el-icon-edit-outline"></i>
                            <span> 待攻略成就</span>
                        </router-link>
                    </li>
                    <li class="qlink">
                        <a target="_blank" href="https://www.jx3box.com/tool/8104/">
                            <i class="el-icon-medal"></i>
                            <span> 隐藏成就</span>
                        </a>
                    </li>
                    <li class="qlink">
                        <router-link :to="{ name: 'out_print' }">
                            <i class="el-icon-coin"></i>
                            <span> 绝版成就</span>
                        </router-link>
                    </li>
                    <li class="qlink">
                        <router-link :to="{ name: 'adventure' }">
                            <i class="el-icon-ice-drink"></i>
                            <span> 奇遇成就</span>
                        </router-link>
                    </li>
                    <li class="qlink">
                        <router-link :to="{ name: 'rare' }">
                            <i class="el-icon-milk-tea"></i>
                            <span> 珍奇成就</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>

        <div class="cj-module no-border">
            <div class="u-head">
                <h4>
                    <i class="el-icon-notebook-1"></i>
                    <span> 热门成就</span>
                </h4>
            </div>
            <div class="u-body">
                <el-carousel height="68px" direction="vertical" indicator-position="none">
                    <el-carousel-item v-for="(items,key) in hot_achievements" :key="key" class="m-carousel m-hot">
                        <el-row :gutter="20">
                            <el-col :md="8" v-for="(item,k) in items" :key="k">
                                <div class="u-item" :class="`u-item-${k}`">
                                    <div class="u-icon">
                                        <img @error.once="img_error_handle" :src="icon_url_filter(item.IconID)"/>
                                    </div>
                                    <div class="m-carousel-content">
                                        <span class="u-title">
                                            <i class="el-icon-medal"></i>
                                            <span v-text="` ${item.Name}`"></span>
                                        </span>
                                        <span class="u-desc">
                                            <i class="el-icon-mic"></i>
                                            <span v-text="` ${item.Desc}`"></span>
                                        </span>
                                        <span class="u-rank" v-if="item.rank">
                                            <i class="el-icon-watermelon"></i>
                                            <span v-text="`昨日 - ${item.rank['yesterday']}`"></span>
                                            <i class="el-icon-grape"></i>
                                            <span v-text="`七天 - ${item.rank['7days']}`"></span>
                                            <i class="el-icon-pear"></i>
                                            <span v-text="`三十天 - ${item.rank['30days']}`"></span>
                                        </span>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>

        <div class="cj-module no-border">
            <div class="u-head">
                <router-link class="other" :to="{ name: 'newest' }">查看更多 &raquo;</router-link>
                <h4>
                    <i class="el-icon-notebook-2"></i>
                    <span> 最新成就</span>
                </h4>
            </div>
            <div class="u-body">
                <el-carousel height="60px" direction="vertical" :interval="3500" indicator-position="none">
                    <el-carousel-item v-for="(items,key) in newest_achievements" :key="key" class="m-carousel">
                        <el-row :gutter="20">
                            <el-col :md="8" v-for="(item,k) in items" :key="k">
                                <div class="u-item" :class="`u-item-${k}`">
                                    <div class="u-icon">
                                        <img @error.once="img_error_handle" :src="icon_url_filter(item.IconID)"/>
                                    </div>
                                    <div class="m-carousel-content">
                                        <span class="u-title">
                                            <i class="el-icon-medal"></i>
                                            <span v-text="` ${item.Name}`"></span>
                                        </span>
                                        <span class="u-desc">
                                            <i class="el-icon-mic"></i>
                                            <span v-text="` ${item.Desc}`"></span>
                                        </span>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>

        <div class="cj-module no-border">
            <div class="u-head">
                <h4>
                    <i class="el-icon-collection"></i>
                    <span> 最近攻略</span>
                </h4>
            </div>
            <div class="u-body">
                <el-row class="cj-post-list">
                    <el-col
                            class="cj-post"
                            v-for="(post, key) in newest_posts"
                            :key="key"
                    >
                        <div class="m-head">
                            <div class="m-user">
                                <div class="u-author">
                                    <img
                                            class="u-icon"
                                            :src="
                                            post.user_avatar | resolveAvatarPath
                                        "
                                            :alt="post.user_nickname"
                                    />
                                    <span
                                            class="u-name"
                                            v-text="post.user_nickname"
                                    ></span>
                                </div>
                                <div
                                        class="u-updated"
                                        v-text="
                                        $options.filters.date_format(
                                            post.updated
                                        )
                                    "
                                ></div>
                            </div>
                            <div class="m-achievement">
                                <div class="u-achievement">
                                    <img
                                            class="u-icon"
                                            @error.once="img_error_handle"
                                            :src="icon_url_filter(post.cj_icon_id)"
                                    />
                                    <router-link
                                            class="u-name"
                                            :to="{
                                            name: 'view',
                                            params: { cj_id: post.cj_id },
                                        }"
                                            v-text="post.title"
                                    ></router-link>
                                </div>
                                <div
                                        class="u-level"
                                        v-text="'综合难度：' + $options.filters.star(post.level)"
                                ></div>
                                <div
                                        class="u-remark"
                                        v-if="post.remark"
                                        v-text="'📑 ' + post.remark"
                                ></div>
                            </div>
                        </div>
                        <div class="m-body">
                            <span
                                    class="u-excerpt"
                                    :to="{
                                    name: 'view',
                                    params: { cj_id: post.cj_id },
                                }"
                                    v-html="ellipsis(post.excerpt)"
                            ></span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    const {JX3BOX} = require("@jx3box/jx3box-common");
    import {getRank} from "../service/stat.js";
    import {get_achievements} from "../service/achievement.js";

    export default {
        name: "Home",
        props: [],
        data: function () {
            return {
                hot_achievements: null,
                newest_achievements: null,
                newest_posts: null,
                JX3BOX: JX3BOX,
                feedback: JX3BOX.feedback
            };
        },
        computed: {},
        methods: {
            img_error_handle(e) {
                e.target.src = `${JX3BOX.__ossRoot}image/common/nullicon.png`;
            },
            // 成就图标过滤
            icon_url_filter(icon_id) {
                if (isNaN(parseInt(icon_id))) {
                    return `${JX3BOX.__ossRoot}image/common/nullicon.png`;
                } else {
                    return `${JX3BOX.__ossRoot}icon/${icon_id}.png`;
                }
            },
            // 获取成就列表
            get_achievements(page) {
                let that = this;
                this.$http({
                    method: "GET",
                    url: `${JX3BOX.__helperUrl}api/achievements/newest`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                    params: {page: page},
                    withCredentials: true,
                }).then(
                    (data) => {
                        data = data.data;
                        if (data.code === 200) {
                            // 按照长度分批
                            this.newest_achievements = this.chuck(data.data.achievements);
                        }
                    },
                    () => {
                        that.newest_achievements = false;
                    }
                );
            },
            // 获取成就攻略
            get_achievement_posts() {
                let that = this;
                that.$http({
                    method: "GET",
                    url: `${JX3BOX.__helperUrl}api/achievement/posts/newest`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                    withCredentials: true,
                }).then(
                    function (data) {
                        data = data.data;
                        if (data.code === 200) {
                            that.newest_posts = data.data.newest;
                        }
                    },
                    function () {
                        that.newest_posts = false;
                    }
                );
            },
            ellipsis(value) {
                value = value ? value.trim() : "";
                if (value.length > 100) {
                    return value.slice(0, 100) + "...";
                }
                return value;
            },
            chuck(arr, number = 3) {
                let output = [];
                for (let i = 0; i < arr.length; i += number) {
                    output.push(arr.slice(i, i + number))
                }
                return output;
            },
            hot_format(percentage) {
                return '';
            }
        },
        mounted: function () {
            // 获取热门成就
            getRank().then((data) => {
                data = data.data;

                let ranks = [],
                    achievement_ids = [];
                for (let i in data) {
                    let name = this.$_.get(data, `${i}.name`, '-');
                    let achievement_id = this.$_.get(name.split('-'), 1, '');
                    if (achievement_id) {
                        achievement_ids.push(achievement_id);
                        ranks[achievement_id] = this.$_.get(data, `${i}.value`, {});
                    }
                }

                get_achievements({ids: achievement_ids, limit: 15}).then((data) => {
                    data = data.data;
                    if (data.code === 200) {
                        let cjs = data.data.achievements;
                        for (let i in cjs) {
                            let rank = ranks[cjs[i].ID];
                            cjs[i].rank = rank;
                        }
                        // 按照长度分批
                        this.hot_achievements = this.chuck(cjs);
                    }
                });
            });

            this.get_achievements();
            this.get_achievement_posts();
        },
        components: {},
        filters: {
            resolveAvatarPath: function (val) {
                return val.replace(JX3BOX.__ossRoot, JX3BOX.__ossMirror);
            },
        },
    };
</script>

<style lang="less">
    @import "../assets/css/home.less";
</style>
