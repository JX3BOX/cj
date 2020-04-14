<template>
    <aside class="c-sidebar-right c-sidebar">
        <div class="m-join">
            <i class="u-icon"><img svg-inline src="../assets/img/ac.svg"/></i>
            <span class="u-msg"
                ><em>官方反馈交流Q群</em> : <strong>614370825</strong></span
            >
        </div>

        <!-- TODO:贡献榜 -->
        <div class="m-contributor">
            <h2 class="m-title">
                <img
                    class="u-icon"
                    svg-inline
                    src="../assets/img/ranking.svg"
                />
                <span class="u-text">贡献榜</span>
            </h2>
            <ul class="u-list">
                <li>
                    <a class="u-contributor" href=""
                        ><i class="u-avatar"
                            ><img
                                src="https://console.cnyixun.com/2019/09/logo.png?x-oss-process=style/avatar_s"
                                alt="浮烟"/></i
                        ><span class="u-name">浮烟</span></a
                    >
                </li>
                <li>
                    <a class="u-contributor" href=""
                        ><i class="u-avatar"
                            ><img
                                src="https://console.cnyixun.com/2019/09/logo.png?x-oss-process=style/avatar_s"
                                alt="浮烟"/></i
                        ><span class="u-name">浮烟</span></a
                    >
                </li>
                <li>
                    <a class="u-contributor" href=""
                        ><i class="u-avatar"
                            ><img
                                src="https://console.cnyixun.com/2019/09/logo.png?x-oss-process=style/avatar_s"
                                alt="浮烟"/></i
                        ><span class="u-name">浮烟</span></a
                    >
                </li>
                <li>
                    <a class="u-contributor" href=""
                        ><i class="u-avatar"
                            ><img
                                src="https://console.cnyixun.com/2019/09/logo.png?x-oss-process=style/avatar_s"
                                alt="浮烟"/></i
                        ><span class="u-name">浮烟</span></a
                    >
                </li>
                <li>
                    <a class="u-contributor" href=""
                        ><i class="u-avatar"
                            ><img
                                src="https://console.cnyixun.com/2019/09/logo.png?x-oss-process=style/avatar_s"
                                alt="浮烟"/></i
                        ><span class="u-name">浮烟</span></a
                    >
                </li>
                <li>
                    <a class="u-contributor" href=""
                        ><i class="u-avatar"
                            ><img
                                src="https://console.cnyixun.com/2019/09/logo.png?x-oss-process=style/avatar_s"
                                alt="浮烟"/></i
                        ><span class="u-name">浮烟</span></a
                    >
                </li>
            </ul>
        </div>

        <div class="m-qqgroup">
            <h2 class="m-title">
                <img class="u-icon" svg-inline src="../assets/img/group.svg" />
                <span class="u-text">各区服成就群</span>
            </h2>
            <ul class="u-list">
                <li><em>蝶恋花</em> : <b>12345678</b></li>
                <li><em>蝶恋花</em> : <b>12345678</b></li>
                <li><em>蝶恋花</em> : <b>12345678</b></li>
                <li><em>蝶恋花</em> : <b>12345678</b></li>
                <li><em>蝶恋花</em> : <b>12345678</b></li>
            </ul>
        </div>
    </aside>
</template>

<script>
export default {
    name: "Info",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {}
};
</script>

<style lang="less">
.c-sidebar-right {
    .m-title {
        .fz(18px);
        font-weight: 300;
        margin: 0 0 10px 0;
        padding: 0 0 5px 0;
        border-bottom: 1px dotted #eee;
    }
}

.m-join {
    border: 1px solid @color-link;
    margin: 15px 15px 5px 15px;
    padding: 10px;
    .r(6px);

    .u-icon {
        .db;
        .fl;
        .h(21px);
        svg {
            .size(16px, 21px);
        }
        .mr(5px);
    }
    .u-msg {
        .fz(12px, 21px);
    }
}

.m-contributor {
    padding: 15px;
    .u-icon {
        .size(24px);
        .mr(10px);
    }
    .u-list {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            margin-bottom: 10px;
        }
    }
    .u-contributor {
        .db;
        &:hover {
            background-color: @bg-light;
        }
    }
    .u-avatar {
        .db;
        .fl;
        .size(32px);
        .mr(15px);
        img {
            .db;
            .full;
        }
    }
    .u-name {
        .fz(13px);
        .lh(32px);
        color: #555;
        // font-weight:300;
    }
}
.m-qqgroup {
    padding: 15px;
    .u-icon {
        .size(18px);
        .mr(10px);
    }
    .u-list {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            padding:5px 10px 5px 2px;
        }
        .fz(13px);
        em{
            .mr(5px);
        }
        b{
            color:#666;
            font-weight:normal;
        }
    }
}
@media screen and (max-width:@ipad){
    .c-sidebar-right{
        .none;
    }
}
</style>
