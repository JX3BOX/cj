(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-137d0bdd"],{"07ac":function(t,e,s){var a=s("23e7"),i=s("6f53").values;a({target:"Object",stat:!0},{values:function(t){return i(t)}})},"498a":function(t,e,s){"use strict";var a=s("23e7"),i=s("58a8").trim,n=s("c8d2");a({target:"String",proto:!0,forced:n("trim")},{trim:function(){return i(this)}})},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,s){var a=s("1d80"),i=s("5899"),n="["+i+"]",r=RegExp("^"+n+n+"*"),o=RegExp(n+n+"*$"),c=function(t){return function(e){var s=String(a(e));return 1&t&&(s=s.replace(r,"")),2&t&&(s=s.replace(o,"")),s}};t.exports={start:c(1),end:c(2),trim:c(3)}},"685b":function(t,e,s){"use strict";s.d(e,"b",(function(){return r})),s.d(e,"a",(function(){return o}));var a=s("4328"),i=s.n(a),n=s("41cb");let r={newest(t,e,s=1){if(e)return Object(n["b"])()({method:"GET",url:"/api/wiki/post",params:{type:t,source_id:e,supply:s}})},newests(t){return Object(n["b"])()({method:"GET",url:"/api/wiki/posts/newest",params:{type:t}})},versions(t,e){if(e)return Object(n["b"])()({method:"GET",url:"/api/wiki/post/versions",params:{type:t,source_id:e}})},view(t){return t?Object(n["b"])()({method:"GET",url:"/api/wiki/post/"+t}):null},save(t){return Object(n["b"])()({method:"POST",url:"/api/wiki/post",data:i.a.stringify({post:t})})},myList(t){return Object(n["b"])()({method:"GET",url:"/api/my/wiki/posts",params:t})},myRemove(t){return t?Object(n["b"])()({method:"PUT",url:`/api/my/wiki/post/${t}/remove`}):null}},o={list(t,e){if(e)return Object(n["b"])()({method:"GET",url:"/api/wiki/comments",params:{type:t,source_id:e}})},save(t){return Object(n["b"])()({method:"POST",url:"/api/wiki/comment",data:i.a.stringify({comment:t})})},myList(t){return Object(n["b"])()({method:"GET",url:"/api/my/wiki/comments",params:t})},myRemove(t){return t?Object(n["b"])()({method:"PUT",url:`/api/my/wiki/comment/${t}/remove`}):null}}},"6f53":function(t,e,s){var a=s("83ab"),i=s("df75"),n=s("fc6a"),r=s("d1e7").f,o=function(t){return function(e){var s,o=n(e),c=i(o),l=c.length,u=0,m=[];while(l>u)s=c[u++],a&&!r.call(o,s)||m.push(t?[s,o[s]]:o[s]);return m}};t.exports={entries:o(!0),values:o(!1)}},bb51:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"m-home-view"},[s("WikiPanel",{attrs:{"border-none":!0}},[s("template",{slot:"head-title"},[s("i",{staticClass:"el-icon-location-information"}),s("span",[t._v(" 便捷入口")])]),s("template",{slot:"head-actions"},[s("a",{staticClass:"other",attrs:{target:"_blank",href:t.feedback}},[t._v("反馈建议 »")])]),s("template",{slot:"body"},[s("ul",{staticClass:"u-qlinks"},[s("li",{staticClass:"u-qlink"},[s("a",{staticStyle:{"background-color":"#FE7979"},attrs:{target:"_blank",href:"https://www.jx3box.com/tool/9126/"}},[s("i",{staticClass:"el-icon-trophy"}),s("span",[t._v(" 游戏内看百科")])])]),s("li",{staticClass:"u-qlink"},[s("router-link",{attrs:{to:{name:"waiting"}}},[s("i",{staticClass:"el-icon-edit-outline"}),s("span",[t._v(" 待攻略成就")])])],1),s("li",{staticClass:"u-qlink"},[s("a",{attrs:{target:"_blank",href:"https://www.jx3box.com/tool/8104/"}},[s("i",{staticClass:"el-icon-medal"}),s("span",[t._v(" 隐藏成就")])])]),s("li",{staticClass:"u-qlink"},[s("router-link",{attrs:{to:{name:"out_print"}}},[s("i",{staticClass:"el-icon-coin"}),s("span",[t._v(" 绝版成就")])])],1),s("li",{staticClass:"u-qlink"},[s("router-link",{attrs:{to:{name:"adventure"}}},[s("i",{staticClass:"el-icon-ice-drink"}),s("span",[t._v(" 奇遇成就")])])],1),s("li",{staticClass:"u-qlink"},[s("router-link",{attrs:{to:{name:"rare"}}},[s("i",{staticClass:"el-icon-milk-tea"}),s("span",[t._v(" 珍奇成就")])])],1),s("li",{staticClass:"u-qlink"},[s("a",{attrs:{target:"_blank",href:"https://www.jx3box.com/knowledge/#/pet"}},[s("i",{staticClass:"el-icon-lollipop"}),s("span",[t._v(" 宠物密鉴")])])])])])],2),s("WikiPanel",{attrs:{"border-none":!0}},[s("template",{slot:"head-title"},[s("i",{staticClass:"el-icon-notebook-1"}),s("span",[t._v(" 热门成就")])]),s("template",{slot:"body"},[s("div",{staticClass:"m-achievement-slider"},[s("el-carousel",{attrs:{height:"66px",direction:"vertical","indicator-position":"none"}},t._l(t.hot_achievements,(function(e,a){return s("el-carousel-item",{key:a,staticClass:"m-carousel m-hot"},[s("el-row",{attrs:{gutter:20}},[t._l(e,(function(e,a){return[e?s("el-col",{key:a,attrs:{md:8}},[s("router-link",{staticClass:"u-item",class:"u-item-"+a,attrs:{to:{name:"view",params:{source_id:e.ID}}}},[s("div",{staticClass:"u-icon"},[s("img",{attrs:{src:t.icon_url(e.IconID)},on:{"~error":function(e){return function(){e.target.src=t.icon_url()}()}}})]),s("div",{staticClass:"m-carousel-content"},[s("span",{staticClass:"u-title"},[s("i",{staticClass:"el-icon-medal"}),s("span",{domProps:{textContent:t._s(" "+e.Name)}})]),s("span",{staticClass:"u-desc"},[s("i",{staticClass:"el-icon-mic"}),s("span",{domProps:{innerHTML:t._s(" "+e.Desc)}})]),t.views[e.ID]?s("span",{staticClass:"u-rank"},[s("i",{staticClass:"el-icon-watermelon"}),s("span",{domProps:{textContent:t._s("昨日 - "+t.views[e.ID]["yesterday"])}}),s("i",{staticClass:"el-icon-grape"}),s("span",{domProps:{textContent:t._s("七天 - "+t.views[e.ID]["7days"])}}),s("i",{staticClass:"el-icon-pear"}),s("span",{domProps:{textContent:t._s("三十天 - "+t.views[e.ID]["30days"])}})]):t._e()])])],1):t._e()]}))],2)],1)})),1)],1)])],2),s("WikiPanel",{attrs:{"border-none":!0}},[s("template",{slot:"head-title"},[s("i",{staticClass:"el-icon-notebook-2"}),s("span",[t._v(" 最新成就")])]),s("template",{slot:"head-actions"},[s("router-link",{staticClass:"other",attrs:{to:{name:"newest"}}},[t._v("查看更多 »")])],1),s("template",{slot:"body"},[s("el-carousel",{attrs:{height:"66px",direction:"vertical",interval:3500,"indicator-position":"none"}},t._l(t.newest_achievements,(function(e,a){return s("el-carousel-item",{key:a,staticClass:"m-carousel"},[s("el-row",{attrs:{gutter:20}},t._l(e,(function(e,a){return s("el-col",{key:a,attrs:{md:8}},[s("router-link",{staticClass:"u-item u-item-new",class:"u-item-"+a,attrs:{to:{name:"view",params:{source_id:e.ID}}}},[s("div",{staticClass:"u-icon"},[s("img",{attrs:{src:t.icon_url(e.IconID)}})]),s("div",{staticClass:"m-carousel-content"},[s("span",{staticClass:"u-title"},[s("i",{staticClass:"el-icon-medal"}),s("span",{domProps:{textContent:t._s(" "+e.Name)}})]),s("span",{staticClass:"u-desc"},[s("i",{staticClass:"el-icon-mic"}),s("span",{domProps:{innerHTML:t._s(" "+e.Desc)}})])])])],1)})),1)],1)})),1)],1)],2),s("WikiPanel",{attrs:{"border-none":!0}},[s("template",{slot:"head-title"},[s("i",{staticClass:"el-icon-collection"}),s("span",[t._v(" 最近攻略")])]),s("template",{slot:"body"},[s("el-row",{staticClass:"m-posts"},t._l(t.newest_posts,(function(e,a){return s("el-col",{key:a,staticClass:"m-post"},[s("div",{staticClass:"m-head"},[s("div",{staticClass:"m-user"},[s("div",{staticClass:"u-author"},[s("img",{staticClass:"u-icon",attrs:{src:t._f("showAvatar")(e.user_avatar),alt:e.user_nickname}}),s("a",{staticClass:"u-name",attrs:{href:e.user_id?t.author_url(e.user_id):null},domProps:{textContent:t._s(e.user_nickname)}})]),s("div",{staticClass:"u-updated",domProps:{textContent:t._s(t.ts2str(e.updated))}})]),s("div",{staticClass:"m-achievement"},[s("div",{staticClass:"u-achievement"},[s("img",{staticClass:"u-icon",attrs:{src:t.icon_url(e.source_icon_id)},on:{"~error":function(e){e.target.src=t.icon_url("")}}}),s("router-link",{staticClass:"u-name",attrs:{to:{name:"view",params:{source_id:e.source_id}}},domProps:{textContent:t._s(e.title)}})],1),s("div",{staticClass:"u-level",domProps:{textContent:t._s("综合难度："+t.$options.filters.star(e.level))}}),e.remark?s("div",{staticClass:"u-remark",domProps:{textContent:t._s("📑 "+e.remark)}}):t._e()])]),s("div",{staticClass:"m-body"},[s("div",{staticClass:"u-excerpt",attrs:{to:{name:"view",params:{source_id:e.source_id}}},domProps:{innerHTML:t._s(t.ellipsis(e.excerpt))}})])])})),1)],1)],2)],1)},i=[],n=(s("498a"),s("fb6a"),s("159b"),s("2ca0"),s("b0c0"),s("1276"),s("ac1f"),s("07ac"),s("9616")),r=s("685b"),o=s("85e4"),c=s("1c9a"),l=s("262e"),u=s("ee8f"),m=u.JX3BOX,d={name:"Home",data:function(){return{views:{},hot_achievements:null,newest_achievements:null,newest_posts:null,feedback:m.feedback}},components:{WikiPanel:c["a"]},methods:{icon_url:o["iconLink"],author_url:o["authorLink"],ts2str:o["ts2str"],ellipsis:function(t){return t=t?t.trim():"",t.length>100?t.slice(0,100)+"...":t},chuck:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,s=[],a=0;a<t.length;a+=e)s.push(t.slice(a,a+e));return s}},filters:{showAvatar:function(t){return Object(o["getThumbnail"])(t,20,!0)}},created:function(){var t=this;Object(n["b"])("cj","views",12).then((function(e){e=e.data;var s=[];e.forEach((function(e){if(e.name.startsWith("cj")){var a=e.name.split("-").pop();s.push(a),t.views[a]=e.value}})),Object(l["a"])({ids:s,limit:s.length}).then((function(e){e=e.data,200===e.code&&(t.hot_achievements=t.chuck(Object.values(e.data.achievements)))}))})),Object(l["a"])({limit:12}).then((function(e){e=e.data,200===e.code&&(t.newest_achievements=t.chuck(Object.values(e.data.achievements)))}),(function(){t.newest_achievements=!1})),r["b"].newests("achievement").then((function(e){e=e.data,200===e.code&&(t.newest_posts=e.data.newest)}),(function(){t.newest_posts=!1}))}},p=d,v=(s("de16"),s("2877")),h=Object(v["a"])(p,a,i,!1,null,null,null);e["default"]=h.exports},c8d2:function(t,e,s){var a=s("d039"),i=s("5899"),n="​᠎";t.exports=function(t){return a((function(){return!!i[t]()||n[t]()!=n||i[t].name!==t}))}},de16:function(t,e,s){"use strict";s("ea6e")},ea6e:function(t,e,s){}}]);
//# sourceMappingURL=chunk-137d0bdd.072dec33.js.map