import { defineStore } from "pinia";
import { computed } from "vue";
import { api } from "boot/axios";
import { Notify } from "quasar";
import { useAuthStore } from "stores/auth";
const storeAuth = useAuthStore();
const columns = [
  {
    name: "idnex",
    required: true,
    label: "No",
    align: "left",
    field: (row) => row.index + 1,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nama",
    required: true,
    label: "Nama Lengkap",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "email",
    required: true,
    label: "Email",
    align: "left",
    field: (row) => row.email,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "role",
    align: "left",
    label: "Role",
    field: (row) => row.role.nama,
    sortable: true,
  },
  {
    name: "bagian",
    label: "Bagian",
    field: (row) => row.devisi.nama,
    sortable: true,
  },
  { name: "jabatan", label: "Jabatan", field: (row) => row.devisisub.nama },
  { name: "is_active", label: "Aktif", field: (row) => row.is_active },
];

export const useUsersStore = defineStore("useUsersStore", {
  state: () => ({
    columns: columns,
    form: {
      id: null,
      name: null,
      email: null,
      password: null,
      role_id: null,
      devisi_id: null,
      devisi_sub_id: null,
      identitas_no: null,
      identitas_type: null,
      is_active: true,
    },
    data: [],
    profile: {},
    search: null,
    currentUser: {
      id: null,
      name: null,
      email: null,
    },
    loading: {
      form: false,
      table: false,
    },
    dialog: {
      changePassword: false,
    },
    password: {
      new: null,
      confirm: null,
    },
  }),

  getters: {
    rows(state) {
      const data = state.data.map((e, index) => {
        e.index = index;
        return e;
      });
      if (this.search == null || this.search == "") {
        return data;
      }

      return data.filter((e) => {
        return (
          e.name.toLowerCase().includes(this.search.toLowerCase()) ||
          e.email.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },

  actions: {
    set_user() {
      api
        .post("/users", {
          type: "store-user",
          data: this.form,
        })
        .then((e) => {
          (this.form = {
            id: null,
            name: null,
            email: null,
            password: null,
            role_id: null,
            devisi_id: null,
            devisi_sub_id: null,
            identitas_no: null,
            identitas_type: null,
            is_active: true,
          }),
            this.router.push({
              name: "users",
            });
          Notify.create({
            message: e.data.message,
            color: "positive",
            position: "top-right",
            icon: "error",
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
          // this.loading.table = false;
        });
    },
    set_delete(index, id) {
      this.loading.table = true;
      api
        .post("/users", {
          type: "delete-user",
          id: id,
        })
        .then((e) => {
          this.data.splice(index, 1);
          Notify.create({
            message: e.data.message,
            color: "positive",
            position: "top-right",
            icon: "error",
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
          this.loading.table = false;
        });
    },
    set_ChangePassword(index, id) {
      this.loading.form = true;
      api
        .post("/users", {
          type: "change-password",
          id: this.profile.id,
          password: this.password.new,
        })
        .then((e) => {
          this.loading.form = false;
          this.dialog.changePassword = false;
          Notify.create({
            message: "Password Berhasil di rubah",
            color: "positive",
            position: "top-right",
            icon: "error",
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
          this.loading.form = false;
        });
    },
    get_users() {
      this.loading.table = true;
      this.search = null;
      api
        .post("/users", {
          type: "get-users",
        })
        .then((e) => {
          this.data = e.data;
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          this.loading.table = false;
          this.search = null;
        });
    },
    get_user() {
      this.loading.table = true;
      this.search = null;
      api
        .post("/users", {
          type: "get-userId",
          id: storeAuth.active.id,
        })
        .then((e) => {
          this.profile = e.data;
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          this.loading.table = false;
          this.search = null;
        });
    },
    checkingUser(label, value) {
      api
        .post("/ref", {
          type: "checking-users",
          data: {
            label: label,
            value: value,
          },
        })
        .then((e) => {
          if (e.data.status == true) {
            Notify.create({
              message: "data " + label + " telah digunakan ",
              color: "negative",
              position: "center",
              icon: "error",
            });
            this.form[label] = null;
          }
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          // this.loading.table = false;
        });
    },
  },
});
