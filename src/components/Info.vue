<template>
    <div class="m-cj-aside-right" :class="{isHome : isHome}">
        <RightSideMsg>
            <em>官方反馈交流Q群</em> :
            <strong
                ><a href="https://jq.qq.com/?_wv=1027&k=5S50j08"
                    >614370825</a
                ></strong
            >
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
                            <a class="u-contributor" :href="author_url(rank.user_id)">
                                <i class="u-avatar">
                                    <img
                                        :src="
                                            rank.user_avatar | resolveAvatarPath
                                        "
                                        :alt="rank.user_nickname"
                                    />
                                </i>
                                <span class="u-name" v-text="rank.user_nickname"></span>
                                <em class="u-count"
                                    >+ {{ rank.total_score }}</em
                                >
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
                    >申请展示</a
                >
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

        <!-- <Github_REPO REPO="cj" coder="5"/> -->
    </div>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
import { get_groups } from '../service/group';

export default {
    name: "Info",
    props: [],
    data: function() {
        return {
            active_rank_type: "11",
            rank_types: [
                { sub: "11", name: "秘境" },
                { sub: "40", name: "家园" },
                { sub: "7", name: "任务" },
                { sub: "5", name: "技艺" },
                { sub: "9", name: "战斗" },
                { sub: "6", name: "阅读" },
                { sub: "16", name: "活动" },
                { sub: "8", name: "足迹" },
                { sub: "15", name: "节日" },
            ],
            ranks: null,
            groups: null,
            isHome : true
        };
    },
    computed: {},
    methods: {
        author_url(user_id) {
            return `${JX3BOX.__Root}/author?uid=${user_id}`;
        },
        copy_success() {
            this.$notify({ title: "复制成功", type: "success" });
        },
        copy_error() {
            this.$notify({ title: "浏览器不支持", type: "error" });
        },
        get_users_ranks(sub) {
            let that = this;
            that.$http({
                method: "GET",
                url:
                    `${JX3BOX.__helperUrl}api/achievement/users/ranking` +
                    (sub ? `?sub=${sub}` : ""),
                headers: { Accept: "application/prs.helper.v2+json" },
                withCredentials: true,
            }).then(
                function(data) {
                    data = data.data;
                    if (data.code === 200) {
                        that.ranks = data.data.ranking;
                    }
                },
                function() {
                    that.ranks = false;
                }
            );
        },
        checkIsHome : function (){
            this.isHome =  this.$route.name == 'home' || !this.$route.name
        }
    },
    mounted: function() {
        // 获取成就群
        get_groups('achievement', {group_by: 'server'}).then(
            (data) => {
                data = data.data;
                if (data.code === 200) {
                    this.groups = data.data.groups;
                }
            },
            () => {
                this.groups = false;
            }
        )
        this.checkIsHome()
    },
    watch: {
        active_rank_type: {
            immediate: true,
            handler() {
                this.get_users_ranks(this.active_rank_type);
            },
        },
        '$route.name' : function (newpath){
            this.checkIsHome()
        }
    },
    filters: {
        resolveAvatarPath: function(val) {
            return val.replace(JX3BOX.__ossRoot, JX3BOX.__ossMirror);
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/right_side.less";
</style>
