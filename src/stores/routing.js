import { defineStore } from "pinia";
import { api } from "boot/axios";
import { Notify } from "quasar";

export const useRoutingStore = defineStore("useRoutingStore", {
  state: () => ({
    dialog: {
      form: true,
    },
    form: {
      routing_id: null,
      nama: null,
      is_active: true,
    },
    data: [],
    loading: {
      table: false,
      form: false,
    },
  }),

  getters: {
    rows(state) {
      const data =  state.data.map((e, index) => {
        e.index = index;
        return e;
      });
      return data.filter((fn) => fn.is_active == true)
    },
  },

  actions: {
    get_routing(kategori) {
      this.loading.table = true;
      api
        .post("/ref", {
          type: "get-routing",
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
