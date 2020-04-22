<template>
    <div class="jx3-item" v-if="item&&JSON.stringify(item) !== '{}'">
        <span class="none"
              :data-quality="item.Quality = parseInt(item.Quality)"
              :data-name_color="item.NameColor =
                  item.Quality === 1 ? 'color:rgb(255,255,255)':
                  (item.Quality === 2 ? 'color:rgb(0,209,75)' :
                  (item.Quality === 3 ? 'color:rgb(0,126,254)' :
                  (item.Quality === 4 ? 'color:rgb(254,45,254)' :
                  item.Quality === 5 ? 'color:rgb(249,161,1)' : '')))"
              :data-bind_type="item.BindType = parseInt(item.BindType)"
              :data-bind="item.Bind =
                  item.BindType === 2 ? '装备后绑定' :
                  (item.BindType === 3 ? '拾取后绑定' : '')"
              :data-unique="item.Unique = parseInt(item.MaxExistAmount) === 1"
              :data-require_level="item.RequireLevel = parseInt(item.Require1Type) === 5 ? item.Require1Value : ''"
              :data-level="item.Level = parseInt(item.Level)"></span>
        <img class="item-icon" :src="icon_url_filter(item.IconID)" :alt="item.Name">
        <div class="item-detail">
            <h4 class="title" :style="item.NameColor" v-text="item.Name"></h4>
            <span v-if="item.Bind" class="bind" v-text="item.Bind"></span>
            <span v-if="item.Unique" class="unique" v-text="'唯一'"></span>
            <span v-if="item.RequireLevel" class="unique" v-text="'需要等级'+item.RequireLevel"></span>
            <p v-if="item.Desc" class="desc" v-html="description_filter(item.Desc)"></p>
            <span v-if="item.Level" class="level" v-text="'品质等级'+item.Level"></span>
        </div>
    </div>
</template>

<script>
    const {JX3BOX} = require("@jx3box/jx3box-common");

    export default {
        name: "Item",
        props: ['item'],
        methods: {
            // 图标过滤
            icon_url_filter(icon_id) {
                if (isNaN(parseInt(icon_id))) {
                    return `${JX3BOX.__ossMirror}image/common/nullicon.png`;
                } else {
                    return `${JX3BOX.__ossMirror}icon/${icon_id}.png`;
                }
            },
            // 描述过滤
            description_filter: function (value) {
                let matchs = /text="(.*?)(\\\\\\n)?"/.exec(value);
                if (matchs && matchs.length > 1) value = matchs[1].trim();
                if (value) value = value.replace(/\\n/g, "<br>");
                return value;
            },
        },
    };
</script>

<style lang="less">
    .jx3-item {
        .item-icon {
            width: 36px;
            border-radius: 5px
        }

        .item-detail {
            display: none;
            position: absolute;
            top: 100%;
            left: 50%;
            width: 280px;
            margin-top: 5px;
            padding: 10px;
            background-color: rgba(0, 0, 0, .7);
            font-size: 14px;
            color: #FFFFFF;
            text-shadow: none;
            transform: translate(-50%, 0);

            & > * {
                display: block;
                .mt(0);
                .mb(4px);
                line-height: 1.2em;
            }

            &:before {
                content: '';
                position: absolute;
                top: -2px;
                left: -2px;
                width: calc(~"100% + 4px");
                height: calc(~"100% + 4px");
                border: 1px solid rgba(0, 0, 0, .7);
                box-sizing: border-box;
            }

            .level {
                color: rgb(249, 161, 1)
            }
        }

        &:hover .item-detail {
            display: block;
        }
    }
</style>
