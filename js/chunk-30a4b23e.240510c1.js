(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-30a4b23e"],{4515:function(e,t,n){},"4c64":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",{staticClass:"m-cjs"},e._l(e.achievements,(function(t,a){return n("Achievement",{key:a,attrs:{achievement:t,fold:e.fold,target:e.target,jump:e.jump,toggle_load_url:e.toggle_load_url}})})),1)},s=[],c=n("7807"),i={name:"Achievements",props:["achievements","fold","target","jump","toggle_load_url"],components:{Achievement:c["a"]}},r=i,o=(n("62a8"),n("2877")),l=Object(o["a"])(r,a,s,!1,null,null,null);t["a"]=l.exports},"62a8":function(e,t,n){"use strict";var a=n("4515"),s=n.n(a);s.a},e7af:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"m-cj-index"},[e.$_.get(e.achievements,"length")?e._e():n("span",{staticClass:"u-list-empty"},[e._v("👻 暂无记录")]),n("Achievements",{attrs:{achievements:e.achievements,fold:!0}}),n("el-pagination",{attrs:{background:"",total:e.achievements_count,"hide-on-single-page":"",layout:"prev, pager, next","current-page":e.page,"page-size":e.length,"prev-html":"&laquo;","next-html":"&raquo;"},on:{"current-change":e.page_change_handle}})],1)},s=[],c=n("4c64"),i=n("ee8f"),r=i.JX3BOX,o={name:"Newest",data:function(){return{achievements:null,achievements_count:0,page:1,length:15}},computed:{},methods:{get_achievements:function(e){var t=this;this.$http({method:"GET",url:"".concat(r.__helperUrl,"api/achievements/newest"),headers:{Accept:"application/prs.helper.v2+json"},params:{page:e},withCredentials:!0}).then((function(e){e=e.data,200===e.code&&(t.achievements=e.data.achievements,t.achievements_count=e.data.total)}),(function(){t.achievements=!1}))},page_change_handle:function(e){this.$router.push({name:"newest",params:{keyword:this.$route.params.keyword},query:{page:e}})}},mounted:function(){},components:{Achievements:c["a"]},watch:{$route:{immediate:!0,handler:function(){this.page=parseInt(this.$route.query.page),this.get_achievements(this.page)}}}},l=o,u=n("2877"),h=Object(u["a"])(l,a,s,!1,null,null,null);t["default"]=h.exports}}]);
//# sourceMappingURL=chunk-30a4b23e.240510c1.js.map