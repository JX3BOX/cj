(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2219ed9c"],{1829:function(e,t,n){"use strict";var a=n("5644"),s=n.n(a);s.a},"19cb":function(e,t,n){},"2ee5":function(e,t,n){"use strict";var a=n("90ec"),s=n.n(a);s.a},4127:function(e,t,n){"use strict";var a=n("d233"),s=n("b313"),i={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},r=Date.prototype.toISOString,o={delimiter:"&",encode:!0,encoder:a.encode,encodeValuesOnly:!1,serializeDate:function(e){return r.call(e)},skipNulls:!1,strictNullHandling:!1},c=function e(t,n,s,i,r,c,l,u,p,m,d,_){var v=t;if("function"===typeof l)v=l(n,v);else if(v instanceof Date)v=m(v);else if(null===v){if(i)return c&&!_?c(n,o.encoder):n;v=""}if("string"===typeof v||"number"===typeof v||"boolean"===typeof v||a.isBuffer(v)){if(c){var f=_?n:c(n,o.encoder);return[d(f)+"="+d(c(v,o.encoder))]}return[d(n)+"="+d(String(v))]}var h,y=[];if("undefined"===typeof v)return y;if(Array.isArray(l))h=l;else{var g=Object.keys(v);h=u?g.sort(u):g}for(var C=0;C<h.length;++C){var b=h[C];r&&null===v[b]||(y=Array.isArray(v)?y.concat(e(v[b],s(n,b),s,i,r,c,l,u,p,m,d,_)):y.concat(e(v[b],n+(p?"."+b:"["+b+"]"),s,i,r,c,l,u,p,m,d,_)))}return y};e.exports=function(e,t){var n=e,r=t?a.assign({},t):{};if(null!==r.encoder&&void 0!==r.encoder&&"function"!==typeof r.encoder)throw new TypeError("Encoder has to be a function.");var l="undefined"===typeof r.delimiter?o.delimiter:r.delimiter,u="boolean"===typeof r.strictNullHandling?r.strictNullHandling:o.strictNullHandling,p="boolean"===typeof r.skipNulls?r.skipNulls:o.skipNulls,m="boolean"===typeof r.encode?r.encode:o.encode,d="function"===typeof r.encoder?r.encoder:o.encoder,_="function"===typeof r.sort?r.sort:null,v="undefined"!==typeof r.allowDots&&r.allowDots,f="function"===typeof r.serializeDate?r.serializeDate:o.serializeDate,h="boolean"===typeof r.encodeValuesOnly?r.encodeValuesOnly:o.encodeValuesOnly;if("undefined"===typeof r.format)r.format=s["default"];else if(!Object.prototype.hasOwnProperty.call(s.formatters,r.format))throw new TypeError("Unknown format option provided.");var y,g,C=s.formatters[r.format];"function"===typeof r.filter?(g=r.filter,n=g("",n)):Array.isArray(r.filter)&&(g=r.filter,y=g);var b,w=[];if("object"!==typeof n||null===n)return"";b=r.arrayFormat in i?r.arrayFormat:"indices"in r?r.indices?"indices":"repeat":"indices";var j=i[b];y||(y=Object.keys(n)),_&&y.sort(_);for(var k=0;k<y.length;++k){var x=y[k];p&&null===n[x]||(w=w.concat(c(n[x],x,j,u,p,m?d:null,g,_,v,f,C,h)))}var O=w.join(l),P=!0===r.addQueryPrefix?"?":"";return O.length>0?P+O:""}},4328:function(e,t,n){"use strict";var a=n("4127"),s=n("9e6a"),i=n("b313");e.exports={formats:i,parse:s,stringify:a}},5644:function(e,t,n){},"90ec":function(e,t,n){},"99c6":function(e,t,n){"use strict";var a=n("b42c"),s=n.n(a);s.a},"9e6a":function(e,t,n){"use strict";var a=n("d233"),s=Object.prototype.hasOwnProperty,i={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:a.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},r=function(e,t){for(var n={},a=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,r=t.parameterLimit===1/0?void 0:t.parameterLimit,o=a.split(t.delimiter,r),c=0;c<o.length;++c){var l,u,p=o[c],m=p.indexOf("]="),d=-1===m?p.indexOf("="):m+1;-1===d?(l=t.decoder(p,i.decoder),u=t.strictNullHandling?null:""):(l=t.decoder(p.slice(0,d),i.decoder),u=t.decoder(p.slice(d+1),i.decoder)),s.call(n,l)?n[l]=[].concat(n[l]).concat(u):n[l]=u}return n},o=function(e,t,n){for(var a=t,s=e.length-1;s>=0;--s){var i,r=e[s];if("[]"===r)i=[],i=i.concat(a);else{i=n.plainObjects?Object.create(null):{};var o="["===r.charAt(0)&&"]"===r.charAt(r.length-1)?r.slice(1,-1):r,c=parseInt(o,10);!isNaN(c)&&r!==o&&String(c)===o&&c>=0&&n.parseArrays&&c<=n.arrayLimit?(i=[],i[c]=a):i[o]=a}a=i}return a},c=function(e,t,n){if(e){var a=n.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,i=/(\[[^[\]]*])/,r=/(\[[^[\]]*])/g,c=i.exec(a),l=c?a.slice(0,c.index):a,u=[];if(l){if(!n.plainObjects&&s.call(Object.prototype,l)&&!n.allowPrototypes)return;u.push(l)}var p=0;while(null!==(c=r.exec(a))&&p<n.depth){if(p+=1,!n.plainObjects&&s.call(Object.prototype,c[1].slice(1,-1))&&!n.allowPrototypes)return;u.push(c[1])}return c&&u.push("["+a.slice(c.index)+"]"),o(u,t,n)}};e.exports=function(e,t){var n=t?a.assign({},t):{};if(null!==n.decoder&&void 0!==n.decoder&&"function"!==typeof n.decoder)throw new TypeError("Decoder has to be a function.");if(n.ignoreQueryPrefix=!0===n.ignoreQueryPrefix,n.delimiter="string"===typeof n.delimiter||a.isRegExp(n.delimiter)?n.delimiter:i.delimiter,n.depth="number"===typeof n.depth?n.depth:i.depth,n.arrayLimit="number"===typeof n.arrayLimit?n.arrayLimit:i.arrayLimit,n.parseArrays=!1!==n.parseArrays,n.decoder="function"===typeof n.decoder?n.decoder:i.decoder,n.allowDots="boolean"===typeof n.allowDots?n.allowDots:i.allowDots,n.plainObjects="boolean"===typeof n.plainObjects?n.plainObjects:i.plainObjects,n.allowPrototypes="boolean"===typeof n.allowPrototypes?n.allowPrototypes:i.allowPrototypes,n.parameterLimit="number"===typeof n.parameterLimit?n.parameterLimit:i.parameterLimit,n.strictNullHandling="boolean"===typeof n.strictNullHandling?n.strictNullHandling:i.strictNullHandling,""===e||null===e||"undefined"===typeof e)return n.plainObjects?Object.create(null):{};for(var s="string"===typeof e?r(e,n):e,o=n.plainObjects?Object.create(null):{},l=Object.keys(s),u=0;u<l.length;++u){var p=l[u],m=c(p,s[p],n);o=a.merge(o,m,n)}return a.compact(o)}},b313:function(e,t,n){"use strict";var a=String.prototype.replace,s=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return a.call(e,s,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},b42c:function(e,t,n){},c67a:function(e,t,n){"use strict";var a=n("19cb"),s=n.n(a);s.a},c84b:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"m-cj-index",attrs:{id:"m-cj-view"}},[n("Achievement",{attrs:{achievement:e.achievement}}),e.post&&"{}"===JSON.stringify(e.post)?n("div",{staticClass:"m-cj-post-null"},[n("span",[e._v("暂无攻略，我要")]),n("a",{staticClass:"s-link",attrs:{href:e.publish_url("cj/"+e.achievement.ID)}},[e._v("完善攻略")])]):e._e(),e.post&&"{}"!==JSON.stringify(e.post)?n("div",{staticClass:"m-archive-list"},[n("div",{staticClass:"cj-module m-cj-post"},[n("div",{staticClass:"u-head"},[n("a",{staticClass:"el-button el-button--primary u-publish s-link",attrs:{href:e.publish_url("cj/"+e.achievement.ID)}},[n("i",{staticClass:"el-icon-edit"}),n("span",[e._v("完善成就攻略")])]),n("h4",{staticClass:"u-title"},[n("svg",{class:"u-icon",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"31.531",height:"31.531",viewBox:"0 0 31.531 31.531","svg-inline":"",role:"presentation",focusable:"false",tabindex:"-1"}},[n("path",{attrs:{d:"M11.872 24.961l-2.539.412a2.59 2.59 0 01-1.961-.468 2.606 2.606 0 01-1.043-1.72l-.223-1.482-4.407 4.407a.835.835 0 00.438 1.413l2.801.523.523 2.801a.838.838 0 001.413.438l5.755-5.755-.422-.427a.471.471 0 00-.335-.142z"}}),n("path",{attrs:{d:"M19.91 23.932l2.458.404a1.554 1.554 0 001.794-1.303l.37-2.458c.075-.492.383-.917.829-1.141l2.224-1.111a1.564 1.564 0 00.686-2.111L27.129 14a1.518 1.518 0 010-1.403l1.144-2.211c.19-.37.227-.802.098-1.199a1.57 1.57 0 00-.785-.911l-2.223-1.112a1.53 1.53 0 01-.829-1.14l-.37-2.458a1.556 1.556 0 00-.624-1.026 1.555 1.555 0 00-1.17-.279l-2.457.405a1.52 1.52 0 01-1.335-.434L16.828.459A1.568 1.568 0 0015.766 0a1.566 1.566 0 00-1.061.459l-1.75 1.773a1.52 1.52 0 01-1.335.434l-2.457-.405a1.554 1.554 0 00-1.17.279 1.556 1.556 0 00-.624 1.026l-.37 2.458a1.532 1.532 0 01-.83 1.14L3.947 8.276a1.568 1.568 0 00-.785.912c-.129.396-.093.829.097 1.199l1.144 2.211c.229.439.229.964 0 1.403l-1.143 2.21a1.563 1.563 0 00.687 2.111l2.224 1.111c.446.224.753.649.829 1.141l.37 2.458c.062.412.288.783.624 1.026a1.55 1.55 0 001.17.277l2.458-.404c.489-.082.987.08 1.335.436l1.75 1.771a1.55 1.55 0 001.059.459 1.55 1.55 0 001.059-.459l1.75-1.771a1.517 1.517 0 011.335-.435zm-4.144-1.39c-5.205-.026-9.431-4.266-9.431-9.477 0-5.21 4.226-9.451 9.431-9.478 5.205.026 9.432 4.268 9.432 9.478-.001 5.211-4.227 9.451-9.432 9.477z"}}),n("path",{attrs:{d:"M15.766 4.955c-4.444.028-8.05 3.648-8.05 8.097 0 4.447 3.606 8.068 8.05 8.096 4.444-.027 8.05-3.648 8.05-8.096-.001-4.448-3.606-8.069-8.05-8.097zM29.833 26.11l-4.407-4.407-.223 1.482a2.615 2.615 0 01-3.004 2.188l-2.539-.412a.468.468 0 00-.335.143l-.422.427 5.755 5.755a.838.838 0 001.413-.438l.522-2.801 2.801-.523a.837.837 0 00.439-1.414z"}})]),n("span",[e._v("成就攻略")])])]),n("div",{staticClass:"u-body"},[n("div",{staticClass:"content m-single-primary",domProps:{innerHTML:e._s(e.post.content)}}),n("div",{staticClass:"other"},[e.post.user_avatar?n("div",{staticClass:"avatar"},[n("img",{attrs:{src:e.post.user_avatar}})]):e._e(),n("div",{staticClass:"done",domProps:{textContent:e._s(e.post.user_nickname)}}),n("div",{staticClass:"updated",domProps:{textContent:e._s("最后编辑于 "+e.$options.filters.date_format(e.post.updated))}}),n("a",{staticClass:"comment",attrs:{href:"/cj/"+e.post.id+"#comments"},domProps:{textContent:e._s("前往评论")}}),n("div",{staticClass:"remark"},[e._v("可通过评论通知原贡献者进行更改与署名补充")])])])]),e.$_.get(e.$refs,"relations.relations.length")?n("div",{staticClass:"cj-module m-cj-relations"},[n("div",{staticClass:"u-head"},[n("span",{staticClass:"u-boss",class:{on:!e.show_relations_primary},on:{click:function(t){e.show_relations_primary=!e.show_relations_primary}}},[e._v("BOSS属性参考")]),e._m(0)]),n("div",{staticClass:"u-body"},[n("Relations",{ref:"relations",attrs:{achievement_id:e.achievement.ID,show_primary:e.show_relations_primary}})],1)]):e._e(),n("div",{staticClass:"cj-module m-cj-revisions"},[e._m(1),n("div",{staticClass:"u-body"},[n("Revisions",{attrs:{achievement_id:e.achievement.ID}})],1)]),n("div",{staticClass:"cj-module m-cj-comments"},[e._m(2),n("div",{staticClass:"u-body"},[n("Comments",{attrs:{achievement_id:e.achievement.ID}})],1)])]):e._e()],1)},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h4",{staticClass:"u-title"},[e._v("🔗 相关成就"),n("em",[e._v(" 同BOSS其它成就")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"u-head"},[n("h4",{staticClass:"u-title"},[e._v("📄 历史版本")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"u-head"},[n("h4",{staticClass:"u-title"},[e._v("💖 评论")])])}],i=(n("99af"),n("4c53"),n("7807")),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"m-block m-relations m-boss"},[n("div",{staticClass:"m-section"},[null===e.relations?n("span",[e._v("Loading...")]):e._e(),!1===e.relations?n("span",[e._v("⚠️ 数据加载异常")]):e._e(),e.relations&&!e.relations.length?n("span",[e._v("💧 无相关数据")]):e._e(),e.relations&&e.relations.length?n("ul",{staticClass:"m-relations-list"},e._l(e.relations,(function(t,a){return n("li",{key:a},[n("router-link",{staticClass:"u-title",attrs:{to:{name:"view",params:{cj_id:t.ID}}}},[n("img",{staticClass:"u-icon",attrs:{src:e.resolveIconPath(t.IconID)},on:{"~error":function(t){return e.iconErrorHandler(t)}}}),n("span",{staticClass:"u-text",domProps:{textContent:e._s(t.Name)}})])],1)})),0):e._e()]),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.show_primary,expression:"!show_primary"}],staticClass:"m-section m-bossinfos"},[n("ul",{staticClass:"m-bossinfo"},[n("li",{staticClass:"u-id"},[e._v("ID:"+e._s(e.npc.ID))]),n("li",{staticClass:"u-name"},[e._v(e._s(e.npc.Name))]),n("li",{staticClass:"u-desc"},[e._v("称谓"),n("em",[e._v("Title")]),e._v(e._s(e.npc.Title))]),n("li",{staticClass:"u-desc"},[e._v("等级"),n("em",[e._v("Level:")]),e._v(e._s(e.npc.Level))]),n("li",{staticClass:"u-desc"},[e._v("强度"),n("em",[e._v("Intensity")]),e._v(e._s(e.npc.Intensity))]),n("li",{staticClass:"u-desc"},[e._v("地图"),n("em",[e._v("MapName")]),e._v(e._s(e.npc.MapName))]),n("li",{staticClass:"u-desc"},[e._v("备注"),n("em",[e._v("_Notation")]),e._v(e._s(e.npc._Notation))]),n("li",{staticClass:"u-desc"},[e._v("血量"),n("em",[e._v("MaxLife")]),e._v(e._s(e.npc.MaxLife))]),n("li",{staticClass:"u-desc"},[e._v("蓝量"),n("em",[e._v("MaxMana")]),e._v(e._s(e.npc.MaxMana))]),n("li",{staticClass:"u-desc"},[e._v("跑速"),n("em",[e._v("RunSpeed")]),e._v(e._s(e.npc.RunSpeed))]),n("li",{staticClass:"u-desc"},[e._v("移速"),n("em",[e._v("WalkSpeed")]),e._v(e._s(e.npc.WalkSpeed))]),n("li",{staticClass:"u-desc",attrs:{title:"攻击补偿距离/64"}},[e._v(" 体积"),n("em",[e._v("TouchRange")]),e._v(e._s(e.npc.TouchRange)+" ")])]),n("ul",{staticClass:"m-bossinfo"},[n("li",{staticClass:"u-desc"},[e._v("识破"),n("em",[e._v("Sense")]),e._v(e._s(e.npc.Sense))]),n("li",{staticClass:"u-desc"},[e._v("闪避"),n("em",[e._v("Dodge")]),e._v(e._s(e.npc.Dodge))]),n("li",{staticClass:"u-desc"},[e._v(" 外功防御"),n("em",[e._v("PhysicsShieldBase")]),e._v(e._s(e.npc.PhysicsShieldBase)+" ")]),n("li",{staticClass:"u-desc"},[e._v(" 混元防御"),n("em",[e._v("NeutralMagicDefence")]),e._v(e._s(e.npc.NeutralMagicDefence)+" ")]),n("li",{staticClass:"u-desc"},[e._v(" 阳性防御"),n("em",[e._v("SolarMagicDefence")]),e._v(e._s(e.npc.SolarMagicDefence)+" ")]),n("li",{staticClass:"u-desc"},[e._v(" 阴性防御"),n("em",[e._v("LunarMagicDefence")]),e._v(e._s(e.npc.LunarMagicDefence)+" ")]),n("li",{staticClass:"u-desc"},[e._v(" 毒性防御"),n("em",[e._v("PoisonMagicDefence")]),e._v(e._s(e.npc.PoisonMagicDefence)+" ")])]),n("ul",{staticClass:"m-bossinfo"},[n("li",{staticClass:"u-desc"},[e._v(" 外功会心"),n("em",[e._v("PhysicsCriticalStrike")]),e._v(e._s(e.npc.PhysicsCriticalStrike)+" ")]),n("li",{staticClass:"u-desc"},[e._v(" 混元会心"),n("em",[e._v("NeutralCriticalStrike")]),e._v(e._s(e.npc.NeutralCriticalStrike)+" ")]),n("li",{staticClass:"u-desc"},[e._v(" 阳性会心"),n("em",[e._v("SolarCriticalStrike")]),e._v(e._s(e.npc.SolarCriticalStrike)+" ")]),n("li",{staticClass:"u-desc"},[e._v(" 阴性会心"),n("em",[e._v("LunarCriticalStrike")]),e._v(e._s(e.npc.LunarCriticalStrike)+" ")]),n("li",{staticClass:"u-desc"},[e._v(" 毒性会心"),n("em",[e._v("PoisonCriticalStrike")]),e._v(e._s(e.npc.PoisonCriticalStrike)+" ")])]),n("ul",{staticClass:"m-bossinfo"},[n("li",{staticClass:"u-desc"},[e._v(" 外功命中"),n("em",[e._v("PhysicsAttackHit")]),e._v(e._s(e.npc.PhysicsAttackHit)+" ")]),n("li",{staticClass:"u-desc"},[e._v(" 混元命中"),n("em",[e._v("NeutralMagicHit")]),e._v(e._s(e.npc.NeutralMagicHit)+" ")]),n("li",{staticClass:"u-desc"},[e._v(" 阳性命中"),n("em",[e._v("SolarMagicHit")]),e._v(e._s(e.npc.SolarMagicHit)+" ")]),n("li",{staticClass:"u-desc"},[e._v(" 阴性命中"),n("em",[e._v("LunarMagicHit")]),e._v(e._s(e.npc.LunarMagicHit)+" ")]),n("li",{staticClass:"u-desc"},[e._v(" 毒性命中"),n("em",[e._v("PoisonMagicHit")]),e._v(e._s(e.npc.PoisonMagicHit)+" ")])]),n("ul",{staticClass:"m-bossinfo"},[n("li",{staticClass:"u-desc"},[e._v(" 血条是否可见"),n("em",[e._v("CanSeeLifeBar")]),e._v(e._s(e.npc.CanSeeLifeBar)+" ")]),n("li",{staticClass:"u-desc"},[e._v(" 是否可被选择"),n("em",[e._v("IsSelectable")]),e._v(e._s(e.npc.IsSelectable)+" ")]),n("li",{staticClass:"u-desc"},[e._v(" 复活时间"),n("em",[e._v("ReviveTime")]),e._v(e._s(e.npc.ReviveTime)+" ")])])])])},o=[],c=n("ee8f"),l=c.JX3BOX,u={name:"Relation",props:["achievement_id","show_primary"],data:function(){return{relations:{},npcid:0,dungeon_id:null,npc:{}}},computed:{},methods:{getRelationList:function(){var e=this;this.$http({method:"GET",url:"".concat(l.__helperUrl,"api/achievement/").concat(this.achievement_id,"/relations"),headers:{Accept:"application/prs.helper.v2+json"},withCredentials:!0}).then((function(t){if(t=t.data,200===t.code&&t.data.relations.length){var n=t.data;e.npcid=n.boss_id,e.dungeon_id=n.dungeon_id,e.relations=n.relations,e.getBossInfo(e.npcid)}}))},resolveIconPath:function(e){return e?l.__iconPath+"icon/"+e+".png":l.__imgPath+"image/common/nullicon.png"},iconErrorHandler:function(e){e.target.src=l.__imgPath+"image/common/nullicon.png"},getBossInfo:function(e){var t=this;e&&this.$http.get("".concat(l.__node,"npc/id/").concat(e)).then((function(e){t.npc=e.data.length&&e.data[0]||{}}))}},mounted:function(){"undefined"===typeof this.show_primary&&(this.show_primary=!0)},watch:{achievement_id:{immediate:!0,handler:function(){this.achievement_id&&this.getRelationList()}}}},p=u,m=(n("2ee5"),n("2877")),d=Object(m["a"])(p,r,o,!1,null,null,null),_=d.exports,v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"m-revisions"},[n("div",{staticStyle:{padding:"5px 0","text-align":"center"}},[null===e.versions?n("span",[e._v("Loading...")]):e._e(),!1===e.versions?n("span",[e._v("⚠️ 数据加载异常")]):e._e(),e.versions&&!e.versions.length?n("span",[e._v("💧 暂无数据")]):e._e()]),e.versions&&e.versions.length?n("table",{attrs:{id:"histories"}},[e._m(0),e._l(e.versions,(function(t,a){return n("tr",{key:a,staticClass:"history"},[n("td",[n("a",{attrs:{target:"_blank",href:"javascript:void(0)"},domProps:{textContent:e._s("v"+(e.versions.length-a))}})]),n("td",[e._v(e._s(e._f("date_format")(t.updated)))]),n("td",{domProps:{textContent:e._s(t.user_nickname)}}),n("td",{domProps:{textContent:e._s(t.remark)}})])}))],2):e._e()])},f=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("tr",[n("th",[e._v("版本")]),n("th",[e._v("更新时间")]),n("th",[e._v("贡献者")]),n("th",[e._v("修订说明")])])}],h=n("ee8f"),y=h.JX3BOX,g={name:"Revision",props:["achievement_id"],data:function(){return{versions:null}},computed:{},methods:{getVersions:function(){var e=this;this.$http({method:"GET",url:"".concat(y.__helperUrl,"api/achievement/").concat(this.achievement_id,"/versions"),headers:{Accept:"application/prs.helper.v2+json"},withCredentials:!0}).then((function(t){t=t.data,200===t.code&&(e.versions=t.data.versions)}),(function(){e.versions=!1}))}},mounted:function(){},watch:{achievement_id:{immediate:!0,handler:function(){this.achievement_id&&this.getVersions()}}}},C=g,b=(n("c67a"),Object(m["a"])(C,v,f,!1,null,null,null)),w=b.exports,j=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"m-comments"},[n("div",{staticStyle:{padding:"5px 0","text-align":"center"}},[null===e.comments?n("span",[e._v("Loading...")]):e._e(),!1===e.comments?n("span",[e._v("⚠️ 数据加载异常")]):e._e(),e.comments&&!e.comments.length?n("span",[e._v("💧 暂无评论")]):e._e()]),n("Comment",{attrs:{comments:e.comments,achievement_id:e.achievement_id}}),n("div",{staticClass:"m-reply-form"},[n("h4",{staticClass:"u-title"},[e._v("📰 回复")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.reply_form.content,expression:"reply_form.content"}],staticClass:"u-reply-content",staticStyle:{resize:"vertical"},domProps:{value:e.reply_form.content},on:{input:function(t){t.target.composing||e.$set(e.reply_form,"content",t.target.value)}}}),n("div",{staticClass:"u-author"},[n("span",[e._v("作者 : ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.reply_form.user_nickname,expression:"reply_form.user_nickname"}],attrs:{type:"text"},domProps:{value:e.reply_form.user_nickname},on:{input:function(t){t.target.composing||e.$set(e.reply_form,"user_nickname",t.target.value)}}})]),n("button",{staticClass:"u-submit",on:{click:function(t){return e.create_comment(e.reply_form)}}},[e._v("✔️ 提交")])])],1)},k=[],x=(n("b0c0"),n("d3b7"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",{staticClass:"comments"},e._l(e.comments,(function(t,a){return n("li",{key:a,staticClass:"c-comment"},[n("div",{staticClass:"comment"},[n("div",{staticClass:"m-nickname"},[n("span",{staticClass:"u-nickname",domProps:{textContent:e._s(t.user_nickname)}}),t.parent_id?[n("span",[e._v(" 回复 ")]),n("span",{staticClass:"u-nickname",domProps:{textContent:e._s(t.parent.user_nickname)}})]:e._e()],2),n("p",{staticClass:"u-content",domProps:{innerHTML:e._s(t.content)}}),n("div",{staticClass:"m-reply"},[n("button",{staticClass:"u-reply",class:{show:t.reply_form.show},domProps:{textContent:e._s(t.reply_form.show?"收起 ↩":"💬 回复")},on:{click:function(e){t.reply_form.show=!t.reply_form.show}}}),n("span",{staticClass:"u-time"},[e._v(e._s(e._f("date_format")(t.updated)))])]),t.reply_form.show?n("div",{staticClass:"m-reply-form"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.reply_form.content,expression:"comment.reply_form.content"}],staticClass:"u-reply-content",staticStyle:{resize:"vertical"},domProps:{value:t.reply_form.content},on:{input:function(n){n.target.composing||e.$set(t.reply_form,"content",n.target.value)}}}),n("div",{staticClass:"u-author"},[n("span",[e._v("作者 : ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.reply_form.user_nickname,expression:"comment.reply_form.user_nickname"}],attrs:{type:"text"},domProps:{value:t.reply_form.user_nickname},on:{input:function(n){n.target.composing||e.$set(t.reply_form,"user_nickname",n.target.value)}}})]),n("button",{staticClass:"u-submit",on:{click:function(n){return e.create_comment(t.reply_form,t.id)}}},[e._v("✔️ 提交")])]):e._e()]),t.children.length?n("Comment",{attrs:{comments:t.children,achievement_id:e.achievement_id}}):e._e()],1)})),0)}),O=[],P={name:"Comment",props:["comments","achievement_id"],methods:{create_comment:function(e,t){this.$parent.create_comment(e,t)}}},S=P,A=Object(m["a"])(S,x,O,!1,null,null,null),D=A.exports,L=n("ee8f"),N=L.JX3BOX,$=L.User,M=n("4328"),I={name:"Comments",props:["achievement_id"],data:function(){return{comments:null,reply_form:{content:"",user_nickname:$.getInfo().name}}},computed:{},methods:{get_comments:function(){var e=this;this.$http({method:"GET",url:"".concat(N.__helperUrl,"api/achievement/").concat(this.achievement_id,"/comments"),headers:{Accept:"application/prs.helper.v2+json"},withCredentials:!0}).then((function(t){if(t=t.data,200===t.code){for(var n=t.data.comments,a=0;a<n.length;a++)n[a]["reply_form"]={show:!1,content:"",user_nickname:$.getInfo().name};e.comments=R(n,0)}}),(function(){e.comments=!1}))},create_comment:function(e,t){"undefined"===typeof t&&(t=0),e.content?this.$http({method:"POST",url:"".concat(N.__helperUrl,"api/achievement/").concat(this.achievement_id,"/comment"),headers:{Accept:"application/prs.helper.v2+json"},crossDomain:!0,data:M.stringify({comment:{achievement_id:this.achievement_id,parent_id:t,user_nickname:e.user_nickname||$.getInfo().name,content:e.content}}),withCredentials:!0}).then((function(t){t=t.data,200===t.code?(e.content="",alert("✔️ 提交成功,请等待审核")):alert("⚠️ ".concat(t.message))})).catch((function(e){alert("⚠️ 网络异常,提交失败")})).finally((function(){e.show=!1})):alert("请先填写评论内容再尝试提交")}},mounted:function(){},components:{Comment:D},watch:{achievement_id:{immediate:!0,handler:function(){this.achievement_id&&this.get_comments()}}}};function R(e,t){var n=[];for(var a in e){var s=e[a];if(s&&s.parent_id===t){e[a]=null;var i=R(e,s.id);s.children=i||[],n.push(s)}}return n}var H=I,E=(n("99c6"),Object(m["a"])(H,j,k,!1,null,null,null)),B=E.exports,T=n("ee8f"),z=T.JX3BOX,U={name:"Detail",props:[],data:function(){return{achievement:{},post:null,show_relations_primary:!0}},components:{Achievement:i["a"],Relations:_,Revisions:w,Comments:B},methods:{publish_url:function(e){return z.__Links.dashboard.publish+"#/"+e},get_achievement:function(){var e=this;this.$route.params.cj_id&&this.$http({url:"".concat(z.__helperUrl,"api/achievement/").concat(this.$route.params.cj_id),headers:{Accept:"application/prs.helper.v2+json"},withCredentials:!0}).then((function(t){t=t.data,200===t.code&&(e.achievement=t.data.achievement,e.$store.state.sidebar.general=parseInt(e.achievement.General),e.$store.state.sidebar.sub=e.achievement.Sub,e.$store.state.sidebar.detail=e.achievement.Detail)})).catch((function(t){e.achievement=!1}))},get_achievement_post:function(){var e=this;this.$route.params.cj_id&&this.$http({url:"".concat(z.__helperUrl,"api/achievement/").concat(this.$route.params.cj_id,"/post"),headers:{Accept:"application/prs.helper.v2+json"},withCredentials:!0}).then((function(t){e.post=t.data.data.post||{}})).catch((function(t){e.post=null}))}},mounted:function(){},watch:{"$route.params.cj_id":{immediate:!0,handler:function(){this.get_achievement(),this.get_achievement_post()}}}},F=U,J=(n("1829"),Object(m["a"])(F,a,s,!1,null,null,null));t["default"]=J.exports},d233:function(e,t,n){"use strict";var a=Object.prototype.hasOwnProperty,s=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),i=function(e){var t;while(e.length){var n=e.pop();if(t=n.obj[n.prop],Array.isArray(t)){for(var a=[],s=0;s<t.length;++s)"undefined"!==typeof t[s]&&a.push(t[s]);n.obj[n.prop]=a}}return t},r=function(e,t){for(var n=t&&t.plainObjects?Object.create(null):{},a=0;a<e.length;++a)"undefined"!==typeof e[a]&&(n[a]=e[a]);return n},o=function e(t,n,s){if(!n)return t;if("object"!==typeof n){if(Array.isArray(t))t.push(n);else{if("object"!==typeof t)return[t,n];(s.plainObjects||s.allowPrototypes||!a.call(Object.prototype,n))&&(t[n]=!0)}return t}if("object"!==typeof t)return[t].concat(n);var i=t;return Array.isArray(t)&&!Array.isArray(n)&&(i=r(t,s)),Array.isArray(t)&&Array.isArray(n)?(n.forEach((function(n,i){a.call(t,i)?t[i]&&"object"===typeof t[i]?t[i]=e(t[i],n,s):t.push(n):t[i]=n})),t):Object.keys(n).reduce((function(t,i){var r=n[i];return a.call(t,i)?t[i]=e(t[i],r,s):t[i]=r,t}),i)},c=function(e,t){return Object.keys(t).reduce((function(e,n){return e[n]=t[n],e}),e)},l=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},u=function(e){if(0===e.length)return e;for(var t="string"===typeof e?e:String(e),n="",a=0;a<t.length;++a){var i=t.charCodeAt(a);45===i||46===i||95===i||126===i||i>=48&&i<=57||i>=65&&i<=90||i>=97&&i<=122?n+=t.charAt(a):i<128?n+=s[i]:i<2048?n+=s[192|i>>6]+s[128|63&i]:i<55296||i>=57344?n+=s[224|i>>12]+s[128|i>>6&63]+s[128|63&i]:(a+=1,i=65536+((1023&i)<<10|1023&t.charCodeAt(a)),n+=s[240|i>>18]+s[128|i>>12&63]+s[128|i>>6&63]+s[128|63&i])}return n},p=function(e){for(var t=[{obj:{o:e},prop:"o"}],n=[],a=0;a<t.length;++a)for(var s=t[a],r=s.obj[s.prop],o=Object.keys(r),c=0;c<o.length;++c){var l=o[c],u=r[l];"object"===typeof u&&null!==u&&-1===n.indexOf(u)&&(t.push({obj:r,prop:l}),n.push(u))}return i(t)},m=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},d=function(e){return null!==e&&"undefined"!==typeof e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))};e.exports={arrayToObject:r,assign:c,compact:p,decode:l,encode:u,isBuffer:d,isRegExp:m,merge:o}}}]);
//# sourceMappingURL=chunk-2219ed9c.ccaa900f.js.map