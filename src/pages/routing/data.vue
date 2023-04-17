<template>
  <div>
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
                :label="storeRouting.dialog.form ? 'Batal' : 'Tambah'"
                :icon="storeRouting.dialog.form ? 'close' : 'post_add'"
                unelevated
                no-caps
                :color="storeRouting.dialog.form ? 'negative' : 'primary'"
                size="md"
                @click="storeRouting.dialog.form = !storeRouting.dialog.form"
              />
              <q-btn
                label="Muat Ulang"
                dense
                no-caps
                flat
                @click="storemodul.get_modul()"
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
    <div v-auto-animate="{ duration: 200 }" class="q-mb-md">
      <div class="bg-grey-3 q-pa-md radius10" v-if="storeRouting.dialog.form">
        <formulir />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, computed } from "vue";

import { useRefStore } from "stores/ref";
import { useModulStore } from "stores/acl";
import { useModulStoreTable } from "stores/acl";
import { useRoutingStore } from "stores/routing";
const storeRef = useRefStore();
const storemodul = useModulStore();
const storeRouting = useRoutingStore();
const table = useModulStoreTable();
export default defineComponent({
  name: "acl-modul",
  preFetch({ store }) {
    storeRef.header.title = "Halaman Routing";
    storeRef.header.subtitle = "Informasi Alur Berkas Berjalan";
    storemodul.get_modul();
  },
  components: {
    formulir: defineAsyncComponent(() => import("./form.vue")),
  },

  setup() {
    return {
      storeRef,
      storemodul,
      columns,
      storeRouting,
      table,
    };
  },
});
</script>
<style scoope>
.tableChild {
  width: 100%;
  border: 1px solid #dfdfdf;
  margin: 0;
  padding: 0;
}
</style>
