import { boot } from "quasar/wrappers";
import { useAuthStore } from "stores/auth";
const storeAuth = useAuthStore();
export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    if (to.name !== "login" && !storeAuth.login) next({ name: "login" });
    else next();
  });
});
