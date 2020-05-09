<template>
    <div class="m-revisions">
        <span v-if="versions === null">Loading...</span>
        <span v-if="versions === false">⚠️ 数据加载异常</span>
        <span v-if="versions && !versions.length">💧 暂无数据</span>
        <table v-if="versions && versions.length" id="histories">
            <tr>
                <th>版本</th>
                <th>更新时间</th>
                <th>贡献者</th>
                <th>修订说明</th>
            </tr>
            <tr class="history" v-for="(ver, key) in versions" :key="key">
                <td>
                    <a
                            target="_blank"
                            href="javascript:void(0)"
                            v-text="'v' + (versions.length - key)"
                    ></a>
                </td>
                <td>{{ ver.updated | date_format }}</td>
                <td v-text="ver.user_nickname"></td>
                <td v-text="ver.remark"></td>
            </tr>
        </table>
    </div>
</template>

<script>
    const {JX3BOX} = require("@jx3box/jx3box-common");
    export default {
        name: "Revision",
        props: ["achievement_id"],
        data: function () {
            return {
                versions: null
            };
        },
        computed: {},
        methods: {
            getVersions() {
                let that = this;
                this.$http({
                    method: "GET",
                    url: `${JX3BOX.__helperUrl}api/achievement/${this.achievement_id}/versions`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                    withCredentials: true
                }).then(function (data) {
                    data = data.data;
                    if (data.code === 200) that.versions = data.data.versions;
                }, function () {
                    that.versions = false;
                });
            }
        },
        mounted: function () {

        },
        watch: {
            achievement_id: {
                immediate: true,
                handler() {
                    //数据加载
                    if (this.achievement_id) this.getVersions();
                }
            }
        }
    };
</script>

<style lang="less">
    #histories {
        width: 100%;
        margin: -5px 0;
        opacity: 0.8;
        font-size: 14px;
        text-align: left;
        border-collapse: collapse;
        border-spacing: 0;

        th,
        td {
            padding: 8px 10px;
            font-weight: normal;
        }

        a {
            color: #3b6460;

            &:hover {
                box-shadow: 0 1px 0 #3b6460;
            }
        }

        th {
            border-bottom: 2px solid #dddddd;
        }

        td {
            border-bottom: 1px solid #dddddd;
        }

        tr:last-child td {
            border-bottom: none;
        }
    }
</style>
