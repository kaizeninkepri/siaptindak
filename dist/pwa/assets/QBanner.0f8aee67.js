import{j as u,l as s,h as n,m as r,q as v}from"./index.4e7ffe61.js";import{u as m,a as q}from"./use-dark.310a2ad4.js";var _=u({name:"QBanner",props:{...m,inlineActions:Boolean,dense:Boolean,rounded:Boolean},setup(e,{slots:a}){const{proxy:{$q:c}}=v(),i=q(e,c),l=s(()=>"q-banner row items-center"+(e.dense===!0?" q-banner--dense":"")+(i.value===!0?" q-banner--dark q-dark":"")+(e.rounded===!0?" rounded-borders":"")),d=s(()=>`q-banner__actions row items-center justify-end col-${e.inlineActions===!0?"auto":"all"}`);return()=>{const o=[n("div",{class:"q-banner__avatar col-auto row items-center self-start"},r(a.avatar)),n("div",{class:"q-banner__content col text-body2"},r(a.default))],t=r(a.action);return t!==void 0&&o.push(n("div",{class:d.value},t)),n("div",{class:l.value+(e.inlineActions===!1&&t!==void 0?" q-banner--top-padding":""),role:"alert"},o)}}});export{_ as Q};
