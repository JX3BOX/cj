<template>
    <aside class="c-sidebar-left c-sidebar">
        <el-select v-model="module" @change="module_change_handle">
            <el-option v-for="item in modules" :key="item.key" :label="item.name" :value="item.key"></el-option>
        </el-select>
        <el-divider></el-divider>
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
                <a class="el-tree-node__label" :href="data.id" slot-scope="{ node, data }">
                    <span class="u-name" v-text="data.name"></span>
                    <em class="u-count" v-text="`(${data.achievements_count})`"></em>
                </a>
            </el-tree>
        </div>
    </aside>
</template>

<script>
    const {JX3BOX} = require("@jx3box/jx3box-common");
    const axios = require("axios");

    export default {
        name: "Sidebar",
        data: function () {
            return {
                filterText: "",
                menus: [],
                old_node: null,
                // 模块
                module: 'normal',
                modules: [
                    {key: 'normal', name: '常规成就', url: ''},
                    {key: 'top_five', name: '五甲成就', url: ''},
                    {key: 'newest', name: '最新成就', url: ''},
                    {key: 'waiting', name: '待攻略成就', url: ''},
                    {key: 'out_print', name: '绝版成就', url: ''},
                ]
            };
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        computed: {},
        methods: {
            module_change_handle() {
                for (let index in this.modules) {
                    if (this.modules[index].key === this.module) {
                        this.$emit('moduleChange', this.modules[index]);
                        break;
                    }
                }
            },
            menu_change_handle(obj){
                this.$emit('menuChange', obj);
            },
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
                // TODO:点击节点时切换数据
                //get_achievements
                console.log(data);
            },
            getMenus(general) {
                let that = this;
                axios({
                    method: "GET",
                    url: `${JX3BOX.__helperUrl}api/achievement/menus?general=${general}`,
                }).then(function (data) {
                    data = data.data;
                    //if (data.code === 200) {
                    var menus = [];
                    for (let i in data.data.menus) menus.push(data.data.menus[i]);
                    that.menus = menus;
                    //}
                }, function () {
                    that.menus = false;
                });
            }
        },
        mounted: function () {
            this.getMenus(1);
            // TODO:异步加载侧边栏数据
            /*this.data = [
                {
                    id: 2,
                    label: "一级",
                    count: 123,
                    children: [
                        {
                            id: 5,
                            label: "二级",
                            count: 123
                        },
                        {
                            id: 6,
                            label: "二级",
                            count: 56
                        }
                    ]
                },
                {
                    id: 3,
                    label: "一级",
                    count: 123,
                    children: [
                        {
                            id: 7,
                            label: "二级",
                            count: 123
                        },
                        {
                            id: 8,
                            label: "二级",
                            count: 123
                        }
                    ]
                }
            ];*/
        }
    };
</script>

<style lang="less">
    .el-tree {
        background: none;
    }

    .el-select {
        .w(100%);
    }

    .el-divider {
        .mt(0);
        .mb(10px);
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
