<template>
  <div class="q-pa-sm">
    <div class="row justify-between">
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
        <div class="text-h6">{{ storeRef.header.title }}</div>
        <p class="text-caption">{{ storeRef.header.subtitle }}</p>
      </div>

      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12 desktop-only">
        <div class="row justify-end q-col-gutter-sm">
          <div class="col-lg-5 col-md-5 col-xs-12 col-sm-12 content-center flex">
            <div class="q-gutter-sm">
              <q-btn v-for="(i, index) in storeRouting.rows" :key="index" :label="'Tambah ' + i.nama" icon="post_add"
                unelevated no-caps color="primary" size="md" class="radius10" @click="
                  (storeSpt.onDialogAdd = true),
                  (storeSpt.headerTittle = 'Formulir Pembuatan ' + i.nama),
                  (storeSpt.spt.routing_id = i.routing_id)
                " />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="q-mt-md">
      <tablePage />
    </div>
  </div>
  <q-dialog v-model="storeSpt.onDialogAdd" persistent transition-show="slide-left" transition-hide="slide-right"
    :maximized="true">
    <q-card>
      <q-bar class="bg-primary text-white q-pa-md">
        <q-btn dense flat icon="arrow_back" label="Kembali" @click="storeSpt.BackToSptData()">
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row justify-center">
          <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <formulir />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, defineAsyncComponent } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useAuthStore } from "stores/auth";
import { useRefStore } from "stores/ref";
import { useUsersStore } from "stores/users";
import { usePegawaiStore } from "stores/pegawai";
import { useRoutingStore } from "stores/routing";
import { useSptStore } from "stores/spt";

const storeAuth = useAuthStore();
const storeRef = useRefStore();
const storeUsers = useUsersStore();
const storeRouting = useRoutingStore();
const storeSpt = useSptStore();

export default defineComponent({
  name: "users-data",
  preFetch({ store }) {
    storeRef.header.title = "Surat Perintah Tugas";
    storeRef.header.subtitle = "Informasi Alur Surat Perintah Tugas Berbasis Elektronik dimonitoring secara Real-Time";
    storeRouting.get_routing();
  },
  components: {
    formulir: defineAsyncComponent(() => import("./form.vue")),
    tablePage: defineAsyncComponent(() => import("./table.vue")),
  },
  setup() {
    onBeforeRouteLeave(async (to, from, next) => {
      // only fetch the user if the id changed as maybe only the query or the hash changed
      if (storeSpt.onDialogAdd) {
        storeSpt.onDialogAdd = false;
        storeSpt.BackToSptData();

        return;
      }
      next();
    });
    return {
      storeAuth,
      storeRef,
      storeUsers,
      storeRouting,
      storeSpt,
    };
  },
});
</script>
