<template>
  <div class="m-detail-view">
    <AchievementSingle v-if="wiki_post && wiki_post.source" :achievement="wiki_post.source" show-favorite="true"/>

    <div class="m-wiki-post-panel" v-if="wiki_post && wiki_post.post">
      <WikiPanel :wiki-post="wiki_post">
        <template slot="head-title">
          <img class="u-icon" svg-inline src="../assets/img/achievement.svg"/>
          <span class="u-txt">成就攻略</span>
        </template>
        <template slot="head-actions">
          <a class="el-button el-button--primary" :href="publish_url(`achievement/${id}`)">
            <i class="el-icon-edit"></i>
            <span>完善成就攻略</span>
          </a>
        </template>
        <template slot="body">
          <Article :content="wiki_post.post.content"/>
        </template>
      </WikiPanel>

      <Relations :source-id="id" />

      <!-- 历史版本 -->
      <WikiRevisions type="achievement" :source-id="id" />

      <!-- 百科评论 -->
      <WikiComments type="achievement" :source-id="id" />
    </div>
    <div class="m-wiki-post-empty" v-else>
      <i class="el-icon-s-opportunity"></i>
      <span> 暂无攻略，我要</span>
      <a class="s-link" :href="publish_url(`achievement/${id}`)">完善攻略</a>
    </div>

    <ins
        class="adsbygoogle"
        style="display:block;max-width:100%;overflow:hidden;margin:10px;"
        data-ad-client="ca-pub-4388499329141185"
        data-ad-slot="1787190081"
        data-ad-format="auto"
        data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script>
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import WikiPanel from "@jx3box/jx3box-common-ui/src/WikiPanel";
import WikiRevisions from "@jx3box/jx3box-common-ui/src/WikiRevisions";
import WikiComments from "@jx3box/jx3box-common-ui/src/WikiComments";
import AchievementSingle from "@/components/AchievementSingle.vue";
import Relations from "@/components/Relations.vue";
import {postStat} from "@jx3box/jx3box-common/js/stat";
import {WikiPost} from "@jx3box/jx3box-common/js/helper";
import {publishLink} from "@jx3box/jx3box-common/js/utils";

export default {
  name: "Detail",
  data() {
    return {
      wiki_post: null,
    };
  },
  computed: {
    id() {
      return this.$route.params.source_id;
    },
  },
  methods: {
    publish_url: publishLink,
  },
  created() {
    if (this.id) postStat('cj', this.id);
  },
  components: {
    AchievementSingle,
    WikiPanel,
    WikiRevisions,
    WikiComments,
    Relations,
    Article,
  },
  watch: {
    "id": {
      immediate: true,
      handler() {
        // 获取最新攻略
        if (this.id) {
          WikiPost.newest('achievement', this.id).then(
              (res) => {
                res = res.data;
                if (res.code === 200) this.wiki_post = res.data;
              },
              () => {
                this.wiki_post = null;
              }
          );
        }
      },
    },
    "$route.params.post_id": {
      immediate: true,
      handler() {
        if (this.$route.params.post_id) {
          // 获取指定攻略
          WikiPost.view(this.$route.params.post_id).then(
              (res) => {
                res = res.data;
                if (res.code === 200) this.wiki_post = res.data;
              },
              () => {
                this.wiki_post = null;
              }
          );
        }
      },
    },
  },
};
</script>

<style lang="less">
@import "../assets/css/views/detail.less";
</style>
