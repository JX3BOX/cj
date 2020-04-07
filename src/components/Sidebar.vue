<template>
    <aside class="c-sidebar-left c-sidebar">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <div class="m-menus">
            <el-tree
                    class="filter-tree"
                    :data="menus"
                    :expand-on-click-node="false"
                    @node-click="clickNode"
                    @current-change="changeNode"
                    :filter-node-method="filterNode"
                    ref="tree"
            >
                <router-link class="el-tree-node__label" slot-scope="{ node, data }"
                             :to="{ name: 'normal', params: {sub: data.sub, detail: data.detail} }">
                    <span class="u-name" v-text="data.name"></span>
                    <em class="u-count" v-text="`(${data.achievements_count})`"></em>
                </router-link>
            </el-tree>
        </div>
    </aside>
</template>

<script>
    const {JX3BOX} = require("@jx3box/jx3box-common");
    const axios = require("axios");

    export default {
        name: "Sidebar",
        props: ['general'],
        data: function () {
            return {
                filterText: "",
                menus: [],
                old_node: null,
            };
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            clickNode(data, node) {
                if (node.expanded !== true) {
                    node.expanded = true;
                } else if (data.own_achievements_count === 0 || data.own_achievements_count > 0 && this.old_node == node) {
                    node.expanded = false;
                }

                // 记录上一个节点
                this.old_node = node;
            },
            changeNode(data, node) {
                // 点击节点时切换数据
                this.$emit('node_change', data, node);
            },
            get_menus(general) {
                let that = this;
                axios({
                    method: "GET",
                    url: `${JX3BOX.__helperUrl}api/achievement/menus?general=${general}`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                }).then(function (data) {
                    data = data.data;
                    if (data.code === 200) {
                        var menus = [];
                        for (let i in data.data.menus) menus.push(data.data.menus[i]);
                        that.menus = menus;
                    }
                }, function () {
                    that.menus = false;
                });
            }
        },
        mounted: function () {
            // 异步加载侧边栏数据
            this.get_menus(this.general);
        }
    };
</script>

<style lang="less">
    .el-tree {
        background: none;
    }

    .el-input {
        .mb(10px);
    }

    .is-current {
        & > .el-tree-node__content {
            .bold;
        }
    }

    //节点
    .m-menus {
        height: calc(~"100% - 50px");
        overflow-y: auto;
    }

    .el-tree-node__label {
        display: block;
        width: 100%;

        .u-name {
            color: @color-link;
        }

        .u-count {
            .fz(13px);
            color: #888888;
            .ml(5px);
            font-style: normal;
        }
    }

    //父级节点
    .el-tree-node__content {
        .fz(15px, 40px);
        .h(40px);
        user-select: none;
    }

    //子级节点
    .is-leaf + .el-tree-node__label {
        .fz(14px, 28px);
        .h(28px);

        &:before {
            content: "»";
            color: @color;
            .mr(5px);
        }
    }
</style>
