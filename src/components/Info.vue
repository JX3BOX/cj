<template>
    <aside class="c-sidebar-right c-sidebar">
        <RightSideMsg :msg="msg" />

        <div class="m-rank">
            <h2 class="m-title">
                <img class="u-icon" svg-inline src="../assets/img/rank.svg" />
                <span class="u-text">贡献榜</span>
            </h2>
            <ul class="u-list">
                <li v-for="(rank, key) in ranks" :key="key">
                    <a class="u-contributor" href="">
                        <i class="u-avatar">
                            <img
                                :src="rank.user_avatar"
                                :alt="rank.user_nickname"
                            />
                        </i>
                        <span class="u-name" v-text="rank.user_nickname"></span>
                        <em class="u-count">+ {{ rank.total_score }}</em>
                    </a>
                </li>
            </ul>
        </div>

        <div class="m-group">
            <h2 class="m-title">
                <img class="u-icon" svg-inline src="../assets/img/puzzle.svg" />
                <span class="u-text">各区服成就群</span>
            </h2>
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="一致性 Consistency" name="1">
                    <div>
                        与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                    </div>
                    <div>
                        在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
                    </div>
                </el-collapse-item>
                <el-collapse-item title="反馈 Feedback" name="2">
                    <div>
                        控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
                    </div>
                    <div>
                        页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。
                    </div>
                </el-collapse-item>
                <el-collapse-item title="效率 Efficiency" name="3">
                    <div>简化流程：设计简洁直观的操作流程；</div>
                    <div>
                        清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
                    </div>
                    <div>
                        帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
                    </div>
                </el-collapse-item>
                <el-collapse-item title="可控 Controllability" name="4">
                    <div>
                        用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
                    </div>
                    <div>
                        结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>

        <Github_REPO REPO="cj" />
    </aside>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");

export default {
    name: "Info",
    props: [],
    data: function() {
        return {
            ranks: null,
            msg: "<em>官方反馈交流Q群</em> : <strong>614370825</strong>",
            activeName : '1'
        };
    },
    computed: {},
    methods: {
        get_users_ranks() {
            var that = this;
            that.$http({
                method: "GET",
                url: `${JX3BOX.__helperUrl}api/achievement/users/ranking`,
                headers: {Accept: "application/prs.helper.v2+json"},
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
    },
    mounted: function() {
        this.get_users_ranks();
    },
    components: {},
};
</script>

<style lang="less">
.c-sidebar-right {
    .m-title {
        .fz(18px, 24px);
        font-weight: 300;
        margin: 0 0 10px 0;
        padding: 0 0 5px 0;
        border-bottom: 1px dotted #eee;
    }
}


.m-rank {
    padding: 15px;

    .u-icon {
        .h(24px);
        .y(top);
        fill: @bg-black;
        .mr(5px);
    }

    .u-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            // margin-bottom: 10px;
        }
    }

    .u-contributor {
        .db;
        padding:5px 0;

        &:hover {
            background-color: @bg-light;
        }
    }

    @h:24px;

    .u-avatar {
        .db;
        .fl;
        .size(@h);
        .mr(15px);

        img {
            .db;
            .full;
        }
    }

    .u-name {
        .fz(13px);
        .lh(@h);
        color: #555;
        // font-weight:300;
    }

    .u-count {
        .fz(12px, @h);
        color: @primary;
        .fr;
    }
}

.m-group {
    padding: 15px;

    .m-title{
        border-bottom:none;
    }

    .u-icon {
        .size(18px);
        .mr(10px);
    }

    .u-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            margin-bottom: 10px;
        }

        .fz(13px);

        b {
            color: #666;
        }
    }
}


</style>
