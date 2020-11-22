<template>
    <div class="m-revisions">
        <div style="padding:5px 0;text-align:center">
            <span v-if="versions === null">Loading...</span>
            <span v-if="versions === false">⚠️ 数据加载异常</span>
            <span v-if="versions && !versions.length">💧 暂无数据</span>
        </div>
        <table v-if="versions && versions.length" id="histories">
            <tr>
                <th>版本</th>
                <th>更新时间</th>
                <th>贡献者</th>
                <th>修订说明</th>
            </tr>
            <tr class="history" v-for="(ver, key) in versions" :key="key">
                <td>
                    <router-link
                        :to="{
                            name: 'view',
                            params: {
                                cj_id: ver.achievement_id,
                                post_id: ver.id,
                            },
                        }"
                        v-text="'v' + (versions.length - key)"
                    ></router-link>
                </td>
                <td>{{ ver.updated | date_format }}</td>
                <td>
                    <a :href="ver.user_id | author_url" v-text="ver.user_nickname"></a>
                </td>
                <td v-text="ver.remark"></td>
            </tr>
        </table>
    </div>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
export default {
    name: "Revision",
    props: ["achievement_id"],
    data: function() {
        return {
            versions: null,
        };
    },
    computed: {},
    methods: {
        getVersions() {
            let that = this;
            this.$http({
                method: "GET",
                url: `${JX3BOX.__helperUrl}api/achievement/${this.achievement_id}/versions`,
                headers: { Accept: "application/prs.helper.v2+json" },
                withCredentials: true,
            }).then(
                function(data) {
                    data = data.data;
                    if (data.code === 200) that.versions = data.data.versions;
                },
                function() {
                    that.versions = false;
                }
            );
        },
    },
    mounted: function() {},
    watch: {
        achievement_id: {
            immediate: true,
            handler() {
                //数据加载
                if (this.achievement_id) this.getVersions();
            },
        },
    },
};
</script>

<style lang="less">
    @import '../assets/css/revisions.less';
</style>

