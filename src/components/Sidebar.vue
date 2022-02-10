<template>
    <div class="m-left-side">
        <el-select v-model="sidebar.general">
            <el-option v-for="type in menu_types" :key="type.value" :label="type.label" :value="type.value"></el-option>
        </el-select>
        <div class="m-menus">
            <el-tree
                class="filter-tree"
                :class="{ other: [3,4,5,].includes(sidebar.general) }"
                :data="menus"
                node-key="id"
                :expand-on-click-node="false"
                @node-click="clickNode"
                :filter-node-method="filterNode"
                ref="tree"
            >
                <!-- TODO: 奇遇成就和宠物成就router active -->
                <router-link class="el-tree-node__label" slot-scope="{ data }" :to="menu_url(data)">
                    <span class="u-name" v-text="data.name"></span>
                    <em v-if="data.achievements_count" class="u-count" v-text="`(${data.achievements_count})`"></em>
                </router-link>
            </el-tree>
        </div>
    </div>
</template>

<script>
import { getMenus } from "../service/achievement";

import Bus from "@jx3box/jx3box-common-ui/service/bus";

export default {
    name: "Sidebar",
    props: ["sidebar"],
    data() {
        return {
            menus_cache: [],
            menus: [],
            old_node: null,
            menu_types: [
                { value: 1, label: "常规成就" },
                { value: 2, label: "五甲成就" },
                { value: 4, label: "宠物成就" },
                { value: 5, label: "奇遇成就" },
                // { value: 3, label: "其他板块" },
            ],
        };
    },
    watch: {
        sidebar: {
            immediate: true,
            deep: true,
            handler(new_val, old_val) {
                let that = this;

                // 展开菜单
                that.expand_menu();

                // 异步加载侧边栏数据
                if (that.sidebar.general) that.get_menus(this.sidebar.general);
            },
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
                            name: that.sidebar.general == 2 ? "top_five" : "normal",
                            params: {
                                sub: first_node.data.sub,
                                detail: first_node.data.detail,
                            },
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

            // 移动端收起边栏
            if (window.innerWidth < 1024) {
                if (node.isLeaf) {
                    Bus.$emit("toggleLeftSide", false);
                }
            }
        },
        get_menus(general) {
            let that = this;

            if (that.menus_cache[general]) {
                that.menus = that.menus_cache[general];
                return;
            }

            if (general == 3) {
                that.menus = [
                    { name: "最新成就", id: "newest", router: "newest" },
                    { name: "待攻略成就", id: "waiting", router: "waiting" },
                    { name: "绝版成就", id: "out_print", router: "out_print" },
                    { name: "奇遇成就", id: "adventure", router: "adventure" },
                    { name: "珍奇成就", id: "rare", router: "rare" },
                ];
                return;
            }

            if (general === 4) {
                that.menus = [{ name: "宠物成就", id: "rare", router: "rare" }];
                that.$router.push({ name: 'rare' })
                that.$refs.tree.setCurrentKey('rare')
                return;
            }
            if (general === 5) {
                that.menus = [{ name: "奇遇成就", id: "adventure", router: "adventure" }];
                that.$router.push({ name: 'adventure' })
                // that.$refs.tree.setCurrentKey('adventure')
                return;
            }

            getMenus(general).then(
                (data) => {
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
                },
                () => {
                    that.menus = false;
                }
            );
        },
        expand_menu() {
            let that = this;
            that.$nextTick(function () {
                // 默认展开当前菜单
                let key = "";
                if (that.sidebar.general != 3) {
                    let sub = that.sidebar.sub;
                    let detail = that.sidebar.detail;
                    key = sub + (detail ? `-${detail}` : "");
                } else {
                    key = that.sidebar.other;
                }

                if (key) {
                    let node = that.$refs.tree.store.getNode(key);
                    if (node) {
                        node.expanded = true;
                        if (node.parent) node.parent.expanded = true;
                        that.$refs.tree.store.setCurrentNode(node);
                        return;
                    }
                }
                // let all = that.$refs.tree.store._getAllNodes();
                // for (let i = 0; i < all.length; i++) all[i].expanded = false;
            });
        },
        menu_url(data) {
            switch (this.sidebar.general) {
                case 1:
                    return {
                        name: "normal",
                        params: { sub: data.sub, detail: data.detail },
                    };
                case 2:
                    return {
                        name: "top_five",
                        params: { sub: data.sub, detail: data.detail },
                    };
                case 3:
                case 4:
                case 5:
                    return { name: data.router };
            }
            return null;
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/components/left_side.less";
</style>
