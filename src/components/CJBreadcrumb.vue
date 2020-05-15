<template>
    <div class="m-breadcrumb">
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
const { JX3BOX } = require("@jx3box/jx3box-common");

export default {
    name: "CJBreadcrumb",
    props: [],
    data: function() {
        return {
            count: {},
        };
    },
    computed: {},
    methods: {
        // 输出成就总数统计
        get_total_count() {
            let that = this;
            this.$http({
                method: "GET",
                url: `${JX3BOX.__helperUrl}api/achievements/count`,
                headers: {Accept: "application/prs.helper.v2+json"},
                withCredentials: true
            }).then(
                function(data) {
                    data = data.data;
                    if (data.code === 200) {
                        that.count = data.data.count;
                    }
                },
                function() {
                    console.error("接口连接异常");
                }
            );
        },
    },
    mounted: function() {
        // 输出成就总数统计
        this.get_total_count();
    },
};
</script>

<style lang="less">
.m-breadcrumb {
    .u-stat {
        white-space: nowrap;
        overflow: auto;

        // .x;
        .fz(14px);

        em {
            .mr(10px);
            // .bold;
            font-style: normal;
        }

        b {
            font-style: italic;
            color: @primary;

            &:after {
                content: "|";
                font-weight: 300;
                color: #999;
                .ml(10px);
                font-family: Georgia, "Times New Roman", Times, serif;
            }
        }

        span {
            .mr(10px);

            &:last-child b {
                &:after {
                    .none;
                }
            }
        }
    }
}
@media screen and (max-width: @ipad) {
    .m-breadcrumb .u-stat {
        .fz(13px);
    }
}
</style>
