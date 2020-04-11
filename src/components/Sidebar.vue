<template>
    <aside class="c-sidebar-left c-sidebar">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <div class="m-menus">
            <el-tree
                    class="filter-tree"
                    :data="menus"
                    node-key="id"
                    :expand-on-click-node="false"
                    @node-click="clickNode"
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
        props: ['general', 'sub', 'detail'],
        data: function () {
            return {
                filterText: "",
                menus: [],
                old_node: null,
            };
        },
        watch: {
            general: {
                immediate: true,
                handler() {
                    // 异步加载侧边栏数据
                    if (this.general) this.get_menus(this.general);
                }
            },
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
                var that = this;
                // Sub菜单下无成就时，默认打开第一个Detail菜单
                let first_node = null;
                if (data.own_achievements_count === 0) {
                    first_node = node.childNodes[0];
                    if (first_node) {
                        setTimeout(function () {
                            that.$router.push({
                                name: 'normal',
                                params: {sub: first_node.data.sub, detail: first_node.data.detail}
                            });
                        }, 100);
                        this.$refs.tree.store.setCurrentNode(first_node);
                    }
                }

                // 展开/收起
                let _node = first_node ? first_node : node;
                if (node.expanded !== true) {
                    node.expanded = true;
                } else if (this.old_node == _node) {
                    node.expanded = false;
                }

                // 记录上一个节点
                this.old_node = _node;
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

                        that.$nextTick(function () {
                            // 默认展开当前菜单
                            var sub = that.sub ? that.sub : that.$route.params.sub;
                            var detail = that.detail ? that.detail : that.$route.params.detail;
                            var key = sub + (detail ? `-${detail}` : '');

                            var node = that.$refs.tree.store.getNode(key);
                            if (node) {
                                node.expanded = true;
                                if (node.parent) node.parent.expanded = true;
                                that.$refs.tree.store.setCurrentNode(node);
                            }
                        });
                    }
                }, function () {
                    that.menus = false;
                });
            }
        },
        mounted: function () {
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
        .fz(14px, 28px);
        .h(28px);
        user-select: none;
    }

    //子级节点
    .is-leaf + .el-tree-node__label {
        &:before {
            content: "»";
            color: @color;
            .mr(5px);
        }
    }
</style>
