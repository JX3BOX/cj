(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-477e932b"],{"2c92":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"m-cj-index"},[e.old?a("el-alert",{attrs:{title:"所有成就都已经有了各自的攻略，以下是一些比较老旧的成就攻略",type:"success"}}):e._e(),e.$_.get(e.achievements,"length")?e._e():a("span",{staticClass:"u-list-empty"},[e._v("👻 暂无记录")]),a("Achievements",{attrs:{achievements:e.achievements,fold:!0}}),a("el-pagination",{attrs:{background:"",total:e.achievements_count,"hide-on-single-page":"",layout:"prev, pager, next","current-page":e.page,"page-size":e.length,"prev-html":"&laquo;","next-html":"&raquo;"},on:{"current-change":e.page_change_handle}})],1)},c=[],i=a("4c64"),s=a("ee8f"),l=s.JX3BOX,o={name:"Waiting",data:function(){return{achievements:null,achievements_count:0,old:!1,page:1,length:15}},computed:{},methods:{get_achievements:function(e){var t=this;this.$http({method:"GET",url:"".concat(l.__helperUrl,"api/achievements/waiting"),headers:{Accept:"application/prs.helper.v2+json"},params:{page:e},withCredentials:!0}).then((function(e){e=e.data,200===e.code&&(t.achievements=e.data.achievements,t.achievements_count=e.data.total,t.old=e.data.old)}),(function(){t.achievements=!1}))},page_change_handle:function(e){this.$router.push({name:"waiting",params:{keyword:this.$route.params.keyword},query:{page:e}})}},mounted:function(){},components:{Achievements:i["a"]},watch:{$route:{immediate:!0,handler:function(){this.page=parseInt(this.$route.query.page),this.get_achievements(this.page)}}}},r=o,u=a("2877"),h=Object(u["a"])(r,n,c,!1,null,null,null);t["default"]=h.exports},4515:function(e,t,a){},"4c64":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",{staticClass:"m-cjs"},e._l(e.achievements,(function(t,n){return a("Achievement",{key:n,attrs:{achievement:t,fold:e.fold,target:e.target,jump:e.jump,toggle_load_url:e.toggle_load_url}})})),1)},c=[],i=a("7807"),s={name:"Achievements",props:["achievements","fold","target","jump","toggle_load_url"],components:{Achievement:i["a"]}},l=s,o=(a("62a8"),a("2877")),r=Object(o["a"])(l,n,c,!1,null,null,null);t["a"]=r.exports},"62a8":function(e,t,a){"use strict";var n=a("4515"),c=a.n(n);c.a}}]);
//# sourceMappingURL=chunk-477e932b.3bbfb204.js.map