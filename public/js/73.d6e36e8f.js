"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[73],{5667:function(s,e,t){t.d(e,{a:function(){return a}});const i=s=>s.charAt(0).toUpperCase()+s.slice(1),a=s=>{let e="";return s.forEach(((t,a)=>{const o=i(t);a===s.length-1?e+=`${o}`:e+=`${o}_`})),e}},2073:function(s,e,t){t.r(e),t.d(e,{default:function(){return b}});var i=function(){var s=this,e=s._self._c;s._self._setupProxy;return e("div",{staticClass:"ga__signup_icon_view"},[e("v-row",{staticClass:"ga__signup_icon_view__title_row"},[e("v-btn",{attrs:{outlined:"",color:"teal darken-2"},on:{click:s.handleBackBtnClick}},[s._v(" Go Back To Choose IPASS "),e("fa-icon",{staticClass:"ml-2",attrs:{icon:"fa-solid fa-arrow-rotate-left",color:"#00796B",size:"lg"}})],1)],1),e("v-row",{staticClass:"ga__signup_icon_view__title",attrs:{"align-content":"center",justify:"center"}},[e("v-col",{attrs:{cols:12}},[e("div",{staticClass:"text-overline white--text text--darken-1 ga__signup_icon_view__title__text"},[s._v(" Sign up ")])])],1),e("v-row",{staticClass:"ga__signup_icon_view__content"},[e("v-col",{attrs:{cols:12,lg:6}},[e("v-form",{ref:s.signupFormRef,model:{value:s.validSignupForm,callback:function(e){s.validSignupForm=e},expression:"validSignupForm"}},[e("v-row",{staticClass:"ga__signup_icon_view__form_row",attrs:{justify:"center"}},[e("v-col",{staticClass:"ga__signup_icon_view__form_col",attrs:{cols:8}},[e("v-text-field",{staticClass:"ga__signup_icon_view__form_field",attrs:{rules:s.nameRules,counter:20,color:"teal",label:"first and last name",required:"",filled:"",dark:""},model:{value:s.name,callback:function(e){s.name=e},expression:"name"}})],1)],1),e("v-row",{staticClass:"ga__signup_icon_view__form_row",attrs:{justify:"center"}},[e("v-col",{staticClass:"ga__signup_icon_view__form_col",attrs:{cols:8}},[e("v-text-field",{staticClass:"ga__signup_icon_view__form_field",attrs:{rules:s.userNameRules,counter:10,color:"teal",label:"user name",required:"",filled:"",dark:""},model:{value:s.userName,callback:function(e){s.userName=e},expression:"userName"}})],1)],1),e("v-row",{staticClass:"ga__signup_icon_view__form_row",attrs:{justify:"center"}},[e("v-col",{staticClass:"ga__signup_icon_view__form_col",attrs:{cols:8}},[e("v-text-field",{staticClass:"ga__signup_icon_view__form_field",attrs:{rules:s.emailRules,color:"teal",label:"email",required:"",filled:"",dark:""},model:{value:s.email,callback:function(e){s.email=e},expression:"email"}})],1)],1),e("v-row",{staticClass:"ga__signup_icon_view__form_row",attrs:{justify:"center"}},[e("v-col",{staticClass:"ga__signup_icon_view__form_col",attrs:{cols:8}},[e("v-select",{attrs:{items:s.iconCategoriesItems,value:s.iconCategoriesItems[0],label:"icon category",color:"teal","item-color":"teal",hint:"Select the icons category in order to build up your pass","persistent-hint":"",required:"",filled:"",dark:""},on:{change:s.handleIconCategoryChange}})],1)],1),e("v-row",{class:[{hidden:s.logoVisible}]},[e("v-col",{staticClass:"ga__signup_icon_view__icons_title",attrs:{cols:12}},[s.passIsComplete?s._e():e("div",{staticClass:"grey--text text--darken-1"},[s._v(" Choose icons for your "),e("span",{staticClass:"text-overline font-weight-light white--text ga__signup_icon_view__icons_title__pass"},[s._v("IPASS")])]),s.passIsComplete?e("div",{staticClass:"grey--text text--darken-1"},[s._v(" Your "),e("span",{staticClass:"text-overline font-weight-light white--text ga__signup_icon_view__icons_title__pass"},[s._v("IPASS")]),s._v(" is complete! ")]):s._e(),s.passIsComplete?e("div",{staticClass:"grey--text text--darken-1 mt-4"},[e("fa-icon",{staticClass:"fa-beat-fade mr-4",attrs:{icon:"fa-solid fa-shield-halved",color:s.iconPassStrengthInterval.color,size:"3x",pulsate:""}}),e("span",{class:`text-overline font-weight-light ${s.iconPassStrengthInterval.vColor}--text text--${s.iconPassStrengthInterval.vOpacity} ga__signup_icon_view__qualifier`},[s._v(" "+s._s(s.iconPassStrengthInterval.qualifying)+" ")])],1):s._e()])],1),e("v-row",{class:["ga__signup_icon_view__icons_row",{hidden:s.logoVisible}]},s._l(s.iconPasses,(function(t,i){return e("v-col",{key:i,staticClass:"ga__signup_icon_view__icon",attrs:{cols:2}},[e("div",{staticClass:"ga__signup_icon_view__icon__content"},[s.iconPassesToBeHidden[i]?e("div",{staticClass:"pass_item__hidden"}):s._e(),!s.iconPassesToBeHidden[i]&&t?e("fa-icon",{attrs:{icon:`fa-solid fa-${t}`,color:"white",size:"2x"}}):s._e()],1)])})),1),s.passIsComplete?e("v-row",{staticClass:"ga__signup_icon_view__show_pass_row"},[e("v-btn",{staticClass:"mr-3",attrs:{outlined:"",small:"",color:"grey darken-2"},on:{click:s.handleSeePass}},[e("fa-icon",{staticClass:"mr-2",attrs:{icon:"fa-solid fa-eye",color:"grey darken-2"}}),s._v(" Show PASS ")],1)],1):s._e()],1)],1),e("v-col",{staticClass:"ga__signup_icon_view__icons",attrs:{cols:12,lg:6}},[s.passIsComplete?e("v-row",{staticClass:"ga__signup_icon_view__controls",attrs:{justify:"center"}},[s.onLargerViewPort?e("div",{staticClass:"text-overline font-weight-light white--text break"},[s._v(" What next ? ")]):s._e(),e("v-btn",{ref:"signupFormBtn",staticClass:"mr-sm-4 mb-xs-4",attrs:{outlined:"",color:"teal darken-2"},on:{click:s.handleSignupBtnClick}},[s._v(" Sign Up ")]),e("div",{staticClass:"ga__signup_icon_view__controls__separator"},[s._v("/")]),e("v-btn",{staticClass:"ml-sm-4",attrs:{outlined:"",color:"teal darken-2"},on:{click:s.handleClearBtnClick}},[s._v(" Clear PASS ")])],1):e("v-row",{staticClass:"ga__signup_icon_view__icons__row"},s._l(s.iconItems,(function(t,i){return e("v-col",{key:i,attrs:{cols:3,"align-self":"center"}},[e("div",{staticClass:"ga__signup_icon_view__icon_wrapper",on:{click:function(e){return s.handleIconClick(t)}}},[e("fa-icon",{attrs:{icon:`fa-solid fa-${t}`,color:"white",size:s.getSelectableIconsSize}})],1)])})),1)],1)],1),e("div",{class:["ga__signup_icon_view__logo_container",{hidden:!s.logoIsVisible}]},[e("div",{staticClass:"ga__signup_icon_view__logo"})]),e("v-snackbar",{scopedSlots:s._u([{key:"action",fn:function(t){let{attrs:i}=t;return[e("v-btn",s._b({attrs:{color:"red darken-3",text:"",timeout:5e3},on:{click:function(e){s.signupErrorShows=!1}}},"v-btn",i,!1),[s._v(" Close ")])]}}]),model:{value:s.signupErrorShows,callback:function(e){s.signupErrorShows=e},expression:"signupErrorShows"}},[s._v(" "+s._s(s.signupErrorMsg)+" ")]),e("v-overlay",{attrs:{value:s.signupInProgressOverlay,opacity:.95}},[e("v-progress-circular",{attrs:{indeterminate:"",size:"64"}})],1)],1)},a=[],o=t(144),n=t(629),r=t(3971),l=t(546),c=t(5667),_=t(5053),u=o.ZP.extend({name:"GASignupIconView",data(){return{validSignupForm:!1,signupFormRef:"signupFormRef",name:"",userName:"",email:"",nameRules:[s=>!!s||"name is required",s=>s.length<=20||"the name must be less than 20 characters"],userNameRules:[s=>!!s||"username is required",s=>s.length<=10||"username must be less than 10 characters"],emailRules:[s=>!!s||"e-mail is required",s=>/.+@.+/.test(s)||"e-mail must be valid"],iconCategoriesItems:[],logoVisible:!0,iconPassCount:r.dQ,iconPasses:[],iconItems:[],iconPassesToBeHidden:[],iconPassLastCompletedIndex:0,passAfterTransformation:"",iconPassStrengthInterval:null,signupErrorShows:!1,signupErrorMsg:"Invalid username!",signupInProgressOverlay:!1}},async created(){this.setUpDefaultIconsPass(),await this.setUpIconsCategories()},methods:{...(0,n.nv)("icons",["fetchIconsCategories"]),...(0,n.nv)("authentication",["fetchSignup"]),async handleBackBtnClick(){await this.$router.push({name:r.NZ})},async setUpIconsCategories(){this.fetchIconsCategories().then((s=>{s&&(this.iconCategoriesItems=this.iconsCategories.map((s=>s.category)),this.iconItems=this.iconsCategories[0].icons)}))},setUpDefaultIconsPass(){for(let s=0;s<this.iconPassCount;s++)this.iconPasses.push("")},handleIconCategoryChange(s){this.logoVisible&&(this.logoVisible=!1);const e=this.iconsCategories.find((e=>e.category===s)).icons;this.iconItems=e},handleSeePass(){for(const s in this.iconPassesToBeHidden)this.iconPassesToBeHidden[s]=!this.iconPassesToBeHidden[s];this.iconPassesToBeHidden[0]||setTimeout((()=>{for(const s in this.iconPassesToBeHidden)this.iconPassesToBeHidden[s]=!this.iconPassesToBeHidden[s]}),400)},hidePassItem(){setTimeout((()=>{this.iconPassesToBeHidden={...this.iconPassesToBeHidden,[this.iconPassLastCompletedIndex-1]:!0}}),300)},handleIconClick(s){this.logoVisible&&(this.logoVisible=!1),this.iconPassLastCompletedIndex<this.iconPassCount-1?(this.iconPasses={...this.iconPasses,[this.iconPassLastCompletedIndex]:s},this.iconPassLastCompletedIndex++):(this.iconPasses={...this.iconPasses,[this.iconPassLastCompletedIndex]:s},this.iconPassLastCompletedIndex++,this.passAfterTransformation=(0,c.a)(Object.assign([],this.iconPasses)),this.iconPassStrengthInterval=(0,_.sf)(this.passAfterTransformation)),this.hidePassItem()},handleClearBtnClick(){this.name="",this.userName="",this.email="",this.iconPasses=[],this.iconPassLastCompletedIndex=0,this.iconPassesToBeHidden=[],this.setUpDefaultIconsPass()},async submitSignup(){const s={name:this.name,userName:this.userName,email:this.email,password:this.passAfterTransformation,confirmPassword:this.passAfterTransformation};try{let e=await this.fetchSignup(s);e&&(this.$router.push({name:r.Ix}),this.signupInProgressOverlay=!1)}catch(e){this.signupErrorShows=!0,this.signupErrorMsg=l.cz,this.signupInProgressOverlay=!1}},handleSignupBtnClick(){const s=this.$refs.signupFormRef.validate();s?(this.signupInProgressOverlay=!0,this.submitSignup()):(this.signupErrorShows=!0,this.signupErrorMsg=l.$h,this.$refs.signupFormRef.reset())}},computed:{...(0,n.Se)("icons",["iconsCategories"]),onLargerViewPort(){return"lg"===this.$vuetify.breakpoint.name||"xl"===this.$vuetify.breakpoint.name},iconsScrollSize(){return this.onLargerViewPort?400:200},logoIsVisible(){return this.logoVisible&&this.onLargerViewPort},passIsComplete(){return this.iconPassLastCompletedIndex===this.iconPassCount},getSelectableIconsSize(){return this.onLargerViewPort?"2x":"lg"}}}),g=u,h=t(1001),d=t(3453),p=t.n(d),v=t(4562),m=t(266),f=t(5125),C=t(2933),w=t(3305),P=t(1713),I=t(4859),S=t(9258),k=t(7808),x=(0,h.Z)(g,i,a,!1,null,"f4b8456c",null),b=x.exports;p()(x,{VBtn:v.Z,VCol:m.Z,VForm:f.Z,VOverlay:C.Z,VProgressCircular:w.Z,VRow:P.Z,VSelect:I.Z,VSnackbar:S.Z,VTextField:k.Z})}}]);
//# sourceMappingURL=73.d6e36e8f.js.map