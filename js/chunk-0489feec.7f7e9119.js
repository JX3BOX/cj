(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0489feec"],{bb51:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"m-cj-index m-cj-home"},[s("h5",[t._v("首页计划模块：")]),t._m(0),t._m(1),s("div",{staticClass:"cj-module"},[t._m(2),s("div",{staticClass:"u-body"},[s("ul",{staticClass:"cj-qlinks"},[t._m(3),s("li",{staticClass:"qlink"},[s("router-link",{attrs:{to:{name:"waiting"}}},[t._v("待攻略成就")])],1),t._m(4),s("li",{staticClass:"qlink"},[s("router-link",{attrs:{to:{name:"out_print"}}},[t._v("绝版成就")])],1)])])]),s("div",{staticClass:"cj-module"},[s("div",{staticClass:"u-head"},[s("router-link",{staticClass:"other",attrs:{to:{name:"newest"}}},[t._v("查看更多")]),s("h4",[t._v("最新成就")])],1),s("div",{staticClass:"u-body"},[s("el-row",{staticClass:"cj-newest-list"},t._l(t.newest_achievements,(function(e,a){return s("el-col",{key:a,staticClass:"newest",attrs:{xs:12,md:8}},[s("router-link",{attrs:{to:{name:"view",params:{cj_id:e.ID}}}},[s("img",{attrs:{src:t.icon_url_filter(e.IconID)},on:{"~error":function(e){return t.img_error_handle(e)}}}),s("span",{domProps:{textContent:t._s(e.Name)}})])],1)})),1)],1)]),s("div",{staticClass:"cj-module"},[t._m(5),s("div",{staticClass:"u-body"},[s("el-row",{staticClass:"cj-post-list"},t._l(t.newest_posts,(function(e,a){return s("el-col",{key:a,staticClass:"cj-post",attrs:{md:12,"data-cj-id":e.cj_id}},[s("div",{staticClass:"left"},[e.cj_icon_id?s("img",{staticClass:"post-icon",attrs:{src:t.icon_url_filter(e.cj_icon_id)},on:{"~error":function(e){return t.img_error_handle(e)}}}):t._e(),s("router-link",{staticClass:"post-title",attrs:{to:{name:"view",params:{cj_id:e.cj_id}}},domProps:{textContent:t._s(e.title)}})],1),s("div",{staticClass:"right"},[s("span",{staticClass:"post-author",attrs:{target:"_blank"}},[s("span",{domProps:{textContent:t._s(e.user_nickname)}}),s("img",{attrs:{src:e.user_avatar,alt:e.user_nickname}})])])])})),1)],1)])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ol",[s("li",[t._v("最新成就")]),s("li",[t._v("7天热门统计数据")]),s("li",[t._v("奇遇成就")]),s("li",[t._v("副本成就?")]),s("li",[t._v("阅读成就?")]),s("li",[t._v("最近攻略")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"cj-module pd",staticStyle:{"margin-top":"5px","background-color":"#F9F9F9",border:"1px solid #DDDDDD"}},[s("p",{staticStyle:{"text-indent":"2em",color:"#666666"}},[t._v(" 欢迎各路成就巨佬或者有爱小伙伴前来完善攻略，建议大家更换一下自己喜爱的头像，本站成就百科刚上线不久，如果遇到什么问题或有什么意见可以及时向我们反馈，JX3BOX成就扣扣群： "),s("a",{staticStyle:{"text-decoration":"underline"},attrs:{href:"https://jq.qq.com/?_wv=1027&k=5S50j08"}},[t._v("614370825")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"u-head"},[s("a",{staticClass:"other",attrs:{href:"https://www.jx3box.com/feedback/"}},[t._v("反馈建议")]),s("h4",[t._v("便捷入口")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{staticClass:"qlink"},[s("a",{staticStyle:{"background-color":"#FE7979"},attrs:{target:"_blank",href:"https://www.jx3box.com/tool/9126/"}},[t._v("游戏内看百科")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{staticClass:"qlink"},[s("a",{attrs:{target:"_blank",href:"https://www.jx3box.com/tool/8104/"}},[t._v("隐藏成就")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"u-head"},[s("h4",[t._v("最近攻略")])])}],i=(s("99af"),s("ee8f")),r=i.JX3BOX,c={name:"Home",props:[],data:function(){return{newest_achievements:null,newest_posts:null,JX3BOX:r}},computed:{},methods:{img_error_handle:function(t){t.target.src="".concat(r.__ossMirror,"image/common/nullicon.png")},icon_url_filter:function(t){return isNaN(parseInt(t))?"".concat(r.__ossMirror,"image/common/nullicon.png"):"".concat(r.__ossMirror,"icon/").concat(t,".png")},get_achievements:function(t){var e=this;this.$http({method:"GET",url:"".concat(r.__helperUrl,"api/achievements/newest"),headers:{Accept:"application/prs.helper.v2+json"},params:{page:t},withCredentials:!0}).then((function(t){t=t.data,200===t.code&&(e.newest_achievements=t.data.achievements)}),(function(){e.newest_achievements=!1}))},get_achievement_posts:function(){var t=this;t.$http({method:"GET",url:"".concat(r.__helperUrl,"api/achievement/posts/newest"),headers:{Accept:"application/prs.helper.v2+json"},withCredentials:!0}).then((function(e){e=e.data,200===e.code&&(t.newest_posts=e.data.newest)}),(function(){t.newest_posts=!1}))}},mounted:function(){this.get_achievements(),this.get_achievement_posts()},components:{}},o=c,l=(s("de16"),s("2877")),_=Object(l["a"])(o,a,n,!1,null,null,null);e["default"]=_.exports},de16:function(t,e,s){"use strict";var a=s("ea6e"),n=s.n(a);n.a},ea6e:function(t,e,s){}}]);
//# sourceMappingURL=chunk-0489feec.7f7e9119.js.map