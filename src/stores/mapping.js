import { defineStore } from "pinia";
import { useAuthStore } from "stores/auth";
import { SessionStorage, LocalStorage } from "quasar";
import { api } from "boot/axios";
import { Notify } from "quasar";

export const useMappingStore = defineStore("useMappingStore", {
  state: () => ({
    tileProvider: {
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
    spt: {
      isLoading: false,
      data: [],
    },
  }),

  actions: {
    async getHarianData() {
      this.spt.isLoading = true;
      await api
        .post("/mapping", {
          type: "laporan-harian",
        })
        .then((e) => {
          this.spt.data = e.data.data;
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          this.spt.isLoading = false;
        });
    },
    async getkejadianData() {
      this.spt.isLoading = true;
      await api
        .post("/mapping", {
          type: "laporan-kejadian",
        })
        .then((e) => {
          this.spt.data = e.data.data;
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          this.spt.isLoading = false;
        });
    },
    async getInformasiData() {
      this.spt.isLoading = true;
      await api
        .post("/mapping", {
          type: "laporan-informasi",
        })
        .then((e) => {
          this.spt.data = e.data.data;
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          this.spt.isLoading = false;
        });
    },
  },
});
