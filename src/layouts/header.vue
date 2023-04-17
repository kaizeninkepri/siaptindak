<template>
  <div>
    <q-header :class="storeRef.header.class">
      <!-- <q-header class="bg-white text-black"> -->
      <q-toolbar>
        <q-btn flat round dense icon="sort" @click="storeRef.sideBar.left = true" class="q-mr-sm desktop-only" />
        <q-img src="/images/logo_with_text.png" width="120px" class="q-mt-sm" />
        <q-toolbar-title></q-toolbar-title>
        <!-- <q-btn unelevated class="radius10" no-caps icon="person_pin" color="secondary" label="Profile Saya"
          :to="{ name: 'users-profile' }" /> -->
        <q-img src="/images/pp.png" width="35px" />
      </q-toolbar>
    </q-header>
    <q-dialog v-model="storeRef.dialog.logout" persistent>
      <q-card style="width: 300px; border-radius: 10px">
        <q-card-section>
          <div class="text-h6 text-negative">Keluar Aplikasi</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Yakin untuk Keluar Aplikasi Ini ?
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="batal" color="grey-8" v-close-popup />
          <q-btn flat label="Ya, keluar" color="negative" @click="storeAuth.logout()" />
        </q-card-actions>
        <q-inner-loading :showing="storeAuth.isLoading" label="Proses Keluar Aplikasi..." label-class="text-negative"
          label-style="font-size: 1.1em" />
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { useRefStore } from "stores/ref";
import { useAuthStore } from "stores/auth";
import { defineAsyncComponent } from "vue";
export default {
  name: "main-header",

  setup() {
    const storeRef = useRefStore();
    const storeAuth = useAuthStore();
    return {
      storeRef,
      storeAuth,
      toggleLeftDrawer() {
        storeRef.sideBar.left = !storeRef.sideBar.left;
      },
    };
  },
};
</script>
