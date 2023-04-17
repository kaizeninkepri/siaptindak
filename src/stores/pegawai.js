import { defineStore } from "pinia";
import { api } from "boot/axios";
import { Notify } from "quasar";
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
    name: "nip",
    align: "left",
    label: "NIP",
    field: (row) => row.nip,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nama",
    align: "left",
    label: "Nama Lengkap",
    field: (row) => row.nama,
  },
  {
    name: "jabatan",
    align: "left",
    label: "Jabatan",
    field: (row) => `${row.jabatan} - ${row.jenis_jabatan} `,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "user",
    align: "left",
    label: "user",
    field: (row) => `${row.user}`,
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

export const usePegawaiStore = defineStore("usePegawaiStore", {
  state: () => ({
    data: [],
    columns: columns,
    loading: {
      table: false,
      form: false,
    },
  }),

  getters: {
    rows(state) {
      return state.data.map((e, index) => {
        e.index = index;
        return e;
      });
    },
  },

  actions: {
    get_pegawai(kategori) {
      this.loading.table = true;
      api
        .post("/pegawai", {
          type: "get-pegawai",
          kategori: kategori,
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
  },
});
