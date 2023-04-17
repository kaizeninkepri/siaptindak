<template>
  <div>
    <div class="text-subtitle2 q-mb-md">Formulir Penambahan Data Modul</div>
    <div class="row q-col-gutter-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-input
          dense
          filled
          v-model="storeRoles.form.nama"
          label="Nama Roles"
          :disable="storeRoles.loading.form"
        />
      </div>

      <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <div class="q-gutters-sm">
          <q-checkbox
            v-model="storeRoles.form.is_active"
            label="Aktif"
            val="storemodul.form.is_active"
          />
        </div>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <q-btn
          label="Simpan"
          color="positive"
          unelevated
          size="sm"
          icon="bookmark_add"
          :loading="storeRoles.loading.form"
          @click="storeRoles.set_permission()"
        />
      </div>
    </div>
    <div class="q-pa-md bg-grey-3 radius10 q-mt-md">
      <p class="text-weight-bold">Permission Hak Akses Pengguna</p>
      <q-separator />
      <ul>
        <li v-for="(i, index) in storeRoles.permission" :key="index">
          <div class="row">
            <div class="col-lg-7 col-md-7 col-xs-12 col-sm-12">
              <q-icon :name="i.icon" size="sm" class="q-mr-md" />
              {{ i.nama }}
            </div>
            <div class="col-lg-5 col-md-5 col-xs-12 col-sm-12">
              <div class="q-gutter-sm">
                <q-checkbox v-model="i.permission.create" label="Created" />
                <q-checkbox v-model="i.permission.read" label="Read" />
                <q-checkbox v-model="i.permission.update" label="Update" />
                <q-checkbox v-model="i.permission.delete" label="Delete" />
              </div>
            </div>
          </div>
          <ul>
            <li v-for="(c, cIndex) in i.child" :key="cIndex">
              <div class="row">
                <div class="col-lg-7 col-md-7 col-xs-12 col-sm-12">{{ c.nama }}</div>
                <div
                  class="col-lg-5 col-md-5 col-xs-12 col-sm-12"
                  style="margin-left: -17px"
                >
                  <div class="q-gutter-sm">
                    <q-checkbox
                      keep-color
                      color="blue-4"
                      v-model="c.permission.create"
                      label="Created"
                    />
                    <q-checkbox
                      keep-color
                      color="blue-4"
                      v-model="c.permission.read"
                      label="Read"
                    />
                    <q-checkbox
                      keep-color
                      color="blue-4"
                      v-model="c.permission.update"
                      label="Update"
                    />
                    <q-checkbox
                      keep-color
                      color="blue-4"
                      v-model="c.permission.delete"
                      label="Delete"
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <q-inner-loading
      :showing="storeRoles.loading.form"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRefStore } from "stores/ref";
import { useModulStore } from "stores/acl";
import { useRolesStore } from "stores/acl";
import { useRoute } from "vue-router";
const storeRef = useRefStore();
const storemodul = useModulStore();
const storeRoles = useRolesStore();
const route = useRoute();

export default defineComponent({
  name: "acl-modul-form",
  preFetch({ store, currentRoute }) {
    storeRef.header.title = "Halaman Modul";
    storeRef.header.subtitle = "Informasi Data Modul Access Control List Pengguna";

    if (currentRoute.query._v) {
      storeRoles.form.role_id = currentRoute.query._v;
      console.log(currentRoute.query._v);
      storeRoles.get_permission();
    } else {
      storeRoles.get_permission();
    }
  },
  setup() {
    return {
      storeRef,
      storemodul,
      storeRoles,
    };
  },
});
</script>
