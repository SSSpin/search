webpackJsonp([42],{"EX+S":function(t,a,e){"use strict";function n(){return e.i(i.a)({url:"/qiniu/upload/token",method:"get"})}a.a=n;var i=e("Vo7i")},hj0D:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("el-upload",{attrs:{action:"https://upload.qbox.me",data:t.dataObj,drag:"",multiple:!0,"before-upload":t.beforeUpload}},[e("i",{staticClass:"el-icon-upload"}),t._v(" "),e("div",{staticClass:"el-upload__text"},[t._v("将文件拖到此处，或"),e("em",[t._v("点击上传")])])])},i=[],o={render:n,staticRenderFns:i};a.a=o},nOMn:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("xNFX"),i=e("hj0D"),o=e("VU/8"),u=o(n.a,i.a,null,null,null);a.default=u.exports},xNFX:function(t,a,e){"use strict";var n=e("//Fk"),i=e.n(n),o=e("EX+S");a.a={data:function(){return{dataObj:{token:"",key:""},image_uri:[],fileList:[]}},methods:{beforeUpload:function(){var t=this;return new i.a(function(a,n){e.i(o.a)().then(function(e){var n=e.data.qiniu_key,i=e.data.qiniu_token;t._data.dataObj.token=i,t._data.dataObj.key=n,a(!0)}).catch(function(t){console.log(t),n(!1)})})}}}}});