import{d as o,N as i}from"./index.4e7ffe61.js";import{api as s}from"./axios.0a2aaee7.js";const g=o("useRoutingStore",{state:()=>({dialog:{form:!0},form:{routing_id:null,nama:null,is_active:!0},data:[],loading:{table:!1,form:!1}}),getters:{rows(a){return a.data.map((e,r)=>(e.index=r,e)).filter(e=>e.is_active==!0)}},actions:{get_routing(a){this.loading.table=!0,s.post("/ref",{type:"get-routing"}).then(t=>{this.data=t.data,this.dialog.table=!1}).catch(t=>{i.create({message:t.response.data.messages,color:"negative",icon:"error"})}).finally(t=>{this.loading.table=!1})}}});export{g as u};
