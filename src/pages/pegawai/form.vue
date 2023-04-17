<template>
  <div>
    <div class="text-subtitle2 q-mb-md">Formulir Penambahan Data Pengguna</div>
    <q-form ref="myForm">
      <div class="q-pa-md bg-grey-3 radius10 q-mt-md">
        <p class="text-weight-bold text-uppercase text-caption q-mb-sm text-blue-grey-10">
          Identitas Pengguna
        </p>
        <div class="row q-col-gutter-sm">
          <div class="col-lg-3 col-md-3 col-sm-7 col-xs-12">
            <q-input
              dense
              outlined
              v-model="storeUser.form.identitas_no"
              label="Nomor Identitas"
              @blur="storeUser.checkingUser('identitas_no', storeUser.form.identitas_no)"
              :rules="[(val) => (val !== null && val !== '') || 'Tidak Boleh Kosong']"
            />
          </div>
          <div class="col-lg-2 col-md-2 col-sm-5 col-xs-12 text-blue-grey-10">
            <q-select
              dense
              outlined
              label="Kategori"
              v-model="storeUser.form.identitas_type"
              :options="['KTP', 'NIP']"
              :rules="[(val) => (val !== null && val !== '') || 'Tidak Boleh Kosong']"
            />
          </div>
        </div>
        <div class="row q-col-gutter-sm q-mt-xs q-mb-md">
          <div class="col-lg-4 col-md-4 col-sm-7 col-xs-12">
            <q-input
              dense
              outlined
              v-model="storeUser.form.name"
              label="Nama Lengkap"
              :rules="[(val) => (val !== null && val !== '') || 'Tidak Boleh Kosong']"
            />
          </div>
          <div class="col-lg-4 col-md-4 col-sm-7 col-xs-12">
            <q-select
              dense
              outlined
              map-options
              option-label="nama"
              option-value="devisi_id"
              emit-value
              v-model="storeUser.form.devisi_id"
              label="Devisi"
              :options="storeRef.devisi"
              :rules="[(val) => (val !== null && val !== '') || 'Tidak Boleh Kosong']"
            />
          </div>
          <div class="col-lg-4 col-md-4 col-sm-7 col-xs-12">
            <q-select
              dense
              outlined
              :options="storeUser.form.devisi_id == null ? [] : devisiSub[0].sub"
              map-options
              option-label="nama"
              option-value="devisi_id"
              v-model="storeUser.form.devisi_sub_id"
              label="Devisi Sub"
              emit-value
              :readonly="!storeUser.form.devisi_id"
              :rules="[(val) => (val !== null && val !== '') || 'Tidak Boleh Kosong']"
            />
          </div>
        </div>

        <p class="text-weight-bold text-uppercase text-caption q-mb-sm">Identitas Akun</p>
        <div class="row q-col-gutter-sm">
          <div class="col-lg-3 col-md-3 col-sm-7 col-xs-12">
            <q-input
              dense
              outlined
              v-model="storeUser.form.email"
              label="Email"
              :autocomplete="false"
              @blur="storeUser.checkingUser('email', storeUser.form.email)"
            />
          </div>
          <div class="col-lg-2 col-md-2 col-sm-5 col-xs-12">
            <q-input
              type="password"
              dense
              outlined
              label="Password"
              autocomplete="new-password"
              v-model="storeUser.form.password"
              :rules="[(val) => (val !== null && val !== '') || 'Tidak Boleh Kosong']"
            />
          </div>
          <div class="col-lg-2 col-md-2 col-sm-5 col-xs-12">
            <q-select
              dense
              outlined
              label="Role"
              v-model="storeUser.form.role_id"
              :options="storeRoles.rows"
              map-options
              emit-value
              option-label="nama"
              option-value="role_id"
              :rules="[(val) => (val !== null && val !== '') || 'Tidak Boleh Kosong']"
            />
          </div>
        </div>

        <div class="row q-col-gutter-sm q-mt-md">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-btn
              label="Simpan"
              icon="bookmark_add"
              unelevated
              color="primary"
              class="radius10"
              @click="onDatabases"
            />
          </div>
        </div>
      </div>
    </q-form>
    <q-inner-loading
      :showing="storeUser.loading.form"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useRefStore } from "stores/ref";
import { useUsersStore } from "stores/users";
import { useRolesStore } from "stores/acl";
import { useRoute } from "vue-router";
const storeRef = useRefStore();
const storeUser = useUsersStore();
const storeRoles = useRolesStore();
const route = useRoute();

export default defineComponent({
  name: "users-form",
  preFetch({ store, currentRoute }) {
    storeRoles.get_roles();
    storeRef.get_devisi();
  },
  setup() {
    const myForm = ref(null);

    const devisiSub = computed(() =>
      storeRef.devisi.filter((e) => e.devisi_id == storeUser.form.devisi_id)
    );

    return {
      storeRef,
      storeUser,
      storeRoles,
      devisiSub,
      myForm,
      onDatabases() {
        myForm.value.validate().then((success) => {
          if (success) {
            storeUser.set_user();
          } else {
            // oh no, user has filled in
            // at least one invalid value
          }
        });
      },
    };
  },
});
</script>
