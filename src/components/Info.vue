<template>
    <RightSidebar>
        <RightSideMsg>
            <em>官方反馈交流Q群</em> : <strong>614370825</strong>
        </RightSideMsg>

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
                <el-collapse-item title="A组" name="1">
                    <div>
                        A组详情
                    </div>
                </el-collapse-item>
                <el-collapse-item title="B组" name="2">
                    <div>
                        B组详情
                    </div>
                </el-collapse-item>
                <el-collapse-item title="C组" name="3">
                    <div>
                        C组详情
                    </div>
                </el-collapse-item>
                <el-collapse-item title="D组" name="4">
                    <div>
                        D组详情
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>

        <Github_REPO REPO="cj" />
    </RightSidebar>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");

export default {
    name: "Info",
    props: [],
    data: function() {
        return {
            ranks: null,
            activeName: "",
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
.m-title {
    .fz(18px, 24px);
    font-weight: 300;
    margin: 0 0 10px 0;
    padding: 0 0 5px 0;
    border-bottom: 1px solid #ebeef5;
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
        padding: 5px 0;

        &:hover {
            background-color: @bg-light;
        }
    }

    @h: 24px;

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

    .m-title {
        border-bottom: none;

        .u-icon {
            .y(-3px);
        }
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
