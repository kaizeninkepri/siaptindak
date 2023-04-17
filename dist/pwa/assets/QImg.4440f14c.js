import{l as g,j as R,r as o,u as j,x as I,h as a,V as Q,m as $,a8 as E}from"./index.4e7ffe61.js";const F={ratio:[String,Number]};function H(e,r){return g(()=>{const u=Number(e.ratio||(r!==void 0?r.value:void 0));return isNaN(u)!==!0&&u>0?{paddingBottom:`${100/u}%`}:null})}const L=16/9;var O=R({name:"QImg",props:{...F,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:L},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:r,emit:u}){const v=o(e.initialRatio),h=H(e,v);let t;const n=[o(null),o(m())],l=o(0),s=o(!1),c=o(!1),q=g(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),C=g(()=>({width:e.width,height:e.height})),w=g(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition`),T=g(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));j(()=>S(),y);function S(){return e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null}function m(){return e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null}function y(i){clearTimeout(t),c.value=!1,i===null?(s.value=!1,n[l.value^1].value=m()):s.value=!0,n[l.value].value=i}function z({target:i}){t!==null&&(clearTimeout(t),v.value=i.naturalHeight===0?.5:i.naturalWidth/i.naturalHeight,_(i,1))}function _(i,d){t===null||d===1e3||(i.complete===!0?N(i):t=setTimeout(()=>{_(i,d+1)},50))}function N(i){t!==null&&(l.value=l.value^1,n[l.value].value=null,s.value=!1,c.value=!1,u("load",i.currentSrc||i.src))}function k(i){clearTimeout(t),s.value=!1,c.value=!0,n[l.value].value=null,n[l.value^1].value=m(),u("error",i)}function b(i){const d=n[i].value,f={key:"img_"+i,class:w.value,style:T.value,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...d};return l.value===i?(f.class+=" q-img__image--waiting",Object.assign(f,{onLoad:z,onError:k})):f.class+=" q-img__image--loaded",a("div",{class:"q-img__container absolute-full",key:"img"+i},a("img",f))}function B(){return s.value!==!0?a("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},$(r[c.value===!0?"error":"default"])):a("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},r.loading!==void 0?r.loading():e.noSpinner===!0?void 0:[a(E,{color:e.spinnerColor,size:e.spinnerSize})])}return y(S()),I(()=>{clearTimeout(t),t=null}),()=>{const i=[];return h.value!==null&&i.push(a("div",{key:"filler",style:h.value})),c.value!==!0&&(n[0].value!==null&&i.push(b(0)),n[1].value!==null&&i.push(b(1))),i.push(a(Q,{name:"q-transition--fade"},B)),a("div",{class:q.value,style:C.value,role:"img","aria-label":e.alt},i)}}});export{O as Q};
