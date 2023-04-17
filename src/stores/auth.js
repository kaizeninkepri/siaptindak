import { defineStore } from "pinia";
import { SessionStorage, LocalStorage } from "quasar";
import { api } from "boot/axios";
import { Notify } from "quasar";
import { useRefStore } from "stores/ref";
const storeRef = useRefStore();
export const useAuthStore = defineStore("useAuthStore", {
  state: () => ({
    login: LocalStorage.getItem("221122-user") == null ? false : true,
    active:
      LocalStorage.getItem("221122-user") == null
        ? {}
        : LocalStorage.getItem("221122-user"),
    isLoading: false,
    username: null,
    password: null,
    loginInfo: {
      isError: false,
      text: "Mohon Menunggu, Autentikasi akun Anda",
    },
    sidebar: [],
  }),

  getters: {
    isLogin(state) {
      return state.login;
    },
  },

  actions: {
    setLogin() {
      this.isLoading = true;
      this.loginInfo.text = "Mohon Menunggu, Autentikasi akun Anda";
      api
        .post("/users", {
          type: "login",
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .then((e) => {
          this.loginInfo.isError = false;
          this.login = true;

          LocalStorage.set("221122-user", e.data);
          this.active = e.data;
          Notify.create({
            message: "Autentikasi Berhasil",
            color: "primary",
            position: "top-right",
            icon: "info",
          });
          window.setTimeout((e) => {
            this.isLoading = false;
            this.router.push({
              name: "beranda",
            });
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.loginInfo.isError = true;
          // this.loginInfo.text = error.response.data.message;
        })
        .finally((result) => {});
    },
    set_sidebar() {
      api
        .post("/ref", {
          type: "sidebar",
          id: this.active.id,
        })
        .then((e) => {
          this.sidebar = e.data;
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
    setAuthToken(token, id) {
      api
        .post("/users", {
          type: "get-auth-token",
          id: id,
          token: token,
        })
        .then((e) => {
          // this.sidebar = e.data;
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
    logout() {
      this.isLoading = true;
      LocalStorage.remove("221122-user");

      window.setTimeout((e) => {
        this.isLoading = false;
        storeRef.dialog.logout = false;
        this.router.push({
          name: "login",
        });
      }, 1500);
    },
  },
});
