<template>
    <li class="m-cj" v-if="JSON.stringify(achievement) !== '{}'">
        <div class="c-cj" :class="fold?'fold':''">
            <div class="cj-head">
                <h5 class="u-title">
                    <router-link :target="target_filter()" v-text="achievement.Name" @click="location_handle"
                                 :to="url_filter(achievement.ID)">
                    </router-link>
                </h5>
            </div>
            <div class="cj-body" :class="is_empty(achievement) ? 'cj-empty' : ''">
                <p class="u-desc">
                    <a v-html="description_filter(achievement.Desc)" @click="location_handle"
                       :href="url_filter(achievement.ID)" style="color:#555555;"></a>
                </p>
                <div class="left">
                    <a class="cj-icon" :target="target_filter()" @click="location_handle"
                       :href="url_filter(achievement.ID)">
                        <img class="u-icon" :src="icon_url_filter(achievement.IconID)"
                             @error.once="img_error_handle(this)"></a>
                </div>
                <div class="right">
                    <item :item="achievement.Item"></item>
                    <div class="point" v-text="achievement.Point?achievement.Point:0"></div>
                </div>
            </div>
            <div class="cj-footer">
                <div v-if="achievement.Prefix || achievement.Postfix" class="u-ch">
                    <div v-if="achievement.PrefixName"
                         v-text="'称号前缀：'+achievement.PrefixName"></div>
                    <div v-if="achievement.PostfixName"
                         v-text="'称号后缀：'+achievement.PostfixName"></div>
                </div>
                <el-row v-if="achievement.SubAchievementList" class="cj-subs" :gutter="30">
                    <el-col v-for="(sub_achievement,key) in achievement.SubAchievementList" :key="key"
                            :xs="12" :sm="8" :md="8" class="cj-sub">
                            <span class="none"
                                  :data-sub_url="sub_achievement.sub_url = sub_achievement.Visible==1 ? '/cj/#page=view&cj_id=' + sub_achievement.ID : 'javascript:void(0);'"
                                  :data-short_desc="sub_achievement.ShortDesc = sub_achievement.ShortDesc ? sub_achievement.ShortDesc : ''"></span>
                        <a :href="sub_achievement.sub_url" target="_blank" @click="location_handle"
                           :title="description_filter(sub_achievement.ShortDesc)">
                            <img class="u-icon" :src="icon_url_filter(sub_achievement.IconID)">
                            <span v-text="sub_achievement.Name"></span>
                        </a>
                    </el-col>
                </el-row>
                <div v-if="achievement.SeriesAchievementList" class="cj-seriess">
                    <div v-for="(series_achievement,key) in achievement.SeriesAchievementList" class="cj-series"
                         :key="key" :class="series_achievement.ID==achievement.ID?'active':''">
                        <a :href="'/cj/#page=view&cj_id='+series_achievement.ID" @click="location_handle">
                            <img class="u-icon" :src="icon_url_filter(series_achievement.IconID)">
                            <div class="detail">
                                <h4 v-text="series_achievement.Name"></h4>
                                <p v-html="description_filter(series_achievement.ShortDesc)"></p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div v-if="!is_empty(achievement)" class="u-expand" @click="fold=!fold">
                <hr>
                <i class="u-icon el-icon-caret-top"></i>
                <i class="u-icon el-icon-caret-bottom"></i>
            </div>
        </div>
    </li>
</template>

<script>
    import Item from '@/components/Item.vue';

    export default {
        name: "Achievements",
        props: ['achievement', 'fold', 'target', 'jump', 'toggle_load_url'],
        methods: {
            img_error_handle(obj) {
                // obj.style.display = 'none';
            },
            is_empty(achievement) {
                return !(achievement.Prefix || achievement.Postfix || achievement.SubAchievementList || achievement.SeriesAchievementList);
            },
            location_handle: function () {
                if (this.toggle_load_url || typeof (this.toggle_load_url) !== 'undefined') this.toggle_load_url();
            },
            url_filter: function (cj_id) {
                return this.jump === true || typeof this.jump === 'undefined' ?
                    {name: 'view', params: {cj_id: cj_id}} : null;
            },
            target_filter: function () {
                return this.target || typeof this.target !== 'undefined' ? this.target : '';
            },
            // 成就图标过滤
            icon_url_filter(icon_id) {
                if (isNaN(parseInt(icon_id))) {
                    return 'https://oss.jx3box.com/image/common/nullicon.png';
                } else {
                    return 'https://oss.jx3box.com/icon/' + icon_id + '.png';
                }
            },
            // 描述过滤
            description_filter: function (value) {
                var matchs = /text="(.*?)(\\\\\\n)?"/.exec(value);
                if (matchs && matchs.length > 1) value = matchs[1].trim();
                if (value) value = value.replace(/\\n/g, "<br>");
                return value;
            },
        },
        components: {
            Item,
        }
    };
</script>

<style lang="less">
    .m-cj {
        position: relative;
        //float: left;
        width: 100%;
        padding: 12px;
        background: @bg-light;
        margin: 10px 0;
        border: 1px solid #EEEEEE;
        border-radius: 5px;
        transition: border .3s linear;

        &:hover {
            border-color: @border-active;
            z-index: 100;

            .cj-head a {
                color: #D60036;
                box-shadow: 0 1px 0 #D60036;
            }
        }
    }

    .c-cj {
        font-weight: normal;

        & > a {
            .db;
        }

        .cj-head {
            margin-top: 5px;
            text-align: center;
            //color: rgb(22, 166, 130);

            .u-title {
                .mt(0);
                .mb(0);
                .bold;

                a {
                    transition: color .1s ease;
                }
            }
        }

        .cj-body {
            position: relative;
            margin: 20px 0 0;
            color: #555555;
            text-shadow: 0 0 1px #CCCCCC;
            z-index: 10;

            &.cj-empty {
                margin: 20px 0 40px;
            }

            .u-desc {
                margin-left: 50px;
                margin-right: 60px;
                font-size: 14px;
                .lh(1.6em);
                min-height: 1.6em;
            }

            .left {
                position: absolute;
                top: 50%;
                left: 0;
                transform: translate(0, -50%);

                .cj-icon img {
                    width: 36px;
                    border-radius: 5px;
                }
            }

            .right {
                position: absolute;
                top: 50%;
                right: 0;
                transform: translate(0, -50%);

                & > * {
                    display: inline-block;
                    vertical-align: middle;
                }

                .jx3-item {
                    position: relative;
                    margin-right: 40px;
                }

                .point {
                    width: 24px;
                    height: 24px;
                    line-height: 24px;
                    text-indent: -24px;
                    background: url('@{url}dashboard/point.svg') no-repeat center center;
                    .bold;
                    color: #333333;
                }
            }
        }

        .cj-footer {
            margin-top: 10px;
            text-align: center;

            .u-ch,
            .cj-subs {
                margin-bottom: 10px;
                font-size: 14px;
            }

            .u-ch {
                font-weight: bold;
            }

            .cj-subs {
                margin-top: 20px;
                margin-left: -15px;
                margin-right: -15px;

                &:after {
                    content: "";
                    display: block;
                    clear: both;
                }

                .cj-sub {
                    margin: 5px 0;
                    text-align: left;

                    a {
                        vertical-align: middle;
                        display: inline-block;
                        color: #666666;

                        span {
                            transition: opacity 0.2s ease;
                        }

                        .u-icon {
                            width: 24px;
                            margin-right: 5px;
                            border-radius: 3px;
                        }

                        &:hover span {
                            box-shadow: 0 1px 0 #666666;
                        }
                    }
                }
            }

            .cj-seriess {
                display: inline-block;
                width: 100%;
                margin-top: 10px;
                padding: 15px 10px;
                border: 1px solid darken(#F1F8FF, 10%);
                background-color: #F1F8FF;
            }

            .cj-seriess .cj-series {
                float: left;
                position: relative;
                margin: 0 5px;
                opacity: .6;
                transition: opacity .2s linear;
                z-index: 15;

                &:hover,
                &.active {
                    opacity: 1;
                }
            }

            .cj-seriess .cj-series .u-icon {
                width: 36px;
                border-radius: 5px;
            }

            .cj-seriess .cj-series .detail {
                display: none;
                position: absolute;
                top: 100%;
                left: 50%;
                width: 200px;
                margin-top: 5px;
                padding: 10px;
                font-size: 14px;
                color: #FFFFFF;
                background-color: rgba(0, 0, 0, 0.7);
                transform: translate(-50%, 0);
                z-index: 100;
            }

            .cj-seriess .cj-series .detail:before {
                content: "";
                position: absolute;
                top: -2px;
                left: -2px;
                width: calc(~"100% + 4px");
                height: calc(~"100% + 4px");
                border: 1px solid rgba(0, 0, 0, 0.7);
            }

            .cj-seriess .cj-series .detail * {
                display: block;
                margin-bottom: 4px;
                line-height: 1.2em;
            }

            .cj-seriess .cj-series .detail p {
                color: #DDDDDD;
            }

            .cj-seriess .cj-series:hover .detail {
                display: block;
            }
        }

        &.fold .cj-footer {
            display: none;
        }

        .u-expand {
            position: relative;
            margin-top: 10px;
            padding-top: 30px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color .3s linear;
            z-index: 5;

            hr {
                position: absolute;
                top: 50%;
                left: 15px;
                width: calc(~"100% - 30px");
                margin: 0;

                border-top: 1px solid @color-cl;
                transform: translateY(-50%);
                z-index: 9;
                .h(1px);
            }

            &:hover {
                background-color: #E9FFEE;

                .u-icon {
                    background-color: #E9FFEE;
                }
            }

            .u-icon {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 30px;
                height: 16px;
                text-align: center;
                color: @color-gray;
                background-color: @bg-light;
                background-position: center center;
                transform: translate(-50%, -50%);
                z-index: 10;
                transition: background-color .3s linear;
            }

            .u-icon.el-icon-caret-top {
                display: block;
            }

            .u-icon.el-icon-caret-bottom {
                display: none;
            }
        }

        &.fold .u-expand {
            .u-icon.el-icon-caret-top {
                display: none;
            }

            .u-icon.el-icon-caret-bottom {
                display: block;
            }
        }
    }

    @media screen and (max-width: @ipad) {
        .c-cj .cj-footer .cj-subs .cj-sub {
            .w(100%);
        }

        .c-cj .cj-body .c .jx3-item {
            .none;
            //.ps;
            //transform:translateY(0);
        }
    }
</style>
