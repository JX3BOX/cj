<template>
    <aside class="c-sidebar-left c-sidebar">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>

        <el-tree
            class="filter-tree"
            :data="data"
            :render-content="renderContent"
            @node-click="changeNode"
            :filter-node-method="filterNode"
            ref="tree"
        >
        </el-tree>
    </aside>
</template>

<script>
export default {
    name: "Sidebar",
    data: function() {
        return {
            filterText: "",
            data: []
        };
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    computed: {},
    methods: {
        renderContent(h, { node, data, store }) {
            return (
                <span class="el-tree-node__label">
                    <span class="u-name">{node.label}</span>
                    <em class="u-count">({data.count})</em>
                </span>
            );
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        changeNode(data) {
            // TODO:点击节点时切换数据
            console.log(data)
        }
    },
    mounted: function() {
        // TODO:异步加载侧边栏数据
        this.data = [
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
        ];
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
.is-current{
    .bold;
}

//节点
.el-tree-node__label{
    .u-name{
        color: @color-link;
    }
    .u-count{
        .fz(13px);
        color:#888;
        .ml(5px);
        font-style:normal;
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
