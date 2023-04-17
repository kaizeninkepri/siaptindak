import{_ as E,a as I,c as O,r as N,aE as $,l as h,o as c,ad as u,Z as e,g as o,w as d,aJ as G,f as H,ai as k,a0 as r,aU as M,ae as w,$ as p,a1 as V,ag as R,ah as B,am as L,e as Q,i as J,aV as W,aW as z}from"./index.4e7ffe61.js";import{Q as f}from"./QCardSection.d5991535.js";import{Q as _}from"./QSelect.1e3c2dc4.js";import{Q as P}from"./QSeparator.cba34036.js";import{Q as y}from"./QDate.689ea3b5.js";import{Q as v}from"./QPopupProxy.5bdbda15.js";import{Q as m}from"./QInput.45689bc6.js";import{a as Y,Q as D}from"./QEditor.a9e7f565.js";import{Q as Z}from"./QCardActions.8d232048.js";import{Q as X}from"./QCard.3bac19a9.js";import{Q as x}from"./QForm.2a6e580a.js";import{C as b}from"./ClosePopup.a44adeaa.js";import{u as aa,b as ea,a as la}from"./spt.e9cfbe20.js";import{u as oa}from"./ref.4ae668e5.js";import{u as sa}from"./auth.f8643573.js";import"./use-dark.310a2ad4.js";import"./QItem.83867145.js";import"./QItemLabel.3f711634.js";import"./position-engine.f00a6894.js";import"./selection.aee7b8d9.js";import"./use-prevent-scroll.7bdeec7e.js";import"./focus-manager.4350be2f.js";import"./scroll.fd17398b.js";import"./use-transition.405b2041.js";import"./use-timeout.a9330d7f.js";import"./QDialog.3ba84a94.js";import"./use-virtual-scroll.4eacf217.js";import"./rtl.8137048b.js";import"./format.00f09157.js";import"./use-cache.b95af379.js";import"./uid.7f2d5a47.js";import"./TouchPan.b34981f9.js";import"./QTooltip.00bae92a.js";import"./use-fullscreen.d90a8f44.js";import"./axios.0a2aaee7.js";const j=aa(),C=oa();sa();const i=ea(),F=la(),ta=I({name:"laporan-harian-form",components:{formulirDasar:O(()=>J(()=>import("./form_dasar.ce6a3af6.js"),["assets/form_dasar.ce6a3af6.js","assets/index.4e7ffe61.js","assets/index.dd785630.css","assets/QInput.45689bc6.js","assets/use-dark.310a2ad4.js","assets/uid.7f2d5a47.js","assets/focus-manager.4350be2f.js","assets/QCheckbox.9f24491a.js","assets/QItem.83867145.js","assets/QItemLabel.3f711634.js","assets/spt.e9cfbe20.js","assets/auth.f8643573.js","assets/axios.0a2aaee7.js","assets/ref.4ae668e5.js","assets/master.1a3bcf0d.js"]))},setup(){G();const l=N(null);$(()=>{j.pegawaiAvaibaleGet(),j.getData(),F.getData(),C.header.title="Formulir Laporan Kejadian",C.header.subtitle="Pengisian Laporan Harian Oleh Petugas"});const s=N(null),S=h(()=>j.pegawai.data),q=h(()=>j.data.data.filter(t=>t.sptupload!=null)),T=h(()=>F.data.data),K=h(()=>i.laporan.isLoading),A=i.laporan.kejadian;return{storeRef:C,pegawai:S,isLoading:K,lk:A,myForm:l,dasarLaporan:s,spt:q,laporanHarian:T,addPersonKejadian(){i.addPersonKejadian()},addFilesKejadian(){i.addFilesKejadian()},deleteFilesKejadian(a){i.laporan.kejadian.attacemnt.splice(a,1)},deletePersonKejadian(a){i.laporan.kejadian.person.splice(a,1)},ChangeBerkasBB(a,t){console.log(t);let n=new FileReader;i.laporan.kejadian.attacemnt[t].berkas=a.target.files[0],n.readAsDataURL(a.target.files[0]),n.onload=async U=>{i.laporan.kejadian.attacemnt[t].url=U.target.result}},OnChangeUnggahBerkasPerson(a,t){let n=new FileReader;i.laporan.kejadian.person[t].berkas=a.target.files[0],n.readAsDataURL(a.target.files[0]),n.onload=async U=>{i.laporan.kejadian.person[t].url=U.target.result}},onValidateToDabases(){l.value.validate().then(a=>{a&&i.insertDataWithUpload()})}}}}),g=l=>(W("data-v-48012036"),l=l(),z(),l),da={class:"q-mt-md"},na={class:"row justify-center"},ia={class:"col-lg-10 col-md-11 col-sm-12 col-xs-12"},ra={class:"row justify-between items-center q-col-gutter-md"},ma={class:"col-lg-5 col-md-5 col-xs-12 col-sm-12"},ca={class:"text-h6"},ua={class:"text-caption"},pa={class:"col-lg-3 col-md-3 col-xs-12 col-sm-12 text-right"},_a={class:"row q-col-gutter-sm"},ga={class:"col-lg-4 col-md-4 col-sm-12 col-xs-12"},ka={class:"col-lg-3 col-md-3 col-sm-12 col-xs-12"},fa={key:0,class:"col-lg-3 col-md-3 col-sm-12 col-xs-12"},ha={class:"col-lg-3 col-md-3 col-sm-8 col-xs-8"},Va=g(()=>e("span",{class:"text-caption"},"Nomor SPT",-1)),va={class:"q-mb-none"},ba={class:"col-lg-2 col-md-2 col-sm-4 col-xs-4"},ja=g(()=>e("span",{class:"text-caption"},"Jam",-1)),Aa={class:"q-mb-none"},Ua={class:"col-lg-12 col-md-12 col-sm-12 col-xs-12"},wa=g(()=>e("span",{class:"text-caption"},"Tempat",-1)),Pa={class:"q-mb-none"},ya={class:"q-pa-md bg-grey-3 radius10"},Ca=g(()=>e("p",{class:"q-mb-sm text-caption text-weight-bold"},"WAKTU KEJADIAN",-1)),Sa={class:"row q-col-gutter-sm"},qa={class:"col-lg-2 col-md-2 col-sm-6 col-xs-6"},Ta={class:"row items-center justify-end"},Ka={class:"col-lg-2 col-md-2 col-sm-6 col-xs-6"},Na={class:"row items-center justify-end"},Ra={class:"col-lg-4 col-md-4 col-sm-12 col-xs-12"},Ba={class:"col-lg-2 col-md-2 col-sm-6 col-xs-6"},La={class:"row items-center justify-end"},Qa={class:"col-lg-2 col-md-2 col-sm-6 col-xs-6"},Da={class:"row items-center justify-end"},Fa={class:"col-lg-12 col-md-12 col-sm-12 col-xs-12"},Ea={class:"q-pa-md bg-red-2 q-mt-sm radius10"},Ia={class:"row q-col-gutter-sm q-mt-sm"},Oa={class:"col-lg-12 col-md-12 col-sm-12 col-xs-12"},$a={class:"col-lg-12 col-md-12 col-sm-12 col-xs-12"},Ga=g(()=>e("p",{class:"q-mb-sm text-caption text-weight-bold"},"PELAKU DAN SAKSI-SAKSI",-1)),Ha={class:"row q-col-gutter-md q-mb-md"},Ma={class:"col-lg-4 col-md-4 col-sm-12 col-xs-12"},Ja={class:"col-lg-4 col-md-4 col-sm-12 col-xs-12"},Wa={class:"col-lg-2 col-md-2 col-sm-12 col-xs-12"},za={class:"col-lg-12 col-md-12 col-xs-12 col-sm-12 row q-col-gutter-sm"},Ya={class:"col-lg-2 col-md-2 col-sm-12 col-xs-12"},Za={class:"col-lg-5 col-md-5 col-sm-12 col-xs-12"},Xa=["id","onChange"],xa=["for"],ae={class:"col-lg-12 col-md-2 col-sm-12 col-xs-12"},ee={class:"q-gutter-sm q-mt-sm"},le=g(()=>e("p",{class:"q-mb-sm text-caption text-weight-bold"},"BARANG BUKTI",-1)),oe={class:"row q-col-gutter-sm q-mb-sm"},se={class:"col-lg-4 col-md-4 col-sm-12 col-xs-12"},te={class:"col-lg-2 col-md-2 col-sm-8 col-xs-8"},de={class:"col-lg-5 col-md-5 col-sm-12 col-xs-12"},ne=["id","onChange"],ie=["for"],re={class:"col-lg-1 col-md-1 col-sm-4 col-xs-4"},me={class:"q-gutter-sm q-mt-sm"};function ce(l,s,S,q,T,K){const A=H("formulirDasar");return c(),u("div",da,[e("div",na,[e("div",ia,[o(x,{ref:"myForm"},{default:d(()=>[o(X,{class:"radius10"},{default:d(()=>[o(f,null,{default:d(()=>[e("div",ra,[e("div",ma,[e("div",ca,k(l.storeRef.header.title),1),e("p",ua,k(l.storeRef.header.subtitle),1)]),e("div",pa,[o(r,{label:"Data Laporan",icon:"arrow_back_ios",color:"secondary",class:"radius5",to:{name:"laporan"}})])])]),_:1}),o(f,null,{default:d(()=>[e("div",_a,[e("div",ga,[o(_,{label:"Nama Pelapor",dense:"",filled:"",options:l.pegawai,"option-label":"nama","option-value":"pegawai_id",modelValue:l.lk.pelapor,"onUpdate:modelValue":s[0]||(s[0]=a=>l.lk.pelapor=a),"map-options":"","emit-value":"",readonly:""},null,8,["options","modelValue"])]),e("div",ka,[o(_,{label:"Dasar Laporan Kejadian",dense:"",filled:"",options:["SPT","LAPORAN HARIAN","LAPORAN INFORMASI"],modelValue:l.dasarLaporan,"onUpdate:modelValue":s[1]||(s[1]=a=>l.dasarLaporan=a)},null,8,["modelValue"])]),l.dasarLaporan=="SPT"?(c(),u("div",fa,[o(_,{dense:"",filled:"",label:"Surat Perintah Tugas","option-label":a=>a.sptupload!=null?a.sptupload.nomor:null,"option-value":"spt_id",options:l.spt,modelValue:l.lk.spt_id,"onUpdate:modelValue":s[2]||(s[2]=a=>l.lk.spt_id=a),"emit-value":"","map-options":""},{option:d(({itemProps:a,opt:t})=>[e("div",M(a,{class:"row q-pa-md q-col-gutter-sm cursor-pointer selecetedData"}),[e("div",ha,[Va,e("p",va,k(t.sptupload.nomor),1)]),e("div",ba,[ja,e("p",Aa,k(t.jam),1)]),e("div",Ua,[wa,e("p",Pa,k(t.tempat),1)])],16),o(P)]),_:1},8,["option-label","options","modelValue"])])):w("",!0)])]),_:1}),o(f,null,{default:d(()=>[e("div",ya,[Ca,e("div",Sa,[e("div",qa,[o(m,{dense:"",class:"radius10",label:"Tanggal Kejadian",filled:"",modelValue:l.lk.kejadian_tgl,"onUpdate:modelValue":s[4]||(s[4]=a=>l.lk.kejadian_tgl=a),mask:"date",rules:["date"]},{append:d(()=>[o(p,{name:"event",class:"cursor-pointer"},{default:d(()=>[o(v,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:d(()=>[o(y,{modelValue:l.lk.kejadian_tgl,"onUpdate:modelValue":s[3]||(s[3]=a=>l.lk.kejadian_tgl=a)},{default:d(()=>[e("div",Ta,[V(o(r,{label:"Close",color:"primary",flat:""},null,512),[[b]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),e("div",Ka,[o(m,{dense:"",filled:"",modelValue:l.lk.kejadian_jam,"onUpdate:modelValue":s[6]||(s[6]=a=>l.lk.kejadian_jam=a),mask:"time",rules:["time"],label:"Jam Kejadian"},{append:d(()=>[o(p,{name:"access_time",class:"cursor-pointer"},{default:d(()=>[o(v,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:d(()=>[o(Y,{modelValue:l.lk.kejadian_jam,"onUpdate:modelValue":s[5]||(s[5]=a=>l.lk.kejadian_jam=a)},{default:d(()=>[e("div",Na,[V(o(r,{label:"Close",color:"primary",flat:""},null,512),[[b]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),e("div",Ra,[o(_,{label:"Tindakan",dense:"",filled:"",options:["SURAT PERNYATAAN","SURAT PERINGATAN 1","SURAT PERINGATAN 2","SURAT PERINGATAN 3"],modelValue:l.lk.tindakan.tindakan,"onUpdate:modelValue":s[7]||(s[7]=a=>l.lk.tindakan.tindakan=a)},null,8,["modelValue"])]),e("div",Ba,[o(m,{dense:"",class:"radius10",label:"Masa Tenggal Awal",filled:"",modelValue:l.lk.tindakan.masa_tenggang_awal,"onUpdate:modelValue":s[9]||(s[9]=a=>l.lk.tindakan.masa_tenggang_awal=a),mask:"date",rules:["date"]},{append:d(()=>[o(p,{name:"event",class:"cursor-pointer"},{default:d(()=>[o(v,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:d(()=>[o(y,{modelValue:l.lk.tindakan.masa_tenggang_awal,"onUpdate:modelValue":s[8]||(s[8]=a=>l.lk.tindakan.masa_tenggang_awal=a)},{default:d(()=>[e("div",La,[V(o(r,{label:"Close",color:"primary",flat:""},null,512),[[b]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),e("div",Qa,[o(m,{dense:"",class:"radius10",label:"Masa Tenggal Akhir",filled:"",modelValue:l.lk.tindakan.masa_tenggang_akhir,"onUpdate:modelValue":s[11]||(s[11]=a=>l.lk.tindakan.masa_tenggang_akhir=a),mask:"date",rules:["date"]},{append:d(()=>[o(p,{name:"event",class:"cursor-pointer"},{default:d(()=>[o(v,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:d(()=>[o(y,{modelValue:l.lk.tindakan.masa_tenggang_akhir,"onUpdate:modelValue":s[10]||(s[10]=a=>l.lk.tindakan.masa_tenggang_akhir=a)},{default:d(()=>[e("div",Da,[V(o(r,{label:"Close",color:"primary",flat:""},null,512),[[b]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),e("div",Fa,[o(m,{dense:"",filled:"",modelValue:l.lk.kejadian_tempat,"onUpdate:modelValue":s[12]||(s[12]=a=>l.lk.kejadian_tempat=a),label:"Tempat Kejadian",class:"bg-teal-1"},null,8,["modelValue"])])])]),e("div",Ea,[o(A)]),e("div",Ia,[e("div",Oa,[o(D,{dense:"",filled:"",modelValue:l.lk.deskripsi,"onUpdate:modelValue":s[13]||(s[13]=a=>l.lk.deskripsi=a),placeholder:"Apa Yang Terjadi"},null,8,["modelValue"])]),e("div",$a,[o(D,{dense:"",filled:"",modelValue:l.lk.operandi,"onUpdate:modelValue":s[14]||(s[14]=a=>l.lk.operandi=a),placeholder:"Modus Operandi"},null,8,["modelValue"])])])]),_:1}),o(f,{class:"bg-red-1"},{default:d(()=>[Ga,(c(!0),u(R,null,B(l.lk.person,(a,t)=>(c(),u("div",{key:t},[e("div",Ha,[e("div",Ma,[o(m,{dense:"",filled:"",modelValue:a.nik,"onUpdate:modelValue":n=>a.nik=n,label:"Nomor Induk Kependudukan"},null,8,["modelValue","onUpdate:modelValue"])]),e("div",Ja,[o(m,{dense:"",filled:"",modelValue:a.nama,"onUpdate:modelValue":n=>a.nama=n,label:"Nama Lengkap"},null,8,["modelValue","onUpdate:modelValue"])]),e("div",Wa,[o(_,{dense:"",filled:"",modelValue:a.kategori,"onUpdate:modelValue":n=>a.kategori=n,label:"Status",options:["PELAKU","SAKSI"]},null,8,["modelValue","onUpdate:modelValue"])]),e("div",za,[e("div",Ya,[o(m,{dense:"",filled:"",modelValue:a.hp,"onUpdate:modelValue":n=>a.hp=n,label:"Nomor HP / WA"},null,8,["modelValue","onUpdate:modelValue"])]),e("div",Za,[e("input",{type:"file",name:"file",id:t,class:"inputfile",onChange:n=>l.OnChangeUnggahBerkasPerson(n,t)},null,40,Xa),e("label",{for:t},[o(p,{name:"upload",size:"sm",class:"q-mr-sm"}),L("Pilih Berkas (.Pdf / .png, .jpg)")],8,xa)]),e("div",ae,[t!=0?(c(),Q(r,{key:0,icon:"delete",color:"red-5",onClick:n=>l.deletePersonKejadian(t)},null,8,["onClick"])):w("",!0)])])]),o(P,{class:"q-mb-md"})]))),128)),e("div",ee,[o(r,{label:"Tambah Pelaku / Saksi",outline:"",color:"secondary",class:"radius5",onClick:l.addPersonKejadian},null,8,["onClick"])])]),_:1}),o(f,{class:"bg-blue-1"},{default:d(()=>[le,(c(!0),u(R,null,B(l.lk.attacemnt,(a,t)=>(c(),u("div",{key:t},[e("div",oe,[e("div",se,[o(m,{dense:"",filled:"",modelValue:a.nama,"onUpdate:modelValue":n=>a.nama=n,label:"Nama Barang Bukti"},null,8,["modelValue","onUpdate:modelValue"])]),e("div",te,[o(_,{dense:"",filled:"",modelValue:a.kategori,"onUpdate:modelValue":n=>a.kategori=n,label:"Status",options:["BARANG BUKTI"]},null,8,["modelValue","onUpdate:modelValue"])]),e("div",de,[e("input",{type:"file",name:"bb",id:"files"+t,class:"inputfile",onChange:n=>l.ChangeBerkasBB(n,t)},null,40,ne),e("label",{for:"files"+t},[o(p,{name:"upload",size:"sm",class:"q-mr-sm"}),L("Pilih Berkas (.Pdf / .png, .jpg)")],8,ie)]),e("div",re,[t!=0?(c(),Q(r,{key:0,icon:"delete",color:"red-5",onClick:n=>l.deleteFilesKejadian(t)},null,8,["onClick"])):w("",!0)])]),o(P,{class:"q-mb-md"})]))),128)),e("div",me,[o(r,{label:"Tambah Barang Bukti",outline:"",color:"blue-8 ",class:"radius5",onClick:l.addFilesKejadian},null,8,["onClick"])])]),_:1}),o(Z,null,{default:d(()=>[o(r,{label:"ok, Kirim Laporan",color:"primary",onClick:l.onValidateToDabases},null,8,["onClick"])]),_:1})]),_:1})]),_:1},512)])])])}var Je=E(ta,[["render",ce],["__scopeId","data-v-48012036"]]);export{Je as default};
