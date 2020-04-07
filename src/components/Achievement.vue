<template>
    <li class="m-cj" v-if="JSON.stringify(achievement) !== '{}'">
        <span class="none"
              :data-empty="achievement.empty = !(achievement.Prefix || achievement.Postfix || achievement.SubAchievementList || achievement.SeriesAchievementList)"></span>
        <div class="cj-container" :class="fold?'fold':''">
            <h5 class="cj-head">
                <a :target="target_filter()" v-text="achievement.Name" @click="location_handle"
                   :href="url_filter('/cj/#page=view&cj_id='+achievement.ID)">
                </a>
            </h5>
            <div class="cj-body" :class="achievement.empty ? 'cj-empty' : ''">
                <p class="cj-desc">
                    <a v-html="cj_description(achievement.Desc)" @click="location_handle"
                       :href="url_filter('/cj/#page=view&cj_id='+achievement.ID)" style="color:#555555;"></a>
                </p>
                <div class="left">
                    <a class="cj-icon" :target="target_filter()" @click="location_handle"
                       :href="url_filter('/cj/#page=view&cj_id='+achievement.ID)">
                        <img :src="cj_icon_url(achievement.IconID)"></a>
                </div>
                <div class="right">
                    <jx3-item :item="achievement.Item"></jx3-item>
                    <div class="point" v-text="achievement.Point?achievement.Point:0"></div>
                </div>
            </div>
            <div class="cj-footer">
                <div v-if="achievement.Prefix || achievement.Postfix" class="cj-ch">
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
                           :title="cj_description(sub_achievement.ShortDesc)">
                            <img class="icon" :alt="sub_achievement.Name"
                                 :src="cj_icon_url(sub_achievement.IconID)">
                            <span v-text="sub_achievement.Name"></span>
                        </a>
                    </el-col>
                </el-row>
                <div v-if="achievement.SeriesAchievementList" class="cj-seriess">
                    <div v-for="(series_achievement,key) in achievement.SeriesAchievementList" class="cj-series"
                         :key="key" :class="series_achievement.ID==achievement.ID?'active':''">
                        <a :href="'/cj/#page=view&cj_id='+series_achievement.ID" @click="location_handle">
                            <img class="icon" :alt="series_achievement.Name"
                                 :src="cj_icon_url(series_achievement.IconID)">
                            <div class="detail">
                                <h4 v-text="series_achievement.Name"></h4>
                                <p v-html="cj_description(series_achievement.ShortDesc)"></p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div v-if="!achievement.empty" class="cj-expand">
                <hr>
                <i class="u-icon u-icon-fold"></i>
                <i class="u-icon u-icon-unfold"></i>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "Achievement",
        props: ['achievement', 'fold', 'target', 'jump', 'toggle_load_url'],
        methods: {
            location_handle: function () {
                if (this.toggle_load_url || typeof (this.toggle_load_url) !== 'undefined') this.toggle_load_url();
            },
            url_filter: function (url) {
                return this.jump === true || typeof this.jump === 'undefined' ? url : 'javascript::void(0)'
            },
            target_filter: function () {
                return this.target || typeof this.target !== 'undefined' ? this.target : '';
            },
            // 成就图标过滤
            cj_icon_url(icon_id) {
                if (isNaN(parseInt(icon_id))) {
                    return 'https://oss.jx3box.com/image/common/nullicon.png';
                } else {
                    return 'https://oss.jx3box.com/icon/' + icon_id + '.png';
                }
            },
            // 描述过滤
            cj_description: function (value) {
                var matchs = /text="(.*?)(\\\\\\n)?"/.exec(value);
                if (matchs && matchs.length > 1) value = matchs[1].trim();
                if (value) value = value.replace(/\\n/g, "<br>");
                return value;
            },
        }
    };
</script>

<style lang="less">
    .m-cjs {
        display: block;
        margin-right: @aside-right;
        padding: 10px 15px 0;
        list-style: none;

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

        .cj-container {
            font-weight: normal;

            & > a {
                .db;
            }

            .cj-head {
                margin-top: 5px;
                text-align: center;
                //color: rgb(22, 166, 130);
                .bold;

                a {
                    transition: color .1s ease;
                }
            }

            .cj-add-post {
                position: absolute;
                top: 0;
                right: 0;
                font-size: 14px;
                text-shadow: 0 0 1px #CCCCCC;
            }

            .cj-add-post * {
                display: inline-block;
                vertical-align: middle;
                color: #666666;
                fill: #666666;
                transition: all 0.3s linear;
            }

            .cj-add-post:hover * {
                color: #6368D7;
                fill: #6368D7;
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

                .cj-desc {
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
            }

            &.fold .cj-footer {
                display: none;
            }

            .cj-footer .cj-ch,
            .cj-footer .cj-subs {
                margin-bottom: 10px;
                font-size: 14px;
            }

            .cj-footer .cj-ch {
                font-weight: bold;
            }

            .cj-footer .cj-subs {
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

                        .icon {
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

            .cj-footer .cj-seriess {
                display: inline-block;
                width: 100%;
                margin-top: 10px;
                padding: 15px 10px;
                border: 1px solid darken(#F1F8FF, 10%);
                background-color: #F1F8FF;
            }

            .cj-footer .cj-seriess .cj-series {
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

            .cj-footer .cj-seriess .cj-series .icon {
                width: 36px;
                border-radius: 5px;
                //transition: opacity 0.2s linear;
            }

            /*  .cj-footer .cj-seriess .cj-series:hover .icon {
                opacity: 0.85;
            } */

            .cj-footer .cj-seriess .cj-series .detail {
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

            .cj-footer .cj-seriess .cj-series .detail:before {
                content: "";
                position: absolute;
                top: -2px;
                left: -2px;
                width: calc(~"100% + 4px");
                height: calc(~"100% + 4px");
                border: 1px solid rgba(0, 0, 0, 0.7);
            }

            .cj-footer .cj-seriess .cj-series .detail * {
                display: block;
                margin-bottom: 4px;
                line-height: 1.2em;
            }

            .cj-footer .cj-seriess .cj-series .detail p {
                color: #DDDDDD;
            }

            .cj-footer .cj-seriess .cj-series:hover .detail {
                display: block;
            }

            .cj-expand {
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

                    border-top: 1px solid #EEEEEE;
                    transform: translateY(-50%);
                    z-index: 9;
                    .h(1px);
                }

                &:hover {
                    hr {
                        //border-color:@border-active;
                    }

                    background-color: #E9FFEE;
                }

                .u-icon {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 30px;
                    height: 16px;
                    background-color: @bg-light;
                    background-position: center center;
                    transform: translate(-50%, -50%);
                    z-index: 10;
                    transition: background-color .3s linear;
                }

                &:hover .u-icon {
                    background-color: #E9FFEE;
                }

                .u-icon.u-icon-fold {
                    display: block;
                }

                .u-icon.u-icon-unfold {
                    display: none;
                }
            }

            &.fold .cj-expand {
                .u-icon.u-icon-fold {
                    display: none;
                }

                .u-icon.u-icon-unfold {
                    display: block;
                }
            }
        }
    }

    @media screen and (max-width: @ipad) {
        .cj-container .cj-footer .cj-subs .cj-sub {
            .w(100%);
        }

        .cj-container .cj-body .c .jx3-item {
            .none;
            //.ps;
            //transform:translateY(0);
        }
    }
</style>
