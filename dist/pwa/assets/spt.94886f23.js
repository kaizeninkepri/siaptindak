import{j as w,l as B,h as C,m as y,q as A,_ as Q,a as R,c as u,aN as T,o as l,ad as p,Z as t,ai as _,ag as f,ah as q,g as o,w as r,f as g,e as P,a0 as h,am as $,i as v}from"./index.4e7ffe61.js";import{Q as V}from"./QTooltip.00bae92a.js";import{u as x,a as E}from"./use-dark.310a2ad4.js";import{Q as j}from"./QCardSection.d5991535.js";import{Q as I}from"./QCard.3bac19a9.js";import{Q as L}from"./QDialog.3ba84a94.js";import{u as N}from"./auth.f8643573.js";import{u as F}from"./ref.4ae668e5.js";import{u as U}from"./users.c5b373c2.js";import"./pegawai.f1d5fe18.js";import{u as z}from"./routing.20f994d5.js";import{u as O}from"./spt.e9cfbe20.js";import"./position-engine.f00a6894.js";import"./selection.aee7b8d9.js";import"./use-prevent-scroll.7bdeec7e.js";import"./focus-manager.4350be2f.js";import"./scroll.fd17398b.js";import"./use-transition.405b2041.js";import"./use-timeout.a9330d7f.js";import"./axios.0a2aaee7.js";var K=w({name:"QBar",props:{...x,dense:Boolean},setup(e,{slots:s}){const{proxy:{$q:i}}=A(),m=E(e,i),c=B(()=>`q-bar row no-wrap items-center q-bar--${e.dense===!0?"dense":"standard"}  q-bar--${m.value===!0?"dark":"light"}`);return()=>C("div",{class:c.value,role:"toolbar"},y(s.default))}});const Z=N(),d=F(),G=U(),b=z(),n=O(),H=R({name:"users-data",preFetch({store:e}){d.header.title="Surat Perintah Tugas",d.header.subtitle="Informasi Alur Surat Perintah Tugas Berbasis Elektronik dimonitoring secara Real-Time",b.get_routing()},components:{formulir:u(()=>v(()=>import("./form.f5e1565e.js"),["assets/form.f5e1565e.js","assets/index.4e7ffe61.js","assets/index.dd785630.css","assets/QDate.689ea3b5.js","assets/use-dark.310a2ad4.js","assets/use-cache.b95af379.js","assets/QInput.45689bc6.js","assets/uid.7f2d5a47.js","assets/focus-manager.4350be2f.js","assets/QEditor.a9e7f565.js","assets/TouchPan.b34981f9.js","assets/selection.aee7b8d9.js","assets/format.00f09157.js","assets/QSelect.1e3c2dc4.js","assets/QItem.83867145.js","assets/QItemLabel.3f711634.js","assets/position-engine.f00a6894.js","assets/use-prevent-scroll.7bdeec7e.js","assets/scroll.fd17398b.js","assets/use-transition.405b2041.js","assets/use-timeout.a9330d7f.js","assets/QDialog.3ba84a94.js","assets/use-virtual-scroll.4eacf217.js","assets/rtl.8137048b.js","assets/QTooltip.00bae92a.js","assets/use-fullscreen.d90a8f44.js","assets/QPopupProxy.5bdbda15.js","assets/QCheckbox.9f24491a.js","assets/QInnerLoading.1db0864f.js","assets/ClosePopup.a44adeaa.js","assets/ref.4ae668e5.js","assets/axios.0a2aaee7.js","assets/spt.e9cfbe20.js","assets/auth.f8643573.js","assets/master.1a3bcf0d.js"])),tablePage:u(()=>v(()=>import("./table.b8be3184.js"),["assets/table.b8be3184.js","assets/QSpace.d6d7e8bc.js","assets/index.4e7ffe61.js","assets/index.dd785630.css","assets/QInput.45689bc6.js","assets/use-dark.310a2ad4.js","assets/uid.7f2d5a47.js","assets/focus-manager.4350be2f.js","assets/QTable.c45351ff.js","assets/QSeparator.cba34036.js","assets/QVirtualScroll.ee1d2954.js","assets/QList.d19f89c1.js","assets/use-virtual-scroll.4eacf217.js","assets/rtl.8137048b.js","assets/scroll.fd17398b.js","assets/QSelect.1e3c2dc4.js","assets/QItem.83867145.js","assets/QItemLabel.3f711634.js","assets/position-engine.f00a6894.js","assets/selection.aee7b8d9.js","assets/use-prevent-scroll.7bdeec7e.js","assets/use-transition.405b2041.js","assets/use-timeout.a9330d7f.js","assets/QDialog.3ba84a94.js","assets/format.00f09157.js","assets/QCheckbox.9f24491a.js","assets/use-fullscreen.d90a8f44.js","assets/QBadge.5a60af85.js","assets/spt.e9cfbe20.js","assets/auth.f8643573.js","assets/axios.0a2aaee7.js","assets/ref.4ae668e5.js"]))},setup(){return T(async(e,s,i)=>{if(n.onDialogAdd){n.onDialogAdd=!1,n.BackToSptData();return}i()}),{storeAuth:Z,storeRef:d,storeUsers:G,storeRouting:b,storeSpt:n}}}),J={class:"q-pa-md"},M={class:"row justify-between"},W={class:"col-lg-4 col-md-4 col-xs-12 col-sm-12"},X={class:"text-h6"},Y={class:"text-caption"},ee={class:"col-lg-8 col-md-8 col-xs-12 col-sm-12"},te={class:"row justify-end q-col-gutter-sm"},oe={class:"col-lg-5 col-md-5 col-xs-12 col-sm-12 content-center flex"},se={class:"q-gutter-sm"},ae={class:"q-mt-md"},re={class:"row justify-center"},ie={class:"col-lg-8 col-md-8 col-sm-12 col-xs-12"};function ne(e,s,i,m,c,le){const S=g("tablePage"),k=g("formulir");return l(),p(f,null,[t("div",J,[t("div",M,[t("div",W,[t("div",X,_(e.storeRef.header.title),1),t("p",Y,_(e.storeRef.header.subtitle),1)]),t("div",ee,[t("div",te,[t("div",oe,[t("div",se,[(l(!0),p(f,null,q(e.storeRouting.rows,(a,D)=>(l(),P(h,{key:D,label:"Tambah "+a.nama,icon:"post_add",unelevated:"","no-caps":"",color:"primary",size:"md",class:"radius10",onClick:de=>(e.storeSpt.onDialogAdd=!0,e.storeSpt.headerTittle="Formulir Pembuatan "+a.nama,e.storeSpt.spt.routing_id=a.routing_id)},null,8,["label","onClick"]))),128))])])])])]),t("div",ae,[o(S)])]),o(L,{modelValue:e.storeSpt.onDialogAdd,"onUpdate:modelValue":s[1]||(s[1]=a=>e.storeSpt.onDialogAdd=a),persistent:"","transition-show":"slide-left","transition-hide":"slide-right",maximized:!0},{default:r(()=>[o(I,null,{default:r(()=>[o(K,{class:"bg-primary text-white q-pa-md"},{default:r(()=>[o(h,{dense:"",flat:"",icon:"arrow_back",label:"Kembali",onClick:s[0]||(s[0]=a=>e.storeSpt.BackToSptData())},{default:r(()=>[o(V,{class:"bg-white text-primary"},{default:r(()=>[$("Close")]),_:1})]),_:1})]),_:1}),o(j,null,{default:r(()=>[t("div",re,[t("div",ie,[o(k)])])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}var Te=Q(H,[["render",ne]]);export{Te as default};
