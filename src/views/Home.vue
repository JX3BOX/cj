<template>
    <div class="m-home-view">
        <WikiPanel :border-none="true">
            <template slot="head-title">
                <i class="el-icon-location-information"></i>
                <span>便捷入口</span>
            </template>
            <template slot="head-actions">
                <a class="other" target="_blank" :href="feedback">反馈建议 &raquo;</a>
            </template>
            <template slot="body">
                <ul class="u-qlinks">
                    <li class="u-qlink">
                        <a style="background-color: #fe7979" target="_blank" href="/tool/9126/">
                            <i class="el-icon-trophy"></i>
                            <span>游戏内看百科</span>
                        </a>
                    </li>
                    <li class="u-qlink">
                        <router-link :to="{ name: 'waiting' }">
                            <i class="el-icon-edit-outline"></i>
                            <span>待攻略成就</span>
                            <span class="u-waiting" :style="waitingColorStyle()">（{{ solveRate.toFixed(2) }}%）</span>
                        </router-link>
                    </li>
                    <li class="u-qlink">
                        <a target="_blank" :href="hiddenAchievementsPostLink">
                            <i class="el-icon-medal"></i>
                            <span>隐藏成就</span>
                        </a>
                    </li>
                    <li class="u-qlink">
                        <a target="_blank" href="/adventure">
                            <i class="el-icon-ice-drink"></i>
                            <span>奇遇大全</span>
                        </a>
                    </li>
                    <li class="u-qlink">
                        <a target="_blank" href="/pet">
                            <i class="el-icon-lollipop"></i>
                            <span>宠物大全</span>
                        </a>
                    </li>
                </ul>
            </template>
        </WikiPanel>

        <WikiPanel :border-none="true">
            <template slot="head-title">
                <i class="el-icon-notebook-1"></i>
                <span>热门成就</span>
            </template>
            <template slot="body">
                <div class="m-achievement-slider">
                    <el-carousel height="66px" direction="vertical" indicator-position="none">
                        <el-carousel-item v-for="(items, key) in hot_achievements" :key="key" class="m-carousel m-hot">
                            <el-row :gutter="20">
                                <template v-for="(item, k) in items">
                                    <el-col :md="8" v-if="item" :key="k">
                                        <router-link
                                            class="u-item"
                                            :class="`u-item-${k}`"
                                            :to="{
                                                name: 'view',
                                                params: { source_id: item.ID },
                                            }"
                                        >
                                            <div class="u-icon">
                                                <img
                                                    :src="icon_url(item.IconID)"
                                                    @error.once="
                                                        () => {
                                                            $event.target.src = icon_url();
                                                        }
                                                    "
                                                />
                                            </div>
                                            <div class="m-carousel-content">
                                                <span class="u-title">
                                                    <i class="el-icon-medal"></i>
                                                    <span v-text="` ${item.Name}`"></span>
                                                </span>
                                                <span class="u-desc">
                                                    <i class="el-icon-mic"></i>
                                                    <span v-html="` ${item.Desc}`"></span>
                                                </span>
                                                <span class="u-rank" v-if="views[item.ID]">
                                                    <i class="el-icon-watermelon"></i>
                                                    <span v-text="`昨日 - ${views[item.ID]['yesterday']}`"></span>
                                                    <i class="el-icon-grape"></i>
                                                    <span v-text="`七天 - ${views[item.ID]['7days']}`"></span>
                                                    <i class="el-icon-pear"></i>
                                                    <span v-text="`三十天 - ${views[item.ID]['30days']}`"></span>
                                                </span>
                                            </div>
                                        </router-link>
                                    </el-col>
                                </template>
                            </el-row>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </template>
        </WikiPanel>

        <WikiPanel :border-none="true">
            <template slot="head-title">
                <i class="el-icon-notebook-2"></i>
                <span>最新成就</span>
            </template>
            <template slot="head-actions">
                <router-link class="other" :to="{ name: 'newest' }">查看更多 &raquo;</router-link>
            </template>
            <template slot="body">
                <el-carousel height="66px" direction="vertical" :interval="3500" indicator-position="none">
                    <el-carousel-item v-for="(items, key) in newest_achievements" :key="key" class="m-carousel">
                        <el-row :gutter="20">
                            <el-col :md="8" v-for="(item, k) in items" :key="k">
                                <router-link
                                    class="u-item u-item-new"
                                    :class="`u-item-${k}`"
                                    :to="{
                                        name: 'view',
                                        params: { source_id: item.ID },
                                    }"
                                >
                                    <div class="u-icon">
                                        <img :src="icon_url(item.IconID)" />
                                    </div>
                                    <div class="m-carousel-content">
                                        <span class="u-title">
                                            <i class="el-icon-medal"></i>
                                            <span v-text="` ${item.Name}`"></span>
                                        </span>
                                        <span class="u-desc">
                                            <i class="el-icon-mic"></i>
                                            <span v-html="` ${item.Desc}`"></span>
                                        </span>
                                    </div>
                                </router-link>
                            </el-col>
                        </el-row>
                    </el-carousel-item>
                </el-carousel>
            </template>
        </WikiPanel>

        <WikiPanel :border-none="true">
            <template slot="head-title">
                <i class="el-icon-collection"></i>
                <span>最近攻略</span>
            </template>
            <template slot="body">
                <el-row class="m-posts">
                    <el-col class="m-post" v-for="(post, key) in newest_posts" :key="key">
                        <div class="m-head">
                            <div class="m-achievement">
                                <div class="u-achievement">
                                    <img
                                        class="u-icon"
                                        :src="icon_url(post.source_icon_id)"
                                        @error.once="$event.target.src = icon_url('')"
                                    />
                                    <router-link
                                        class="u-name"
                                        :to="{
                                            name: 'view',
                                            params: {
                                                source_id: post.source_id,
                                            },
                                        }"
                                        v-text="post.title"
                                        target="_blank"
                                    ></router-link>
                                </div>
                                <div class="u-level" v-text="'综合难度：' + star(post.level)"></div>
                                <div class="u-remark" v-if="post.remark" v-text="'📑 ' + post.remark"></div>
                            </div>
                            <div class="m-user">
                                <div class="u-author">
                                    <img
                                        class="u-icon"
                                        :src="post.user_avatar | showAvatar"
                                        :alt="post.user_nickname"
                                    />
                                    <a
                                        :href="post.user_id ? author_url(post.user_id) : null"
                                        class="u-name"
                                        v-text="post.user_nickname"
                                        target="_blank"
                                    ></a>
                                </div>
                                <div class="u-updated" v-text="ts2str(post.updated)"></div>
                            </div>
                        </div>
                        <div class="m-body">
                            <div
                                class="u-excerpt"
                                :to="{
                                    name: 'view',
                                    params: { source_id: post.source_id },
                                }"
                                v-html="ellipsis(post.excerpt)"
                            ></div>
                        </div>
                    </el-col>
                </el-row>
            </template>
        </WikiPanel>
    </div>
</template>

<script>
import { feedback } from "@jx3box/jx3box-common/data/jx3box.json";
import { getStatRank } from "@jx3box/jx3box-common/js/stat";
import { wiki } from "@jx3box/jx3box-common/js/wiki";
import { authorLink, ts2str, iconLink, showAvatar, getLink } from "@jx3box/jx3box-common/js/utils";
import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
import { getAchievements, getWaitingRate } from "../service/achievement";
import { star } from "@/filters/star";

export default {
    name: "Home",
    data() {
        return {
            views: {},
            hot_achievements: null,
            newest_achievements: null,
            newest_posts: null,
            feedback,
            solveRate: 0,
        };
    },
    computed: {
        isStd: function () {
            return this.$store.state.client == "std";
        },
        client: function () {
            return this.$store.state.client;
        },
        hiddenAchievementsPostLink: function () {
            let id = this.client == "std" ? 8104 : 43543;
            return getLink("bbs", id);
        },
    },
    components: {
        WikiPanel,
    },
    methods: {
        icon_url: function (id) {
            return iconLink(id, this.client);
        },
        author_url: authorLink,
        ts2str,
        star,
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
                output.push(arr.slice(i, i + number));
            }
            return output;
        },
        waitingColorStyle() {
            if (this.solveRate > 95) {
                return "color: #8dfa58";
            } else if (this.solveRate > 60) {
                return "color: #e2d849";
            } else {
                return "color: #ff3838";
            }
        },
    },
    filters: {
        showAvatar: function (val) {
            return showAvatar(val);
        },
    },
    created() {
        // 获取热门成就
        const hot_key = this.client == "origin" ? "origin_cj" : "cj";
        getStatRank(hot_key, "views", 12).then((res) => {
            res = res.data;
            let source_ids = [];
            res.forEach((item) => {
                if (item.name.startsWith("cj")) {
                    let id = item.name.split("-").pop();
                    source_ids.push(id);
                    this.views[id] = item.value;
                }
            });

            getAchievements({
                ids: source_ids,
                limit: source_ids.length,
            }).then((res) => {
                res = res.data;
                // 按照长度分批
                this.hot_achievements = this.chuck(Object.values(res.data.achievements));
            });
        });

        // 获取成就列表
        getAchievements({ limit: 12 }).then(
            (res) => {
                res = res.data;
                // 按照长度分批
                this.newest_achievements = this.chuck(Object.values(res.data.achievements));
            },
            () => {
                this.newest_achievements = false;
            }
        );
        getWaitingRate().then((res) => {
            let { wiki_count: solve, source_count: all } = res.data.data ?? {};
            this.solveRate = (solve / all) * 100;
        });
        // 获取最新成就攻略列表
        wiki.list({ type: "achievement" }).then(
            (res) => {
                res = res.data;
                this.newest_posts = res.data.newest;
            },
            () => {
                this.newest_posts = false;
            }
        );
    },
};
</script>

<style lang="less">
@import "../assets/css/views/home.less";
</style>
