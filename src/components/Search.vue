<template>
    <div class="c-search-bar" :class="$route.name=='view'?'can-return':''">
        <div class="m-return">
            <el-button class="u-return-btn" @click="return_handle">返回</el-button>
        </div>
        <div class="m-search">
            <el-input class="u-search-input" v-model="keyword" @keydown.enter.native="search_handle"
                      placeholder="输入成就名称/成就描述/称号/奖励物品「回车」进行搜索"></el-input>
            <el-button class="u-search-btn" type="info" @click="search_handle">搜索</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Search",
        data() {
            return {
                keyword: '',
            };
        },
        methods: {
            return_handle() {
                history.back();
            },
            search_handle() {
                this.$router.push({name: 'search', params: {keyword: this.keyword}});
            }
        }
    }
</script>

<style lang="less">
    .c-search-bar {
        padding: 10px;

        @return-btn-width: 80px;

        .m-return {
            opacity: 0;
            .fl;
            .w(0);
            transition: all .3s ease;
        }

        &.can-return {
            .m-return {
                opacity: 1;
                .w(@return-btn-width);
            }

            .m-search {
                .ml(@return-btn-width);
            }
        }

        .m-search {
            transition: margin .3s ease;
        }

        .u-search-input {
            .w(calc(~"100% - " @search-btn-width));
            .mb(0);
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        @search-btn-width: 80px;

        .u-search-btn {
            .w(@search-btn-width);
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }
</style>