import { defineStore } from "pinia";
import { useAuthStore } from "stores/auth";
import { SessionStorage, LocalStorage } from "quasar";
import { api } from "boot/axios";
import { Notify } from "quasar";
export const useNotificationStore = defineStore("useNotificationStore", {
  state: () => ({
    dialog: false,
    dialogMap: false,
    data: {
      data: {},
      isLoading: false,
    },
  }),

  actions: {
    async getData() {
      this.data.isLoading = true;
      await api
        .post("/notification", {
          type: "by-pegawai-id",
          id: useAuthStore().active.pegawai_id,
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
          this.data.isLoading = false;
        });
    },
  },
});
