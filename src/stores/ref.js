import { defineStore } from "pinia";
import { api } from "boot/axios";
import { Notify } from "quasar";
export const useRefStore = defineStore("useRefStore", {
  state: () => ({
    header: {
      isCollpase: true,
      title: "",
      subtitle: "",
      class: "header",
    },
    sideBar: {
      left: false,
    },
    dialog: {
      logout: false,
    },
    devisi: [],
    kecamatan: {
      isLoading: true,
      data: [],
      kelurahan: [],
    },
    kegiatan: {
      isLoading: true,
      data: [],
    },
    bulan: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
  }),

  getters: {
    headerCollapse(state) {
      return state.isCollpase;
    },
    leftDrawer(state) {
      return state.sideBar.left;
    },
  },

  actions: {
    get_devisi() {
      api
        .post("/ref", {
          type: "get-devisi",
        })
        .then((e) => {
          this.devisi = e.data;
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
    kecamatanGet() {
      this.kecamatan.isLoading = true;
      api
        .post("/ref", {
          type: "kecamatan-data",
        })
        .then((e) => {
          this.kecamatan.data = e.data.data.kecamatan;
          this.kecamatan.kelurahan = e.data.data.kelurahan;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally((result) => {
          this.kecamatan.isLoading = false;
        });
    },
    kegiatanGet() {
      this.kegiatan.isLoading = true;
      api
        .post("/ref", {
          type: "kegiatan",
        })
        .then((e) => {
          this.kegiatan.data = e.data.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally((result) => {
          this.kegiatan.isLoading = false;
        });
    },
  },
});
