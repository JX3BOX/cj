(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0539a89f"],{1148:function(t,e,s){"use strict";var a=s("a691"),n=s("1d80");t.exports="".repeat||function(t){var e=String(n(this)),s="",r=a(t);if(r<0||r==1/0)throw RangeError("Wrong number of repetitions");for(;r>0;(r>>>=1)&&(e+=e))1&r&&(s+=e);return s}},"38cf":function(t,e,s){var a=s("23e7"),n=s("1148");a({target:"String",proto:!0},{repeat:n})},"498a":function(t,e,s){"use strict";var a=s("23e7"),n=s("58a8").trim,r=s("c8d2");a({target:"String",proto:!0,forced:r("trim")},{trim:function(){return n(this)}})},bb51:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"m-cj-index m-cj-home"},[s("div",{staticClass:"cj-module"},[t._m(0),s("div",{staticClass:"u-body"},[s("ul",{staticClass:"cj-qlinks"},[t._m(1),s("li",{staticClass:"qlink"},[s("router-link",{attrs:{to:{name:"waiting"}}},[t._v("待攻略成就")])],1),t._m(2),s("li",{staticClass:"qlink"},[s("router-link",{attrs:{to:{name:"out_print"}}},[t._v("绝版成就")])],1),s("li",{staticClass:"qlink"},[s("router-link",{attrs:{to:{name:"adventure"}}},[t._v("奇遇成就")])],1),s("li",{staticClass:"qlink"},[s("router-link",{attrs:{to:{name:"rare"}}},[t._v("珍奇成就")])],1)])])]),s("div",{staticClass:"cj-module"},[s("div",{staticClass:"u-head"},[s("router-link",{staticClass:"other",attrs:{to:{name:"newest"}}},[t._v("查看更多")]),s("h4",[t._v("最新成就")])],1),s("div",{staticClass:"u-body"},[s("el-row",{staticClass:"cj-newest-list"},t._l(t.newest_achievements,(function(e,a){return s("el-col",{key:a,staticClass:"newest",attrs:{xs:12,md:8}},[s("router-link",{attrs:{to:{name:"view",params:{cj_id:e.ID}}}},[s("img",{attrs:{src:t.icon_url_filter(e.IconID)},on:{"~error":function(e){return t.img_error_handle(e)}}}),s("span",{domProps:{textContent:t._s(e.Name)}})])],1)})),1)],1)]),s("div",{staticClass:"cj-module"},[t._m(3),s("div",{staticClass:"u-body"},[s("el-row",{staticClass:"cj-post-list"},t._l(t.newest_posts,(function(e,a){return s("el-col",{key:a,staticClass:"cj-post"},[s("div",{staticClass:"m-head"},[s("div",{staticClass:"m-user"},[s("div",{staticClass:"u-author"},[s("img",{staticClass:"u-icon",attrs:{src:t._f("resolveAvatarPath")(e.user_avatar),alt:e.user_nickname}}),s("span",{staticClass:"u-name",domProps:{textContent:t._s(e.user_nickname)}})]),s("div",{staticClass:"u-updated",domProps:{textContent:t._s(t.$options.filters.date_format(e.updated))}})]),s("div",{staticClass:"m-achievement"},[s("div",{staticClass:"u-achievement"},[s("img",{staticClass:"u-icon",attrs:{src:t.icon_url_filter(e.cj_icon_id)},on:{"~error":function(e){return t.img_error_handle(e)}}}),s("router-link",{staticClass:"u-name",attrs:{to:{name:"view",params:{cj_id:e.cj_id}}},domProps:{textContent:t._s(e.title)}})],1),s("div",{staticClass:"u-level",domProps:{textContent:t._s("综合难度："+t.render_stars(e.level))}}),e.remark?s("div",{staticClass:"u-remark",domProps:{textContent:t._s("📑 "+e.remark)}}):t._e()])]),s("div",{staticClass:"m-body"},[s("router-link",{staticClass:"u-excerpt",attrs:{to:{name:"view",params:{cj_id:e.cj_id}}},domProps:{textContent:t._s(t.ellipsis(e.excerpt))}})],1)])})),1)],1)])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"u-head"},[s("a",{staticClass:"other",attrs:{target:"_blank",href:"https://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=o8LHzsrN48nbkMHM243AzM4"}},[t._v("反馈建议")]),s("h4",[t._v("便捷入口")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{staticClass:"qlink"},[s("a",{staticStyle:{"background-color":"#FE7979"},attrs:{target:"_blank",href:"https://www.jx3box.com/tool/9126/"}},[t._v("游戏内看百科")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{staticClass:"qlink"},[s("a",{attrs:{target:"_blank",href:"https://www.jx3box.com/tool/8104/"}},[t._v("隐藏成就")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"u-head"},[s("h4",[t._v("最近攻略")])])}],r=(s("99af"),s("fb6a"),s("ac1f"),s("38cf"),s("5319"),s("498a"),s("ee8f")),i=r.JX3BOX,o={name:"Home",props:[],data:function(){return{newest_achievements:null,newest_posts:null,JX3BOX:i}},computed:{},methods:{img_error_handle:function(t){t.target.src="".concat(i.__imgPath,"image/common/nullicon.png")},render_stars:function(t){return"⭐️".repeat(t||1)},icon_url_filter:function(t){return isNaN(parseInt(t))?"".concat(i.__imgPath,"image/common/nullicon.png"):"".concat(i.__iconPath,"icon/").concat(t,".png")},get_achievements:function(t){var e=this;this.$http({method:"GET",url:"".concat(i.__helperUrl,"api/achievements/newest"),headers:{Accept:"application/prs.helper.v2+json"},params:{page:t},withCredentials:!0}).then((function(t){t=t.data,200===t.code&&(e.newest_achievements=t.data.achievements)}),(function(){e.newest_achievements=!1}))},get_achievement_posts:function(){var t=this;t.$http({method:"GET",url:"".concat(i.__helperUrl,"api/achievement/posts/newest"),headers:{Accept:"application/prs.helper.v2+json"},withCredentials:!0}).then((function(e){e=e.data,200===e.code&&(t.newest_posts=e.data.newest)}),(function(){t.newest_posts=!1}))},ellipsis:function(t){return t=t?t.trim():"",t.length>100?t.slice(0,100)+"...":t}},mounted:function(){this.get_achievements(),this.get_achievement_posts()},components:{},filters:{resolveAvatarPath:function(t){return t.replace(i.__ossRoot,i.__ossMirror)}}},c=o,l=(s("de16"),s("2877")),u=Object(l["a"])(c,a,n,!1,null,null,null);e["default"]=u.exports},c8d2:function(t,e,s){var a=s("d039"),n=s("5899"),r="​᠎";t.exports=function(t){return a((function(){return!!n[t]()||r[t]()!=r||n[t].name!==t}))}},de16:function(t,e,s){"use strict";var a=s("ea6e"),n=s.n(a);n.a},ea6e:function(t,e,s){}}]);
//# sourceMappingURL=chunk-0539a89f.53d76ed7.js.map