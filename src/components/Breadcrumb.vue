<template>
    <div class="c-breadcrumb">
        <router-link class="u-channel" :to="{ name: 'home' }">
            <img class="u-channel-logo" svg-inline src="../assets/img/cj.svg"/>
            <span class="u-title">成就百科</span>
        </router-link>
        <!-- TODO:实装统计数据 -->
        <div class="u-stat">
            <span><em>常规成就数</em><b>4437</b></span>
            <span><em>常规资历数</em><b>119285</b></span>
            <span><em>五甲成就数</em><b>393</b></span>
            <span><em>五甲资历数</em><b>15120</b></span>
            <span><em>收录攻略数</em><b>5545</b></span>
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
    export default {
        name: "Breadcrumb",
        props: [],
        data: function () {
            return {};
        },
        computed: {},
        methods: {},
        mounted: function () {
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
            .rt(10px, 4px);
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
