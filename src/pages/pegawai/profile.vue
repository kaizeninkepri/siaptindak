<template>
  <div>
    <q-form ref="myForm">
      <div class="row">
        <div class="col-lg-9 col-md-9 col-xs-12 col-sm-12 q-pa-md">
          <div class="row q-col-gutter-md q-mt-md">
            <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12">
              <q-img class="radius10" src="/images/profile_1.png" />
            </div>
            <div class="col-lg-9 col-md-9 col-xs-12 col-sm-12" v-if="storeUser.profile.devisi">
              <q-badge :label="storeUser.profile.role.nama" size="sm" />
              <div class="text-h4 text-weight-bold">{{ storeUser.profile.name }}</div>
              <div class="row">
                <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                  <p class="text-weight-medium q-mb-none">
                    <span class="text-caption text-weight-medium text-blue-grey-8">Nomor Identitas :
                    </span>
                    {{ storeUser.profile.identitas_no }} ({{
                      storeUser.profile.identitas_type
                    }})
                  </p>
                  <p class="text-weight-medium q-mb-none">
                    <span class="text-caption text-weight-medium text-blue-grey-8">Email :
                    </span>
                    {{ storeUser.profile.email }}
                  </p>
                </div>
              </div>
              <div class="row" v-if="storeUser.profile.devisi">
                <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                  <span class="text-caption text-weight-medium text-blue-grey-8">Bagian</span>
                  <p class="text-weight-medium">{{ storeUser.profile.devisi.nama }}</p>
                </div>
                <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                  <span class="text-caption text-weight-medium text-blue-grey-8">Sub bagian</span>
                  <p class="text-weight-medium">
                    {{ storeUser.profile.devisisub.nama }}
                  </p>
                </div>
              </div>
              <q-btn label="Ganti Password" icon="lock" outline size="sm" color="primary" class="radius10"
                @click="storeUser.dialog.changePassword = true" />
            </div>
          </div>
        </div>
        <div class="col-lg-9 bg-grey-3 col-md-3 col-xs-12 col-sm-12 radius10"></div>
      </div>
    </q-form>
    <q-dialog v-model="storeUser.dialog.changePassword" persistent>
      <q-card style="width: 300px; border-radius: 10px">
        <q-form ref="myFormPassword">
          <q-card-section>
            <div class="text-subtitle2 text-black">Pergantian password akun</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input label="Password baru" filled dense :type="state.password.new ? 'password' : 'text'"
              v-model="storeUser.password.new" :disable="storeUser.loading.form" :rules="[
                (val) => (val !== null && val !== '') || 'Tidak Boleh Kosong',
                (val) => val.length >= 6 || 'Minimal 6 Karakter',
              ]">
              <template v-slot:append>
                <q-icon :name="state.password.new ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="state.password.new = !state.password.new" />
              </template>
            </q-input>
            <q-input label="Konfirmasi Password" filled dense :type="state.password.confirm ? 'password' : 'text'"
              v-model="storeUser.password.confirm" :disable="storeUser.loading.form" :rules="[
                (val) => (val !== null && val !== '') || 'Tidak Boleh Kosong',
                (val) => val == storeUser.password.new || 'password Tidak Sama',
              ]">
              <template v-slot:append>
                <q-icon :name="state.password.confirm ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="state.password.confirm = !state.password.confirm" />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="batal" color="grey-8" v-close-popup />
            <q-btn label="Simpan" color="primary" unelevated class="radius10" @click="onChangePassword" />
          </q-card-actions>
          <q-inner-loading :showing="storeUser.loading.form" label="Memproses data .." label-class="text-negative"
            label-style="font-size: 1.1em" />
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, computed, ref, onBeforeMount, reactive } from "vue";
import { useRefStore } from "stores/ref";
import { useUsersStore } from "stores/users";
import { useAuthStore } from "stores/auth";
import { useRoute } from "vue-router";
const storeRef = useRefStore();
const storeUser = useUsersStore();
const storeAuth = useAuthStore();
const route = useRoute();

export default defineComponent({
  name: "users-form",
  // preFetch({ store, currentRoute }) {
  //   storeUser.get_user();
  // },
  setup() {
    const myForm = ref(null);
    const myFormPassword = ref(null);
    const state = reactive({
      password: {
        new: true,
        confirm: true,
      },
    });
    const devisiSub = computed(() =>
      storeRef.devisi.filter((e) => e.devisi_id == storeUser.form.devisi_id)
    );
    onBeforeMount(() => {
      console.log('data profile')
      storeUser.get_user();

    })

    return {
      storeRef,
      storeUser,
      storeAuth,
      devisiSub,
      myForm,
      state,
      myFormPassword,
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
      onChangePassword() {
        myFormPassword.value.validate().then((success) => {
          if (success) {
            storeUser.set_ChangePassword();
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
