<template>
  <div class="q-pa-md">
    <div class="row justify-between">
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
        <div class="text-h6">{{ storeRef.header.title }}</div>
        <p class="text-caption">{{ storeRef.header.subtitle }}</p>
      </div>

      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <div class="row justify-end q-col-gutter-sm">
          <div class="col-lg-5 col-md-5 col-xs-12 col-sm-12 content-center flex">
            <div class="q-gutter-sm">
              <q-btn
                label="Tambah"
                icon="post_add"
                unelevated
                no-caps
                color="primary"
                size="md"
                class="radius10"
                :to="{ name: 'users-form' }"
              />
              <q-btn
                label="Muat Ulang"
                dense
                no-caps
                flat
                color="orange-8"
                icon="refresh"
                @click="storeUsers.get_users()"
              />
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
            <q-input label="Pencarian" dense filled v-model="storeUsers.search" />
          </div>
        </div>
      </div>
    </div>
    <q-table
      class="q-mt-md"
      :rows="storeUsers.rows"
      :columns="storeUsers.columns"
      row-key="name"
      :loading="storeUsers.loading.table"
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
                :color="col.value == true ? 'positive' : 'red-5'"
                :label="col.value == true ? 'Aktif' : 'Tidak Aktif'"
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
                icon="delete"
                size="sm"
                unelevated
                color="red-5"
                @click="storeUsers.set_delete(props.row.index, props.row.id)"
              >
                <q-tooltip>Delete Data</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </q-tr>
      </template></q-table
    >
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
  name: "users-data",
  preFetch({ store }) {
    storeRef.header.title = "Halaman Pengguna";
    storeRef.header.subtitle = "Informasi Data Pengguna Aplikasi";
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
