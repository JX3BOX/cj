<template>
    <div class="c-main-topbar">
        <div id="m-cj-topbar-container" :class="page=='view'?'cj-can-return':''">
            <div id="m-cj-topbar">
                <button class="btn cj-return-btn" @click="return_btn">返回</button>
                <div class="search-container" style="display: table">
                    <input type="text" class="form-control" name="cj-search" v-model="search.keyword"
                           @keydown.enter="search_enter" placeholder="输入成就名称/成就描述/称号/奖励物品「回车」进行搜索">
                    <div class="input-group-btn" style="display: table-cell;">
                        <button class="btn btn-default" id="cj-search-btn" type="submit" style="color:#666"
                                @click="search_enter">搜索
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Search"
    }
</script>

<style lang="less">
    // 顶部栏
    #m-cj-topbar-container {
        position: relative;
    }
    #m-cj-topbar {
        z-index: 105;
        transition: all .4s linear, z-index 0s linear, top 0s linear;

        &.active {
            padding: 6px 8px;
            background-color: rgba(0, 0, 0, .5);
            border-radius: 5px;
        }

        display: flex;
        flex-flow: row;
    }
</style>