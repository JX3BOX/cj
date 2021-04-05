<template>
  <div class="m-achievement-single" :class="fold ? 'fold' : ''" v-if="JSON.stringify(achievement) !== '{}'">
      <div class="u-header">
        <a class="u-title" :target="targetable" @click="url_filter(achievement.ID)"
           v-text="achievement.Name"></a>
        <div class="u-other">
          <span class="u-attr"
                v-text="achievement.post ? ('修订时间：' + ts2str(achievement.post.updated)) : ''"></span>
          <span class="u-attr"
                v-text="achievement.post?('综合难度：'+$options.filters.star(achievement.post.level)):''"></span>
          <Fav v-if="showFavorite" class="u-attr u-fav" post-type="achievement" :post-id="achievement.ID"/>
        </div>
      </div>
      <div class="u-body">
        <div class="u-left">
          <a class="u-attr u-icon" :target="targetable" @click="url_filter(achievement.ID)">
            <img :src="icon_url(achievement.IconID)"
                 @error.once="() => {$event.target.src = icon_url()}" />
          </a>
          <a class="u-attr u-desc" v-html="achievement.Desc" @click="url_filter(achievement.ID)"></a>
        </div>
        <div class="u-right">
          <item-simple class="u-attr u-item-simple" :item="achievement.Item" only-icon="true" :icon-size="'36px'"/>
          <div class="u-attr u-point" v-text="achievement.Point ? achievement.Point : 0"></div>
        </div>
      </div>
      <div class="u-footer">
        <div v-if="achievement.Prefix || achievement.Postfix" class="u-ch">
          <div v-if="achievement.PrefixName" v-text="'称号前缀：' + achievement.PrefixName"></div>
          <div v-if="achievement.PostfixName" v-text="'称号后缀：' + achievement.PostfixName"></div>
        </div>
        <el-row v-if="achievement.SubAchievementList" class="u-subs" :gutter="30">
          <el-col
              v-for="(sub_achievement, key) in achievement.SubAchievementList"
              :key="key" :xs="12" :sm="8" :md="8" class="u-sub"
          >
            <router-link
                :to="sub_achievement.Visible == 1 ? {name: 'view',params: { source_id: sub_achievement.ID }} : {}"
                target="_blank">
              <img class="u-icon" :src="icon_url(sub_achievement.IconID)"/>
              <span v-text="sub_achievement.Name"></span>
            </router-link>
          </el-col>
        </el-row>
        <div v-if="achievement.SeriesAchievementList" class="u-seriess">
          <div
              v-for="(series_achievement, key) in achievement.SeriesAchievementList"
              class="u-series" :key="key" :class="series_achievement.ID == achievement.ID ? 'active' : ''"
          >
            <router-link :to="{name: 'view', params: { source_id: series_achievement.ID }}">
              <img class="u-icon" :src="icon_url(series_achievement.IconID)"/>
              <div class="detail">
                <h4 v-text="series_achievement.Name"></h4>
                <p v-html="description_filter(series_achievement.ShortDesc)"></p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="u-expand" :class="{'disable': empty}" @click="fold = !fold">
        <hr/>
        <i class="u-icon el-icon-caret-top"></i>
        <i class="u-icon el-icon-caret-bottom"></i>
      </div>
  </div>
</template>

<script>

const {JX3BOX} = require("@jx3box/jx3box-common");
import {ts2str, iconLink} from "@jx3box/jx3box-common/js/utils";
import Fav from "@jx3box/jx3box-common-ui/src/interact/Fav.vue";
import ItemSimple from "@jx3box/jx3box-editor/src/ItemSimple.vue";

export default {
  name: "AchievementSingle",
  props: ["achievement", "fold", "target", "jump", "showFavorite"],
  computed: {
    empty() {
      return !(
          this.achievement.Prefix ||
          this.achievement.Postfix ||
          this.achievement.SubAchievementList ||
          this.achievement.SeriesAchievementList
      );
    },
    targetable() {
      return this.target || typeof this.target !== "undefined" ? this.target : "";
    }
  },
  methods: {
    ts2str,
    icon_url: iconLink,
    url_filter(source_id) {
      if (this.jump === true || typeof this.jump === "undefined") {
        this.$store.state.scroll_tops[this.$route.name] = document.documentElement.scrollTop;
        this.$router.push({name: "view", params: {source_id: source_id}});
      }
    },
    // 描述过滤
    description_filter(value) {
      let matchs = /text="(.*?)(\\\\\\n)?"/.exec(value);
      if (matchs && matchs.length > 1) value = matchs[1].trim();
      if (value) value = value.replace(/\\n/g, "<br>");
      return value;
    },
  },
  components: {
    'item-simple': ItemSimple,
    Fav,
  },
};
</script>

<style lang="less">
@import '../assets/css/components/achievement.less';
</style>
