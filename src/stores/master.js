import { defineStore } from 'pinia'
import { useAuthStore } from "stores/auth";
import { api } from "boot/axios";
import { Notify } from "quasar";
export const useJabatanCategoryStore = defineStore('useJabatanCategoryStore', {
  state: () => ({
    isLoading : false,
    data : {
      isLoading :false,
      data : []
    },
    form: {
      category_jabatan_id : null,
      nama : null,
      is_active : true,
      user_id : useAuthStore().active.id
    },
    dialog : {
      form : false
    }
  }),

  actions: {
    resetForm(){
      this.form = {
        category_jabatan_id : null,
        nama : null,
        is_active : true,
        user_id : useAuthStore().active.id
      }
    },
    async getData() {
      this.data.isLoading = true
     await api
     .post("/master", {
       type: "categoryJabatan-data",
     })
     .then((e) => {
       this.data.data = e.data.data;
     })
     .catch((error) => {
       Notify.create({
         message: error.response.data.messages,
         color: "negative",
         icon: "error",
       });
     })
     .finally((result) => {
      this.data.isLoading = false
     });
    },
    async dataInsert() {
      this.isLoading = true
      this.form.user_id =  useAuthStore().active.id
     await api
     .post("/master", {
       type: "categoryJabatan-insert",
       data : this.form
     })
     .then((e) => {
      const findIndex =  this.data.data.findIndex((fi) => fi.category_jabatan_id == e.data.data.category_jabatan_id)
      if(findIndex == -1){
        this.data.data.push(e.data.data)
      }
      else{
        this.data.data[findIndex] =  e.data.data
      }


       Notify.create({
        message:e.data.messages,
        color: "positive",
        icon: "info",
      });
     })
     .catch((error) => {
       Notify.create({
         message: error.response.data.messages,
         color: "negative",
         icon: "error",
       });
     })
     .finally((result) => {
      this.isLoading = false
     });
    },
    async dataDelete(id) {
      this.isLoading = true
     await api
     .post("/master", {
       type: "categoryJabatan-delete",
       id : id
     })
     .then((e) => {
      const findIndex =  this.data.data.findIndex((fi) => fi.category_jabatan_id == id)
      if(findIndex != -1){
        this.data.data.splice(findIndex, 1);
      }
       Notify.create({
        message:e.data.messages,
        color: "positive",
        icon: "info",
      });
     })
     .catch((error) => {
       Notify.create({
         message: error.response.data.messages,
         color: "negative",
         icon: "error",
       });
     })
     .finally((result) => {
      this.isLoading = false
     });
    }
  }
})

export const useUndangStore = defineStore('useUndangStore', {
  state: () => ({
    isLoading : false,
    data : {
      isLoading :false,
      data : []
    },
    form: {
      undang_id : null,
      nama : null,
      is_active : true,
      user_id : useAuthStore().active.id
    },
    dialog : {
      form : false
    }
  }),

  actions: {
    resetForm(){
      this.form = {
        undang_id : null,
        nama : null,
        is_active : true,
        user_id : useAuthStore().active.id
      }
    },
    async getData() {
      this.data.isLoading = true
     await api
     .post("/master", {
       type: "undang-data",
     })
     .then((e) => {
       this.data.data = e.data.data;
     })
     .catch((error) => {
       Notify.create({
         message: error.response.data.messages,
         color: "negative",
         icon: "error",
       });
     })
     .finally((result) => {
      this.data.isLoading = false
     });
    },
    async dataInsert() {
      this.isLoading = true
      this.form.user_id =  useAuthStore().active.id
     await api
     .post("/master", {
       type: "undang-insert",
       data : this.form
     })
     .then((e) => {
      const findIndex =  this.data.data.findIndex((fi) => fi.undang_id == e.data.data.undang_id)
      if(findIndex == -1){
        this.data.data.push(e.data.data)
      }
      else{
        this.data.data[findIndex] =  e.data.data
      }


       Notify.create({
        message:e.data.messages,
        color: "positive",
        icon: "info",
      });
     })
     .catch((error) => {
       Notify.create({
         message: error.response.data.messages,
         color: "negative",
         icon: "error",
       });
     })
     .finally((result) => {
      this.isLoading = false
     });
    },
    async dataDelete(id) {
      this.isLoading = true
     await api
     .post("/master", {
       type: "undang-delete",
       id : id
     })
     .then((e) => {
      const findIndex =  this.data.data.findIndex((fi) => fi.undang_id == id)
      if(findIndex != -1){
        this.data.data.splice(findIndex, 1);
      }
       Notify.create({
        message:e.data.messages,
        color: "positive",
        icon: "info",
      });
     })
     .catch((error) => {
       Notify.create({
         message: error.response.data.messages,
         color: "negative",
         icon: "error",
       });
     })
     .finally((result) => {
      this.isLoading = false
     });
    }
  }
})

export const useUnsurStore = defineStore('useUnsurStore', {
  state: () => ({
    isLoading : false,
    data : {
      isLoading :false,
      data : []
    },
    form: {
      unsur_id : null,
      nama : null,
      is_active : true,
      user_id : useAuthStore().active.id
    },
    dialog : {
      form : false
    }
  }),

  actions: {
    resetForm(){
      this.form = {
        unsur_id : null,
        nama : null,
        is_active : true,
        user_id : useAuthStore().active.id
      }
    },
    async getData() {
      this.data.isLoading = true
     await api
     .post("/master", {
       type: "unsur-data",
     })
     .then((e) => {
       this.data.data = e.data.data;
     })
     .catch((error) => {
       Notify.create({
         message: error.response.data.messages,
         color: "negative",
         icon: "error",
       });
     })
     .finally((result) => {
      this.data.isLoading = false
     });
    },
    async dataInsert() {
      this.isLoading = true
      this.form.user_id =  useAuthStore().active.id
     await api
     .post("/master", {
       type: "unsur-insert",
       data : this.form
     })
     .then((e) => {
      const findIndex =  this.data.data.findIndex((fi) => fi.unsur_id == e.data.data.unsur_id)
      if(findIndex == -1){
        this.data.data.push(e.data.data)
      }
      else{
        this.data.data[findIndex] =  e.data.data
      }


       Notify.create({
        message:e.data.messages,
        color: "positive",
        icon: "info",
      });
     })
     .catch((error) => {
       Notify.create({
         message: error.response.data.messages,
         color: "negative",
         icon: "error",
       });
     })
     .finally((result) => {
      this.isLoading = false
     });
    },
    async dataDelete(id) {
      this.isLoading = true
     await api
     .post("/master", {
       type: "unsur-delete",
       id : id
     })
     .then((e) => {
      const findIndex =  this.data.data.findIndex((fi) => fi.unsur_id == id)
      if(findIndex != -1){
        this.data.data.splice(findIndex, 1);
      }
       Notify.create({
        message:e.data.messages,
        color: "positive",
        icon: "info",
      });
     })
     .catch((error) => {
       Notify.create({
         message: error.response.data.messages,
         color: "negative",
         icon: "error",
       });
     })
     .finally((result) => {
      this.isLoading = false
     });
    }
  }
})

export const useUnsurSubStore = defineStore('useUnsurSubStore', {
  state: () => ({
    isLoading : false,
    data : {
      isLoading :false,
      data : []
    },
    form: {
      unsur_sub_id : null,
      unsur_id : null,
      nama : null,
      is_active : true,
      user_id : useAuthStore().active.id
    },
    dialog : {
      form : false
    }
  }),

  actions: {
    resetForm(){
      this.form = {
        unsur_sub_id : null,
        unsur_id : null,
        nama : null,
        is_active : true,
        user_id : useAuthStore().active.id
      }
    },
    async getData() {
      this.data.isLoading = true
     await api
     .post("/master", {
       type: "unsursub-data",
     })
     .then((e) => {
       this.data.data = e.data.data;
     })
     .catch((error) => {
       Notify.create({
         message: error.response.data.messages,
         color: "negative",
         icon: "error",
       });
     })
     .finally((result) => {
      this.data.isLoading = false
     });
    },
    async dataInsert() {
      this.isLoading = true
      this.form.user_id =  useAuthStore().active.id
     await api
     .post("/master", {
       type: "unsursub-insert",
       data : this.form
     })
     .then((e) => {
      const findIndex =  this.data.data.findIndex((fi) => fi.unsur_sub_id == e.data.data.unsur_sub_id)
      if(findIndex == -1){
        this.data.data.push(e.data.data)
      }
      else{
        this.data.data[findIndex] =  e.data.data
      }


       Notify.create({
        message:e.data.messages,
        color: "positive",
        icon: "info",
      });
     })
     .catch((error) => {
       Notify.create({
         message: error.response.data.messages,
         color: "negative",
         icon: "error",
       });
     })
     .finally((result) => {
      this.isLoading = false
     });
    },
    async dataDelete(id) {
      this.isLoading = true
     await api
     .post("/master", {
       type: "unsursub-delete",
       id : id
     })
     .then((e) => {
      const findIndex =  this.data.data.findIndex((fi) => fi.unsur_id == id)
      if(findIndex != -1){
        this.data.data.splice(findIndex, 1);
      }
       Notify.create({
        message:e.data.messages,
        color: "positive",
        icon: "info",
      });
     })
     .catch((error) => {
       Notify.create({
         message: error.response.data.messages,
         color: "negative",
         icon: "error",
       });
     })
     .finally((result) => {
      this.isLoading = false
     });
    }
  }
})
