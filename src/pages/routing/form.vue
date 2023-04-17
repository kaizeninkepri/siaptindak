<template>
  <div class="q-pa-md">
    <p></p>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useAuthStore } from "stores/auth";
import { useRefStore } from "stores/ref";
import { useUsersStore } from "stores/users";

const storeAuth = useAuthStore();
const storeRef = useRefStore();
const storeUsers = useUsersStore();

export default defineComponent({
  name: "routing-data",
  preFetch({ store }) {
    storeRef.header.title = "Halaman Routing";
    storeRef.header.subtitle = "Informasi Data Alur Berkas Berjalan";
    storeUsers.get_users();
  },
  setup() {
    return {
      storeAuth,
      storeRef,
      storeUsers,
    };
  },
});
</script>
