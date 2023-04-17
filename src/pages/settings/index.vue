<template>
  <q-page class="q-pa-md">
    <div class="row justify-between">
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
        <div class="text-h6">{{ storeRef.header.title }}</div>
        <p class="text-caption">{{ storeRef.header.subtitle }}</p>
      </div>

      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <div class="row justify-end q-col-gutter-sm">
          <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12 content-center flex">
            <div class="q-gutter-sm">
              <q-btn
                label="Tambah"
                icon="post_add"
                unelevated
                no-caps
                color="primary"
                size="md"
              />
              <q-btn
                label="Muat Ulang"
                dense
                no-caps
                flat
                color="orange-8"
                icon="refresh"
              />
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
            <q-input label="Pencarian" dense filled />
          </div>
        </div>
      </div>
    </div>
    <q-table
      class="q-mt-md"
      :rows="storeUsers.rows"
      :columns="storeUsers.columns"
      row-key="name"
    />
  </q-page>
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
  name: "users-index",
  preFetch({ store }) {
    storeRef.header.title = "Halaman Pengguna";
    storeRef.header.subtitle = "Informasi Data Pengguna Aplikasi";
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
