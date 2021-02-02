<template>
  <div class="m-achievement-count">
    <div class="u-stat">
      <span><em>常规成就数</em><b v-text="count.general"></b></span>
      <span><em>常规资历数</em><b v-text="count.general_point"></b></span>
      <span><em>五甲成就数</em><b v-text="count.armor"></b></span>
      <span><em>五甲资历数</em><b v-text="count.armor_point"></b></span>
      <span><em>收录攻略数</em><b v-text="count.post_count"></b></span>
    </div>
  </div>
</template>
<script>
  import {get_total_count} from '../service/achievement';

  export default {
    name: "AchievementCount",
    data() {
      return {
        count: {},
      };
    },
    mounted() {
      // 获取成就统计信息
      get_total_count().then(
          (data) => {
            data = data.data;
            if (data.code === 200) this.count = data.data.count;
          }
      );
    },
  };
</script>

<style lang="less">
  @import '../assets/css/components/achievement-count.less';
</style>
