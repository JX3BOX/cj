<template>
    <li class="m-cj" v-if="JSON.stringify(achievement) !== '{}'">
        <div class="c-cj" :class="fold ? 'fold' : ''">
            <div class="cj-head">
                <h5 class="u-title">
                    <router-link
                        :target="target_filter()"
                        v-text="achievement.Name"
                        @click="location_handle"
                        :to="url_filter(achievement.ID)"
                    >
                    </router-link>
                </h5>
            </div>
            <div
                class="cj-body"
                :class="is_empty(achievement) ? 'cj-empty' : ''"
            >
                <p class="u-desc">
                    <router-link
                        v-html="description_filter(achievement.Desc)"
                        @click="location_handle"
                        :to="url_filter(achievement.ID)"
                        style="color:#555555;"
                    ></router-link>
                </p>
                <div class="left">
                    <router-link
                        class="cj-icon"
                        :target="target_filter()"
                        @click="location_handle"
                        :to="url_filter(achievement.ID)"
                    >
                        <img
                            class="u-icon"
                            :src="icon_url_filter(achievement.IconID)"
                            @error.once="img_error_handle"
                        />
                    </router-link>
                </div>
                <div class="right">
                    <item :item="achievement.Item"></item>
                    <div
                        class="point"
                        v-text="achievement.Point ? achievement.Point : 0"
                    ></div>
                </div>
            </div>
            <div class="cj-footer">
                <div
                    v-if="achievement.Prefix || achievement.Postfix"
                    class="u-ch"
                >
                    <div
                        v-if="achievement.PrefixName"
                        v-text="'称号前缀：' + achievement.PrefixName"
                    ></div>
                    <div
                        v-if="achievement.PostfixName"
                        v-text="'称号后缀：' + achievement.PostfixName"
                    ></div>
                </div>
                <el-row
                    v-if="achievement.SubAchievementList"
                    class="cj-subs"
                    :gutter="30"
                >
                    <el-col
                        v-for="(sub_achievement,
                        key) in achievement.SubAchievementList"
                        :key="key"
                        :xs="12"
                        :sm="8"
                        :md="8"
                        class="cj-sub"
                    >
                        <router-link
                            :to="
                                sub_achievement.Visible == 1
                                    ? {
                                          name: 'view',
                                          params: { cj_id: sub_achievement.ID },
                                      }
                                    : {}
                            "
                            target="_blank"
                            @click="location_handle"
                            :title="
                                description_filter(sub_achievement.ShortDesc)
                            "
                        >
                            <img
                                class="u-icon"
                                :src="icon_url_filter(sub_achievement.IconID)"
                            />
                            <span v-text="sub_achievement.Name"></span>
                        </router-link>
                    </el-col>
                </el-row>
                <div
                    v-if="achievement.SeriesAchievementList"
                    class="cj-seriess"
                >
                    <div
                        v-for="(series_achievement,
                        key) in achievement.SeriesAchievementList"
                        class="cj-series"
                        :key="key"
                        :class="
                            series_achievement.ID == achievement.ID
                                ? 'active'
                                : ''
                        "
                    >
                        <router-link
                            :to="{
                                name: 'view',
                                params: { cj_id: series_achievement.ID },
                            }"
                            @click="location_handle"
                        >
                            <img
                                class="u-icon"
                                :src="
                                    icon_url_filter(series_achievement.IconID)
                                "
                            />
                            <div class="detail">
                                <h4 v-text="series_achievement.Name"></h4>
                                <p
                                    v-html="
                                        description_filter(
                                            series_achievement.ShortDesc
                                        )
                                    "
                                ></p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div
                v-if="!is_empty(achievement)"
                class="u-expand"
                @click="fold = !fold"
            >
                <hr />
                <i class="u-icon el-icon-caret-top"></i>
                <i class="u-icon el-icon-caret-bottom"></i>
            </div>
        </div>
    </li>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
import Item from "@/components/Item.vue";

export default {
    name: "Achievement",
    props: ["achievement", "fold", "target", "jump", "toggle_load_url"],
    data: function() {
        return {
            JX3BOX,
        };
    },
    methods: {
        img_error_handle(e) {
            e.target.src = `${JX3BOX.__ossMirror}image/common/nullicon.png`;
        },
        is_empty(achievement) {
            return !(
                achievement.Prefix ||
                achievement.Postfix ||
                achievement.SubAchievementList ||
                achievement.SeriesAchievementList
            );
        },
        location_handle: function() {
            if (
                this.toggle_load_url ||
                typeof this.toggle_load_url !== "undefined"
            )
                this.toggle_load_url();
        },
        url_filter: function(cj_id) {
            return this.jump === true || typeof this.jump === "undefined"
                ? { name: "view", params: { cj_id: cj_id } }
                : {};
        },
        target_filter: function() {
            return this.target || typeof this.target !== "undefined"
                ? this.target
                : "";
        },
        // 成就图标过滤
        icon_url_filter(icon_id) {
            if (isNaN(parseInt(icon_id))) {
                return `${JX3BOX.__ossMirror}image/common/nullicon.png`;
            } else {
                return `${JX3BOX.__iconPath}icon/${icon_id}.png`;
            }
        },
        // 描述过滤
        description_filter: function(value) {
            let matchs = /text="(.*?)(\\\\\\n)?"/.exec(value);
            if (matchs && matchs.length > 1) value = matchs[1].trim();
            if (value) value = value.replace(/\\n/g, "<br>");
            return value;
        },
    },
    mounted() {},
    components: {
        Item,
    },
};
</script>

<style lang="less">
    @import '../assets/css/achievement.less';
</style>
