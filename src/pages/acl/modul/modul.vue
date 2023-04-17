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
                :label="storemodul.dialog.form ? 'Batal' : 'Tambah'"
                :icon="storemodul.dialog.form ? 'close' : 'post_add'"
                unelevated
                no-caps
                :color="storemodul.dialog.form ? 'negative' : 'primary'"
                size="md"
                @click="storemodul.dialog.form = !storemodul.dialog.form"
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
      <div class="bg-grey-3 q-pa-md radius10" v-if="storemodul.dialog.form">
        <formulir />
      </div>
      <div class="bg-grey-3 q-pa-md radius10" v-if="storemodul.dialog.formChild">
        <child />
      </div>
    </div>
    <q-table
      :rows="table.rows"
      :columns="table.columns"
      row-key="modul_id"
      :loading="table.isLoading"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th />
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              flat
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'expand_less' : 'expand_more'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div v-if="col.name == 'icon'">
              <q-icon :name="col.value" size="md" />
            </div>
            <div v-else-if="col.name == 'is_active'">
              <q-badge
                :color="col.value == 'true' ? 'positive' : 'red-5'"
                :label="col.value == 'true' ? 'Aktif' : 'Tidak Aktif'"
                size="md"
              />
            </div>
            <div v-else>
              {{ col.value }}
            </div>
          </q-td>
          <q-td width="80">
            <div class="q-gutter-sm">
              <q-btn
                icon="drive_file_rename_outline"
                size="sm"
                unelevated
                color="orange-4"
                @click="toUpdate(props.row)"
              >
                <q-tooltip>Edit Data</q-tooltip>
              </q-btn>
              <q-btn
                @click="storemodul.set_delete_modul(props.row.index, props.row.modul_id)"
                icon="delete"
                size="sm"
                unelevated
                color="red-5"
              >
                <q-tooltip>Edit Data</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%" class="bg-grey-2">
            <div class="text-left q-pl-xl">
              <table class="tableChild" v-if="props.row.child.length">
                <tr v-for="(i, index) in props.row.child" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ i.nama }}</td>
                  <td><q-icon :name="i.icon" size="md" /></td>
                  <td>{{ i.route_name }}</td>
                  <td>{{ i.route_url }}</td>
                  <td>
                    <q-badge
                      :color="i.is_active == true ? 'positive' : 'red-5'"
                      :label="i.is_active == true ? 'Aktif' : 'Tidak Aktif'"
                      size="md"
                    />
                  </td>
                  <q-td width="80">
                    <div class="q-gutter-sm">
                      <q-btn
                        icon="drive_file_rename_outline"
                        size="sm"
                        unelevated
                        color="orange-4"
                        @click="toUpdateChild(i)"
                      >
                        <q-tooltip>Edit Data</q-tooltip>
                      </q-btn>
                      <q-btn
                        @click="
                          storemodul.set_delete_modul_child(index, i.modul_child_id)
                        "
                        icon="delete"
                        size="sm"
                        unelevated
                        color="red-5"
                      >
                        <q-tooltip>Edit Data</q-tooltip>
                      </q-btn>
                    </div>
                  </q-td>
                </tr>
              </table>
              <q-btn
                label="Tambah Child"
                color="primary"
                no-caps
                outline
                class="full-width"
                @click="storemodul.dialog.formChild = true"
              />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { vAutoAnimate } from "@formkit/auto-animate";

const toUpdate = (value) => {
  storemodul.dialog.form = true;
  storemodul.form = value;
};
const toUpdateChild = (value) => {
  storemodul.dialog.formChild = true;
  storemodul.child = value;
};
</script>

<script>
import { defineComponent, defineAsyncComponent, computed } from "vue";

import { useRefStore } from "stores/ref";
import { useModulStore } from "stores/acl";
import { useModulStoreTable } from "stores/acl";
const storeRef = useRefStore();
const storemodul = useModulStore();
const table = useModulStoreTable();
export default defineComponent({
  name: "acl-modul",
  preFetch({ store }) {
    storeRef.header.title = "Halaman Modul";
    storeRef.header.subtitle = "Informasi Data Modul Access Control List Pengguna";
    storemodul.get_modul();
  },
  components: {
    formulir: defineAsyncComponent(() => import("./form.vue")),
    child: defineAsyncComponent(() => import("./form_child.vue")),
  },

  setup() {
    return {
      storeRef,
      storemodul,
      columns,
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
