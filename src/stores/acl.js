import { defineStore } from "pinia";
import { computed } from "vue";
import { api } from "boot/axios";
import { Notify } from "quasar";

export const useAclStore = defineStore("useAclStore", {
  state: () => ({
    drawerRight: {
      modul: false,
    },
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    increment() {
      this.counter++;
    },
  },
});

export const useModulStore = defineStore("useModulStore", {
  state: () => ({
    dialog: {
      form: false,
      formChild: false,
    },
    form: {
      modul_id: null,
      nama: null,
      icon: null,
      is_active: true,
      is_navbar: true,
      route_name: null,
      route_url: null,
    },
    child: {
      modul_id: null,
      nama: null,
      icon: null,
      is_active: true,
      modul_child_id: null,
      is_navbar: true,
      route_name: null,
      route_url: null,
    },
    loading: {
      form: false,
      table: false,
    },
    data: [],
  }),

  getters: {
    rows(state) {
      return state.data.map((e, index) => {
        e.index = index;
        return e;
      });
    },
    options(state) {
      return state.data.filter((e, index) => {
        return e.is_active == true;
      });
    },
  },

  actions: {
    set_modul() {
      this.loading.form = true;
      api
        .post("/acl", {
          type: "store-modul",
          data: this.form,
        })
        .then((e) => {
          const dataChange = this.data.findIndex((i) => {
            return i.modul_id == e.data.data.modul_id;
          });
          if (!e.data.status) {
            this.data.push(e.data.data);
          }

          Notify.create({
            message: "Modul : " + e.data.data.nama + " " + e.data.message,
            color: "positive",
            position: "top-right",
            icon: "check_circle",
          });
          this.form = {
            modul_id: null,
            nama: null,
            icon: null,
            is_active: true,
            is_navbar: true,
            route_name: null,
            route_url: null,
          };
          this.dialog.form = false;
        })
        .catch((error) => {
          // handle error
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
    set_modul_child() {
      this.loading.form = true;
      const indexModul = this.data.findIndex((i) => {
        return i.modul_id == this.child.modul_id;
      });
      api
        .post("/acl", {
          type: "store-modul-child",
          data: this.child,
        })
        .then((e) => {
          this.get_modul();

          Notify.create({
            message: "Modul Child : " + e.data.data.nama + " " + e.data.message,
            color: "positive",
            position: "top-right",
            icon: "check_circle",
          });
          this.child = {
            modul_id: null,
            nama: null,
            icon: null,
            is_active: true,
            modul_child_id: null,
            is_navbar: true,
            route_name: null,
            route_url: null,
          };
          this.dialog.formChild = false;
        })
        .catch((error) => {
          // handle error
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
    set_delete_modul(index, value) {
      this.loading.table = true;
      api
        .post("/acl", {
          type: "delete-modul",
          id: value,
        })
        .then((e) => {
          this.data.splice(index, 1);
          Notify.create({
            message: "Modul Berhasil di hapuskan",
            color: "positive",
            position: "top-right",
            icon: "check_circle",
          });

          this.loading.table = false;
        })
        .catch((error) => {
          // handle error
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
    set_delete_modul_child(index, value) {
      this.loading.table = true;
      api
        .post("/acl", {
          type: "delete-modul-child",
          id: value,
        })
        .then((e) => {
          this.get_modul();
          Notify.create({
            message: "Modul Berhasil di hapuskan",
            color: "positive",
            position: "top-right",
            icon: "check_circle",
          });

          this.loading.table = false;
        })
        .catch((error) => {
          // handle error
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
    get_modul() {
      this.loading.table = true;
      api
        .post("/acl", {
          type: "get-modul",
          data: this.form,
        })
        .then((e) => {
          this.data = e.data;
          this.dialog.table = false;
        })
        .catch((error) => {
          // handle error
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
  },
});

export const useRolesStore = defineStore("useRolesStore", {
  state: () => ({
    form: {
      role_id: null,
      nama: null,
      is_active: true,
    },
    permission: [],
    loading: {
      form: false,
      table: false,
    },
    data: [],
  }),

  getters: {
    rows(state) {
      return state.data.map((e, index) => {
        e.index = index;
        return e;
      });
    },
    options(state) {
      return state.data.filter((e, index) => {
        return e.is_active == true;
      });
    },
  },

  actions: {
    set_permission() {
      this.loading.form = true;
      api
        .post("/acl", {
          type: "store-roles",
          data: this.form,
          permission: this.permission,
        })
        .then((e) => {
          this.router.push({ name: "acl-roles" });
          Notify.create({
            message: e.data.data.messages,
            position: "top-right",
            color: "positive",
            icon: "check_circle",
          });
          this.form.role_id = null;
          this.get_permission();
        })
        .catch((error) => {
          // handle error
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

    set_delete_permission(index, value) {
      this.loading.table = true;
      api
        .post("/acl", {
          type: "delete-permission",
          id: value,
        })
        .then((e) => {
          this.data.splice(index, 1);
          Notify.create({
            message: "Roles Berhasil di hapuskan",
            color: "positive",
            position: "top-right",
            icon: "check_circle",
          });

          this.loading.table = false;
        })
        .catch((error) => {
          // handle error
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

    get_permission() {
      this.loading.form = true;
      api
        .post("/acl", {
          type: "get-permission",
          id: this.form.role_id,
        })
        .then((e) => {
          this.permission = e.data.permission;
          this.form = e.data.role;
          this.dialog.table = false;
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
    get_roles() {
      this.loading.table = true;
      api
        .post("/acl", {
          type: "get-roles",
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
        });
    },
  },
});

//MODUL FUNCTION
export const useModulStoreTable = defineStore("useModulStoreTable", () => {
  const columns = [
    {
      name: "index",
      required: true,
      label: "#",
      align: "left",
      field: (row) => row.index + 1,
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: "nama",
      align: "left",
      label: "Nama Modul",
      field: (row) => row.nama,
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: "icon",
      align: "left",
      label: "icon",
      field: (row) => row.icon,
    },
    {
      name: "route_name",
      align: "left",
      label: "Nama Route",
      field: (row) => row.route_name,
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: "url",
      align: "left",
      label: "URL",
      field: (row) => row.route_url,
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: "child",
      align: "center",
      label: "Child",
      field: (row) => row.child.length,
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: "is_active",
      align: "left",
      label: "Aktif",
      field: (row) => row.is_active,
      format: (val) => `${val}`,
      sortable: true,
    },
  ];
  const rows = computed(() => useModulStore().rows);
  const isLoading = computed(() => useModulStore().loading.table);

  return { columns, rows, isLoading };
});
