import{Q as d}from"./QInput.45689bc6.js";import{Q as c}from"./QCheckbox.9f24491a.js";import{Q as f}from"./QForm.2a6e580a.js";import{_ as u,a as p,r as g,l as b,x as y,o as v,ad as C,g as t,w as Q,Z as r,a0 as i}from"./index.4e7ffe61.js";import{Q as k}from"./QInnerLoading.1db0864f.js";import"./ref.4ae668e5.js";import{c as V}from"./master.1a3bcf0d.js";import"./use-dark.310a2ad4.js";import"./uid.7f2d5a47.js";import"./focus-manager.4350be2f.js";import"./use-transition.405b2041.js";import"./axios.0a2aaee7.js";import"./auth.f8643573.js";const s=V(),h=p({name:"master-kategori-form",setup(){const o=s.form,a=g(null),l=b(()=>s.isLoading);return y(()=>s.resetForm()),{form:o,myForm:a,isLoading:l,storeCategoryJabatan:s,async onActionForm(){const n=async()=>{await s.dataInsert(),s.dialog.form=!1,s.resetForm()};a.value.validate().then(m=>{m&&n()})}}}}),B={class:"row"},F={class:"col-lg-8 col-md-8 col-xs-12 col-sm-12"},_={class:"col-lg-4 col-md-4 col-xs-12 col-sm-12"},w={class:"q-mt-md q-gutter-sm"};function $(o,a,l,n,m,J){return v(),C("div",null,[t(f,{ref:"myForm"},{default:Q(()=>[r("div",B,[r("div",F,[t(d,{filled:"",dense:"",modelValue:o.form.nama,"onUpdate:modelValue":a[0]||(a[0]=e=>o.form.nama=e),label:"Nama Kategori Jabatan",rules:[e=>e&&e.length>0||"Please type something"]},null,8,["modelValue","rules"])]),r("div",_,[t(c,{label:"Aktif",modelValue:o.form.is_active,"onUpdate:modelValue":a[1]||(a[1]=e=>o.form.is_active=e)},null,8,["modelValue"])])])]),_:1},512),r("div",w,[t(i,{label:"Simpan",color:"primary",class:"radius5",onClick:o.onActionForm},null,8,["onClick"]),t(i,{label:"Batal",color:"grey-8",flat:"",class:"radius5",onClick:a[2]||(a[2]=e=>o.storeCategoryJabatan.dialog.form=!1)})]),t(k,{showing:o.isLoading,label:"Mohon Menunggu, memproses data...","label-class":"text-secondary","label-style":"font-size: 1.1em"},null,8,["showing"])])}var P=u(h,[["render",$]]);export{P as default};
