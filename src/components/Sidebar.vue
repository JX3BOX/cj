<template>
    <div class="m-cj-aside-left">
        <el-select v-model="sidebar.general">
            <el-option v-for="type in menu_types" :key="type.value" :label="type.label" :value="type.value"></el-option>
        </el-select>
        <div class="m-menus">
            <el-tree
                    class="filter-tree" :class="{other:sidebar.general==3}"
                    :data="menus"
                    node-key="id"
                    :expand-on-click-node="false"
                    @node-click="clickNode"
                    :filter-node-method="filterNode"
                    ref="tree"
            >
                <router-link class="el-tree-node__label" slot-scope="{ node, data }" :to="menu_url(data)">
                    <span class="u-name" v-text="data.name"></span>
                    <em v-if="data.achievements_count" class="u-count" v-text="`(${data.achievements_count})`"></em>
                </router-link>
            </el-tree>
        </div>
    </div>
</template>

<script>
    const {JX3BOX} = require("@jx3box/jx3box-common");

    export default {
        name: "Sidebar",
        props: ['sidebar'],
        data: function () {
            return {
                menus_cache: [],
                menus: [],
                old_node: null,
                menu_types: [
                    {value: 1, label: '常规成就'},
                    {value: 2, label: '五甲成就'},
                    {value: 3, label: '其他板块'},
                ],
            };
        },
        watch: {
            'sidebar': {
                immediate: true,
                deep: true,
                handler(new_val, old_val) {
                    let that = this;

                    // 展开菜单
                    that.expand_menu();

                    // 异步加载侧边栏数据
                    if (that.sidebar.general) that.get_menus(this.sidebar.general);
                }
            },
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            clickNode(data, node) {
                let that = this;
                // Sub菜单下无成就时，默认打开第一个Detail菜单
                let first_node = null;
                if (data.own_achievements_count === 0) {
                    first_node = node.childNodes[0];
                    if (first_node) {
                        setTimeout(function () {
                            that.$router.push({
                                name: that.sidebar.general == 2 ? 'top_five' : 'normal',
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

                if (that.menus_cache[general]) {
                    that.menus = that.menus_cache[general];
                    return;
                }

                if (general == 3) {
                    that.menus = [
                        {name: '最新成就', router: 'newest'},
                        {name: '待攻略成就', router: 'waiting'},
                        {name: '绝版成就', router: 'out_print'},
                        {name: '奇遇成就', router: 'adventure'},
                        {name: '珍奇成就', router: 'rare'},
                    ];
                    return;
                }

                this.$http({
                    method: "GET",
                    url: `${JX3BOX.__helperUrl}api/achievement/menus?general=${general}`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                    withCredentials: true
                }).then(function (data) {
                    data = data.data;
                    if (data.code === 200) {
                        let menus = [];
                        for (let i in data.data.menus) menus.push(data.data.menus[i]);
                        that.menus = menus;

                        // 缓存菜单数据
                        that.menus_cache[general] = menus;

                        // 展开菜单
                        that.expand_menu();
                    }
                }, function () {
                    that.menus = false;
                });
            },
            expand_menu() {
                let that = this;
                that.$nextTick(function () {
                    // 默认展开当前菜单
                    let sub = that.sidebar.sub;
                    let detail = that.sidebar.detail;
                    let key = sub + (detail ? `-${detail}` : '');

                    let node = that.$refs.tree.store.getNode(key);
                    if (node) {
                        node.expanded = true;
                        if (node.parent) node.parent.expanded = true;
                        that.$refs.tree.store.setCurrentNode(node);
                    } else {
                        let all = that.$refs.tree.store._getAllNodes();
                        for (let i = 0; i < all.length; i++) all[i].expanded = false;
                    }
                });
            },
            menu_url(data) {
                switch (this.sidebar.general) {
                    case 1:
                        return {name: 'normal', params: {sub: data.sub, detail: data.detail}};
                    case 2:
                        return {name: 'top_five', params: {sub: data.sub, detail: data.detail}};
                    case 3:
                        return {name: data.router};
                }
                return null;
            },
        },
        mounted: function () {
        }
    };
</script>

<style lang="less">
    .el-select {
        .db;
    }

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

    .m-cj-aside-left {
        .h(100%);
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

    .filter-tree.other {
        .el-tree-node__content {
            height: 48px;
            line-height: 48px;
        }

        .el-tree-node__label {
            padding: 0 15px;
            border-bottom: 1px solid #EEEEEE;
        }

        .is-leaf,
        .el-tree-node__label:before {
            .none;
        }
    }


</style>