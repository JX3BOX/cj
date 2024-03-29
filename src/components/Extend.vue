<template>
    <div class="m-right-side" :class="{isHome: isHome}">
        <RightSideMsg>
            <em>官方反馈交流Q群</em> :
            <strong @click="onQQClick" class="u-link" title="点击复制">
                <a>{{ qq }}</a>
            </strong>
        </RightSideMsg>

        <div class="m-rank">
            <h2 class="m-title">
                <img class="u-icon" svg-inline src="../assets/img/rank.svg" />
                <span class="u-text">贡献榜</span>
            </h2>
            <el-tabs v-model="active_rank_type">
                <el-tab-pane
                    v-for="(type, key) in rank_types"
                    :key="key"
                    :label="type.name"
                    :name="type.sub"
                >
                    <ul class="u-list">
                        <li v-for="(rank, k) in ranks" :key="k">
                            <a
                                class="u-contributor"
                                :href="rank.user_id ? author_url(rank.user_id) : null"
                            >
                                <i class="u-avatar">
                                    <img
                                        :src="rank.user_avatar | resolveAvatarPath"
                                        :alt="rank.user_nickname"
                                    />
                                </i>
                                <span class="u-name" v-text="rank.user_nickname"></span>
                                <em class="u-count">+ {{ rank.total_score }}</em>
                            </a>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="m-group">
            <h2 class="m-title">
                <img class="u-icon" svg-inline src="../assets/img/puzzle.svg" />
                <span class="u-text">各区服成就群</span>
                <a
                    class="u-show-message"
                    target="_blank"
                    href="https://www.jx3box.com/tool/13659/"
                >申请展示</a>
            </h2>
            <el-collapse accordion>
                <el-collapse-item
                    v-for="(server, key) in groups"
                    :title="key"
                    :key="key"
                    :name="key"
                >
                    <ul class="u-groups">
                        <li v-for="(group, k) in server" :key="k">
                            <el-tag
                                class="u-platform"
                                v-if="group.platform == 'QQ'"
                                size="mini"
                                v-text="`${group.platform}群`"
                            ></el-tag>
                            <el-tag
                                class="u-platform"
                                v-if="group.platform == 'YY'"
                                size="mini"
                                type="info"
                                v-text="`${group.platform}群`"
                            ></el-tag>
                            <el-button
                                class="u-number"
                                size="mini"
                                v-text="group.number"
                                v-clipboard:copy="group.number"
                                v-clipboard:success="copy_success"
                                v-clipboard:error="copy_error"
                            ></el-button>
                        </li>
                    </ul>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
import { authorLink } from "@jx3box/jx3box-common/js/utils";
import { get_groups } from "../service/group";
import { getAchievementRanking } from "../service/achievement";
import { __ossRoot, __ossMirror } from '@jx3box/jx3box-common/data/jx3box.json'

export default {
    name: "Extend",
    data() {
        return {
            active_rank_type: "11",
            rank_types: [
                { sub: "11", name: "秘境" },
                { sub: "7", name: "任务" },
                { sub: "10", name: "声望" },
                { sub: "40", name: "家园" },
                { sub: "5", name: "技艺" },
                { sub: "9", name: "战斗" },
                { sub: "6", name: "阅读" },
                { sub: "16", name: "活动" },
                { sub: "8", name: "足迹" },
                { sub: "15", name: "节日" },
            ],
            ranks: null,
            groups: null,
            isHome: true,

            qq: "614370825",
        };
    },
    methods: {
        author_url: authorLink,
        copy_success() {
            this.$notify({ title: "复制成功", type: "success" });
        },
        copy_error() {
            this.$notify({ title: "浏览器不支持", type: "error" });
        },
        get_users_ranks(sub) {
            let that = this;
            getAchievementRanking(sub).then(
                (data) => {
                    data = data.data;
                    that.ranks = data.data.ranking;
                },
                () => {
                    that.ranks = false;
                }
            );
        },
        checkIsHome: function () {
            this.isHome = this.$route.name == "home" || !this.$route.name;
        },
        onQQClick() {
            navigator.clipboard.writeText(this.qq).then(() => {
                this.$notify({
                    title: "复制成功",
                    message: "内容：" + this.qq,
                    type: "success",
                });
            })
        }
    },
    mounted() {
        // 获取成就群
        get_groups("achievement", {
            order_by: "server",
            group_by: "server",
        }).then(
            (data) => {
                data = data.data;
                if (data.code === 200) {
                    this.groups = data.data.groups;
                }
            },
            () => {
                this.groups = false;
            }
        );
        this.checkIsHome();
    },
    watch: {
        active_rank_type: {
            immediate: true,
            handler() {
                this.get_users_ranks(this.active_rank_type);
            },
        },
        "$route.name": function () {
            this.checkIsHome();
        },
    },
    filters: {
        resolveAvatarPath: function (val) {
            return val.replace(__ossRoot, __ossMirror);
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/components/right_side.less";
</style>
