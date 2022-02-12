<template>
    <div class="m-search-bar" :class="$route.name == 'view' ? 'can-return' : ''">
        <div class="m-return">
            <el-button class="u-return-btn" @click="return_handle"><i class="el-icon-arrow-left"></i>返回</el-button>
        </div>
        <div class="m-search">
            <el-input class="u-search-input" v-model="keyword" @keydown.enter.native="search_handle" placeholder="输入成就名称/成就描述/称号/奖励物品「回车」进行搜索">
                <span slot="prepend"><i class="el-icon-search"></i> 关键词</span>
                <el-button slot="append" class="u-search-btn" type="primary" plain @click="search_handle"><i class="el-icon-position"></i> 搜索</el-button>
            </el-input>
        </div>
    </div>
</template>

<script>
export default {
    name: "Search",
    data() {
        return {
            keyword: "",
        };
    },
    methods: {
        return_handle() {
            history.back();
        },
        search_handle() {
            delete this.$store.state.scroll_tops["search"];
            this.$router.push({
                name: "search",
                params: { keyword: this.keyword },
            });
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/components/search.less";
</style>
