"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[870],{4226:function(e,t,n){n.d(t,{Z:function(){return d}});var u=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"ga__app_menu mb-4"},e._l(e.appMenuLinks,(function(n){return t("v-btn",{key:n.title,class:["ga__app_menu__link",{"ga__app_menu__link--selected":e.isLinkSelected(n.routeName)},"ml-2"],attrs:{outlined:"",color:`${e.color} darken-2`},on:{click:function(t){return e.handleAppMenuItemClick(n.routeName)}}},[e._v(" "+e._s(n.title)+" ")])})),1)},r=[],l=n(3971),a=n(144),i=a.ZP.extend({name:"ClientAppMenu",data(){return{appMenuLinks:[{title:"home",routeName:l.u6},{title:"login",routeName:l.k4},{title:"sign up",routeName:l.NZ},{title:"learn",routeName:l.kC}]}},props:{color:{type:String,required:!1,default:"white"}},methods:{async handleAppMenuItemClick(e){this.$route.name!==e&&await this.$router.push({name:e})},isLinkSelected(e){return this.$route.name===e}}}),o=i,s=n(1001),c=n(3453),p=n.n(c),m=n(4562),_=(0,s.Z)(o,u,r,!1,null,"71306154",null),d=_.exports;p()(_,{VBtn:m.Z})},9314:function(e,t,n){n.r(t),n.d(t,{default:function(){return c}});var u=function(){var e=this,t=e._self._c;return t("div",[t("app-menu",{attrs:{color:"yellow"}})],1)},r=[],l=n(4226),a={components:{appMenu:l.Z},name:"GALearnMoreView",data(){return{}},methods:{}},i=a,o=n(1001),s=(0,o.Z)(i,u,r,!1,null,"44ec13ec",null),c=s.exports}}]);
//# sourceMappingURL=870.06ecce8a.js.map