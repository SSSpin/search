webpackJsonp([38],{"7PiC":function(t,a,e){var i=e("SR48");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("rjj0")("07143651",i,!0)},SR48:function(t,a,e){a=t.exports=e("FZ+f")(!1),a.push([t.i,".wrapper[data-v-0d7e440a]{width:800px;margin:30px auto}.edit-icon[data-v-0d7e440a]{width:16px;margin-left:15px;cursor:pointer}",""])},TgNL:function(t,a,e){"use strict";e("0xDb");a.a={name:"word",data:function(){return{data:this.$route.params}},created:function(){},methods:{handelClickEdit:function(){this.$router.push({path:"/wordEdit/index",query:this.$data.data})}}}},Y44U:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"app-container"},[e("div",{staticClass:"wrapper"},[e("h1",{on:{click:t.handelClickEdit}},[t._v(t._s(t.data.en)),e("icon-svg",{staticClass:"edit-icon",attrs:{"icon-class":"form"}})],1),t._v(" "),e("br"),t._v(" "),e("code",[e("h3",[t._v("释义：")]),t._v(" "),e("p",[t._v(t._s(t.data.zh))]),t._v(" "),e("br"),t._v(" "),e("h3",[t._v("例句：")]),t._v(" "),e("p"),e("h5",[t._v("中：")]),t._v(t._s(t.data.ex_zh)),e("p"),t._v(" "),e("p"),e("h5",[t._v("英：")]),t._v(t._s(t.data.ex_en)),e("p")])])])},n=[],r={render:i,staticRenderFns:n};a.a=r},"yq+Z":function(t,a,e){"use strict";function i(t){e("7PiC")}Object.defineProperty(a,"__esModule",{value:!0});var n=e("TgNL"),r=e("Y44U"),s=e("VU/8"),c=i,d=s(n.a,r.a,c,"data-v-0d7e440a",null);a.default=d.exports}});