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
                label="Tambah"
                icon="post_add"
                unelevated
                no-caps
                color="primary"
                size="md"
                :to="{ name: 'acl-roles-form' }"
              />
              <q-btn
                label="Muat Ulang"
                dense
                no-caps
                flat
                @click="storeRoles.get_roles()"
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
      :rows="storeRoles.rows"
      :columns="columns"
      row-key="modul_id"
      :loading="storeRoles.loading.table"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th />
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
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
                :to="{ name: 'acl-roles-form', query: { _v: props.row.role_id } }"
              >
                <q-tooltip>Edit Data</q-tooltip>
              </q-btn>
              <q-btn
                icon="delete"
                size="sm"
                unelevated
                color="red-5"
                @click="
                  storeRoles.set_delete_permission(props.row.index, props.row.role_id)
                "
              >
                <q-tooltip>Delete Data</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, computed } from "vue";
import { useRefStore } from "stores/ref";
import { useModulStore } from "stores/acl";
import { useRolesStore } from "stores/acl";
import { useModulStoreTable } from "stores/acl";
const storeRef = useRefStore();
const storemodul = useModulStore();
const storeRoles = useRolesStore();
const table = useModulStoreTable();

const columns = [
  {
    name: "index",
    required: true,
    label: "#",
    align: "left",
    field: (row) => row.index + 1,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nama",
    align: "left",
    label: "Nama Roles",
    field: (row) => row.nama,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "is_active",
    align: "left",
    label: "Aktif",
    field: (row) => row.is_active,
    format: (val) => `${val}`,
    sortable: true,
  },
];

export default defineComponent({
  name: "acl-modul",
  preFetch({ store }) {
    storeRef.header.title = "Halaman Roles";
    storeRef.header.subtitle = "Informasi Data Kategori Hak Akses Pengguna";
    storeRoles.get_roles();
  },

  setup() {
    return {
      storeRef,
      storemodul,
      columns,
      storeRoles,
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
