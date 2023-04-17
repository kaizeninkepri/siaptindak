<template>
  <div>
    <div class="text-subtitle2 q-mb-md">Formulir Penambahan Data Modul</div>
    <div class="row q-col-gutter-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-input
          dense
          filled
          v-model="storemodul.form.nama"
          label="Nama Modul"
          :disable="storemodul.loading.form"
        />
      </div>
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-input
          dense
          filled
          v-model="storemodul.form.icon"
          label="icon"
          :disable="storemodul.loading.form"
        />
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <q-input
          dense
          filled
          v-model="storemodul.form.route_name"
          label="Route Name"
          :disable="storemodul.loading.form"
        />
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <q-input
          dense
          filled
          v-model="storemodul.form.route_url"
          label="Route url"
          :disable="storemodul.loading.form"
        />
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="q-gutters-sm">
          <q-checkbox
            v-model="storemodul.form.is_active"
            label="Aktif"
            val="storemodul.form.is_active"
          />
          <q-checkbox v-model="storemodul.form.is_navbar" label="Nabar" />
        </div>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <q-btn
          label="Simpan"
          color="positive"
          unelevated
          size="sm"
          icon="bookmark_add"
          :loading="storemodul.loading.form"
          @click="storemodul.set_modul()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRefStore } from "stores/ref";
import { useModulStore } from "stores/acl";
const storeRef = useRefStore();
const storemodul = useModulStore();

export default defineComponent({
  name: "acl-modul-form",
  preFetch({ store }) {
    storeRef.header.title = "Halaman Modul";
    storeRef.header.subtitle = "Informasi Data Modul Access Control List Pengguna";
  },
  setup() {
    return {
      storeRef,
      storemodul,
    };
  },
});
</script>
