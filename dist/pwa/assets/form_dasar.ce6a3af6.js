import{_ as g,a as _,r as v,l as h,aE as Q,o as i,ad as c,Z as o,g as t,a0 as V,ag as k,ah as L,a1 as w,a2 as C,e as b,w as l,am as q,ai as x}from"./index.4e7ffe61.js";import{Q as B}from"./QInput.45689bc6.js";import{Q as y}from"./QCheckbox.9f24491a.js";import{Q as u,a as A}from"./QItem.83867145.js";import{Q as D}from"./QItemLabel.3f711634.js";import{b as N}from"./spt.e9cfbe20.js";import{u as R}from"./master.1a3bcf0d.js";import"./use-dark.310a2ad4.js";import"./uid.7f2d5a47.js";import"./focus-manager.4350be2f.js";import"./auth.f8643573.js";import"./axios.0a2aaee7.js";import"./ref.4ae668e5.js";const S=N(),n=R(),I=_({name:"spt-form-dasar",setup(){const e=S.laporan.kejadian,a=v(null),m=h(()=>{const d=n.data.data.filter(s=>s.is_active==!0);return a.value==""||a.value==null?d:d.filter(s=>s.nama.toLowerCase().includes(a.value.toLowerCase()))});return Q(()=>{if(n.data.data.length==0){n.getData();return}}),{dasar:m,form:e,search:a,async onReload(){await n.getData(),a.value=null}}}}),$={class:"row q-col-gutter-sm items-center"},E=o("div",{class:"col-lg-8 col-md-8 col-sm-12 col-xs-12"},[o("p",{class:"q-mb-xs text-grey-9"},"PASAL PELANGGARAN")],-1),P={class:"col-lg-2 col-md-2 col-sm-12 col-xs-12"},U={class:"q-gutter-sm"},j={class:"col-lg-2 col-md-2 col-sm-12 col-xs-12 text-right"},G={class:"q-gutter-sm q-mt-md"};function K(e,a,m,d,s,F){return i(),c("div",null,[o("div",$,[E,o("div",P,[o("div",U,[t(V,{label:"Refresh",icon:"refresh",flat:"",color:"secondary",onClick:e.onReload},null,8,["onClick"])])]),o("div",j,[t(B,{dense:"",placeholder:"Pencarian",modelValue:e.search,"onUpdate:modelValue":a[0]||(a[0]=r=>e.search=r)},null,8,["modelValue"])])]),o("div",G,[(i(!0),c(k,null,L(e.dasar,(r,p)=>w((i(),b(A,{tag:"label",key:p},{default:l(()=>[t(u,{avatar:"",top:""},{default:l(()=>[t(y,{class:"q-ma-none",modelValue:e.form.pasal_pelanggaran,"onUpdate:modelValue":a[1]||(a[1]=f=>e.form.pasal_pelanggaran=f),val:r.undang_id},null,8,["modelValue","val"])]),_:2},1024),t(u,{top:""},{default:l(()=>[t(D,null,{default:l(()=>[q(x(r.nama),1)]),_:2},1024)]),_:2},1024)]),_:2},1024)),[[C]])),128))])])}var ta=g(I,[["render",K]]);export{ta as default};
