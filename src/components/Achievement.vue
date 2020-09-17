<template>
    <li class="m-cj" v-if="JSON.stringify(achievement) !== '{}'">
        <div class="c-cj" :class="fold ? 'fold' : ''">
            <div class="cj-head">
                <a class="u-title" :target="target_filter()" @click="url_filter(achievement.ID)"
                   v-text="achievement.Name"></a>
                <span class="u-attr"
                      v-text="achievement.post?('修订时间：'+$options.filters.date_format(achievement.post.updated)):''"></span>
                <span class="u-attr" v-text="achievement.post?('综合难度：'+$options.filters.star(achievement.post.level)):''"></span>
            </div>
            <div class="cj-body">
                <div class="m-left">
                    <a class="u-attr u-icon" :target="target_filter()" @click="url_filter(achievement.ID)">
                        <img class="u-icon" :src="icon_url_filter(achievement.IconID)" @error.once="img_error_handle"/>
                    </a>
                    <a class="u-attr u-desc" v-html="description_filter(achievement.Desc)"
                       @click="url_filter(achievement.ID)"></a>
                </div>
                <div class="m-right">
                    <div class="u-attr">
                        <item :item="achievement.Item"></item>
                    </div>
                    <div class="u-attr u-point" v-text="achievement.Point ? achievement.Point : 0"></div>
                </div>
            </div>
            <div class="cj-footer">
                <div v-if="achievement.Prefix || achievement.Postfix" class="u-ch">
                    <div v-if="achievement.PrefixName" v-text="'称号前缀：' + achievement.PrefixName"></div>
                    <div v-if="achievement.PostfixName" v-text="'称号后缀：' + achievement.PostfixName"></div>
                </div>
                <el-row v-if="achievement.SubAchievementList" class="cj-subs" :gutter="30">
                    <el-col
                        v-for="(sub_achievement, key) in achievement.SubAchievementList"
                        :key="key" :xs="12" :sm="8" :md="8" class="cj-sub"
                    >
                        <router-link
                            :to="sub_achievement.Visible == 1 ? {name: 'view',params: { cj_id: sub_achievement.ID }} : {}"
                            target="_blank" :title="description_filter(sub_achievement.ShortDesc)">
                            <img class="u-icon" :src="icon_url_filter(sub_achievement.IconID)"/>
                            <span v-text="sub_achievement.Name"></span>
                        </router-link>
                    </el-col>
                </el-row>
                <div v-if="achievement.SeriesAchievementList" class="cj-seriess">
                    <div
                        v-for="(series_achievement, key) in achievement.SeriesAchievementList"
                        class="cj-series" :key="key" :class="series_achievement.ID == achievement.ID ? 'active' : ''"
                    >
                        <router-link :to="{name: 'view', params: { cj_id: series_achievement.ID }}">
                            <img class="u-icon" :src="icon_url_filter(series_achievement.IconID)"/>
                            <div class="detail">
                                <h4 v-text="series_achievement.Name"></h4>
                                <p v-html="description_filter(series_achievement.ShortDesc)"></p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="u-expand" :class="{'disable':is_empty(achievement)}" @click="fold = !fold">
                <hr/>
                <i class="u-icon el-icon-caret-top"></i>
                <i class="u-icon el-icon-caret-bottom"></i>
            </div>
        </div>
    </li>
</template>

<script>
    const {JX3BOX} = require("@jx3box/jx3box-common");
    import Item from "@/components/Item.vue";

    export default {
        name: "Achievement",
        props: ["achievement", "fold", "target", "jump"],
        data: function () {
            return {
                JX3BOX,
            };
        },
        methods: {
            img_error_handle(e) {
                e.target.src = `${JX3BOX.__imgPath}image/common/nullicon.png`;
            },
            is_empty(achievement) {
                return !(
                    achievement.Prefix ||
                    achievement.Postfix ||
                    achievement.SubAchievementList ||
                    achievement.SeriesAchievementList
                );
            },
            url_filter: function (cj_id) {
                if(this.jump === true || typeof this.jump === "undefined") {
                    this.$store.state.scroll_tops[this.$route.name] = document.documentElement.scrollTop;
                    this.$router.push({name: "view", params: {cj_id: cj_id}});
                }
            },
            target_filter: function () {
                return this.target || typeof this.target !== "undefined" ? this.target : "";
            },
            // 成就图标过滤
            icon_url_filter(icon_id) {
                if (isNaN(parseInt(icon_id))) {
                    return `${JX3BOX.__imgPath}image/common/nullicon.png`;
                } else {
                    return `${JX3BOX.__iconPath}icon/${icon_id}.png`;
                }
            },
            // 描述过滤
            description_filter: function (value) {
                let matchs = /text="(.*?)(\\\\\\n)?"/.exec(value);
                if (matchs && matchs.length > 1) value = matchs[1].trim();
                if (value) value = value.replace(/\\n/g, "<br>");
                return value;
            },
        },
        mounted() {
        },
        components: {
            Item,
        },
    };
</script>

<style lang="less">
    @import '../assets/css/achievement.less';
</style>
