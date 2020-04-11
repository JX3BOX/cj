<template>
    <div class="c-breadcrumb">
        <router-link class="u-channel" :to="{ name: 'home' }">
            <img class="u-channel-logo" svg-inline src="../assets/img/cj.svg"/>
            <span class="u-title">成就百科</span>
        </router-link>
        <div class="u-stat">
            <span><em>常规成就数</em><b v-text="count.general"></b></span>
            <span><em>常规资历数</em><b v-text="count.general_point"></b></span>
            <span><em>五甲成就数</em><b v-text="count.armor"></b></span>
            <span><em>五甲资历数</em><b v-text="count.armor_point"></b></span>
            <span><em>收录攻略数</em><b v-text="count.post_count"></b></span>
        </div>
        <!-- 发布按钮TODO:添加路由地址 -->
        <el-button
                class="u-publish"
                type="primary"
                icon="el-icon-edit"
        >发布
        </el-button>
    </div>
</template>
<script>
    const {JX3BOX} = require("@jx3box/jx3box-common");
    const axios = require("axios");

    export default {
        name: "Breadcrumb",
        props: [],
        data: function () {
            return {
                count: {}
            };
        },
        computed: {},
        methods: {
            // 输出成就总数统计
            get_total_count() {
                var that = this;
                axios({
                    method: "GET",
                    url: `${JX3BOX.__helperUrl}api/achievements/count`,
                }).then(function (data) {
                    data = data.data;
                    //if (data.code === 200) {
                    that.count = data.data.count;
                    //}
                }, function () {
                    console.error('接口连接异常')
                });
            }
        },
        mounted: function () {
            // 输出成就总数统计
            this.get_total_count()
        }
    };
</script>

<style lang="less">
    .c-breadcrumb {
        top: @header-height;
        .w(100%);
        .h(@bread-height);
        // background-color: @bg-light;
        background-color: #fff;
        padding: 10px;
        box-sizing: border-box;
        .lh(28px);
        border-bottom: 1px solid @border-hr;
        .z(500);

        .u-channel {
            .fl;

            span {
                .bold;
                // .fz(16px);
                // font-weight: 300;
                color: @color;
            }

            .mr(30px);
        }

        .u-channel-logo {
            .fl;
            .size(28px);
            .mr(10px);
            fill: @bg-black;
        }

        .u-stat {
            // .x;
            .fz(14px);

            em {
                .mr(10px);
                // .bold;
                font-style: normal;
            }

            b {
                font-style: italic;
                color: @light-blue;

                &:after {
                    content: "|";
                    font-weight: 300;
                    color: #999;
                    .ml(10px);
                    font-family: Georgia, "Times New Roman", Times, serif;
                }
            }

            span {
                .mr(10px);

                &:last-child b {
                    &:after {
                        .none;
                    }
                }
            }
        }

        .pf;

        .u-publish {
            .pa;
            .rt(10px, 8px);
            padding: 8px 18px;
        }
    }

    @media screen and (max-width: @ipad) {
        .c-breadcrumb {
            .u-stat {
                white-space: nowrap;
                overflow: auto;
            }

            .u-publish {
                .none;
            }
        }
    }
</style>
