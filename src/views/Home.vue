<template>
    <div class="m-cj-index m-cj-home">
        <!--<li>最新成就</li>-->
        <!--<li>7天热门统计数据</li>-->
        <!--<li>奇遇成就</li>-->
        <!--<li>副本成就?</li>
        <li>阅读成就?</li>-->
        <!--<li>最近攻略</li>-->

        <div class="cj-module">
            <div class="u-head">
                <a
                    class="other"
                    target="_blank"
                    href="https://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=o8LHzsrN48nbkMHM243AzM4"
                    >反馈建议 &raquo;</a
                >
                <h4>便捷入口</h4>
            </div>
            <div class="u-body">
                <ul class="cj-qlinks">
                    <li class="qlink">
                        <a
                            style="background-color:#FE7979;"
                            target="_blank"
                            href="https://www.jx3box.com/tool/9126/"
                            >游戏内看百科</a
                        >
                    </li>
                    <li class="qlink">
                        <router-link :to="{ name: 'waiting' }"
                            >待攻略成就</router-link
                        >
                    </li>
                    <li class="qlink">
                        <a
                            target="_blank"
                            href="https://www.jx3box.com/tool/8104/"
                            >隐藏成就</a
                        >
                    </li>
                    <li class="qlink">
                        <router-link :to="{ name: 'out_print' }"
                            >绝版成就</router-link
                        >
                    </li>
                    <li class="qlink">
                        <router-link :to="{ name: 'adventure' }"
                            >奇遇成就</router-link
                        >
                    </li>
                    <li class="qlink">
                        <router-link :to="{ name: 'rare' }"
                            >珍奇成就</router-link
                        >
                    </li>
                </ul>
            </div>
        </div>

        <div class="cj-module">
            <div class="u-head">
                <router-link class="other" :to="{ name: 'newest' }"
                    >查看更多 &raquo;</router-link
                >
                <h4>最新成就</h4>
            </div>
            <div class="u-body">
                <el-row class="cj-newest-list">
                    <el-col
                        :xs="12"
                        :md="8"
                        class="newest"
                        v-for="(newest, key) in newest_achievements"
                        :key="key"
                    >
                        <router-link
                            :to="{ name: 'view', params: { cj_id: newest.ID } }"
                        >
                            <img
                                @error.once="img_error_handle"
                                :src="icon_url_filter(newest.IconID)"
                            />
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
                                    v-text="
                                        '综合难度：' + render_stars(post.level)
                                    "
                                ></div>
                                <div
                                    class="u-remark"
                                    v-if="post.remark"
                                    v-text="'📑 ' + post.remark"
                                ></div>
                            </div>
                        </div>
                        <div class="m-body">
                            <router-link
                                class="u-excerpt"
                                :to="{
                                    name: 'view',
                                    params: { cj_id: post.cj_id },
                                }"
                                v-html="ellipsis(post.excerpt)"
                            ></router-link>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");

export default {
    name: "Home",
    props: [],
    data: function() {
        return {
            newest_achievements: null,
            newest_posts: null,
            JX3BOX: JX3BOX,
        };
    },
    computed: {},
    methods: {
        img_error_handle(e) {
            e.target.src = `${JX3BOX.__ossMirror}image/common/nullicon.png`;
        },
        render_stars: function(val) {
            return "⭐️".repeat(val ? val : 1);
        },
        // 成就图标过滤
        icon_url_filter(icon_id) {
            if (isNaN(parseInt(icon_id))) {
                return `${JX3BOX.__ossMirror}image/common/nullicon.png`;
            } else {
                return `${JX3BOX.__iconPath}icon/${icon_id}.png`;
            }
        },
        // 获取成就列表
        get_achievements(page) {
            let that = this;
            this.$http({
                method: "GET",
                url: `${JX3BOX.__helperUrl}api/achievements/newest`,
                headers: { Accept: "application/prs.helper.v2+json" },
                params: { page: page },
                withCredentials: true,
            }).then(
                function(data) {
                    data = data.data;
                    if (data.code === 200) {
                        that.newest_achievements = data.data.achievements;
                    }
                },
                function() {
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
                headers: { Accept: "application/prs.helper.v2+json" },
                withCredentials: true,
            }).then(
                function(data) {
                    data = data.data;
                    if (data.code === 200) {
                        that.newest_posts = data.data.newest;
                    }
                },
                function() {
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
    },
    mounted: function() {
        this.get_achievements();
        this.get_achievement_posts();
    },
    components: {},
    filters: {
        resolveAvatarPath: function(val) {
            return val.replace(JX3BOX.__ossRoot, JX3BOX.__ossMirror);
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/home.less";
</style>
