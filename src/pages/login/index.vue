<template>
  <q-page class="flex flex-center body-light-2">
    <div class="q-pa-lg text-tulang bg1">
      <div class="text-center text-weight-bold">
        <q-img src="/images/logo_login.png" width="40%" />
        <h6 class="q-mb-xs q-mt-sm text-shadow">SIAP TINDAK</h6>
        <p class="text-shadow1">Satuan Polisi Pamong Peraja Kota Tanjungpinang</p>
      </div>
      <!-- <div class="text-h6 q-mb-lg">Login to your Dashboard</div> -->
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-lg-5 col-md-7 col-sm-12 col-xs-12">
          <p class="q-mb-sm">Email</p>
          <q-input dense filled bg-color="white" label="username" v-model="storeAuth.username"
            :disable="storeAuth.isLoading" />
        </div>
        <div class="col-lg-4 col-md-7 col-sm-12 col-xs-12">
          <p class="q-mb-sm">password</p>
          <q-input :type="isPwd ? 'password' : 'text'" bg-color="white" dense filled label="password"
            v-model="storeAuth.password" :disable="storeAuth.isLoading">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
        </div>
        <div class="col-lg-5 col-md-7 col-sm-12 col-xs-12">
          <q-btn icon="login" label="Masuk Aplikasi" color="primary" unelevated class="full-width"
            :disable="storeAuth.isLoading" @click="storeAuth.setLogin()" />
        </div>
      </div>
      <div class="row q-col-gutter-sm q-mt-md">
        <div class="col-lg-5 col-md-7 col-sm-12 col-xs-12">
          <q-banner dense inline-actions class="text-black bg-green-2"
            v-if="storeAuth.isLoading || storeAuth.loginInfo.isError">
            <template v-slot:avatar>
              <q-spinner color="primary" size="1.5em" v-if="!storeAuth.loginInfo.isError" />
              <q-icon name="error" color="negative" v-if="storeAuth.loginInfo.isError" />
            </template>
            {{ storeAuth.loginInfo.text }}
          </q-banner>
        </div>
      </div>
    </div>
    <!-- <div style="background: transparent; position: fixed; bottom:0" class="text-black">
      <div class="q-pa-md">
        Copyright © 2022 SATPOL PP Kota Tanjungpinang
      </div>
    </div> -->
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "stores/auth";

export default defineComponent({
  name: "loginPage",
  preFetch() {
    console.log("prfettch");
  },
  setup() {
    const storeAuth = useAuthStore();
    const isPwd = ref(false)
    return {
      storeAuth,
      isPwd
    };
  },
});
</script>
<style>
.body--light1 {
  background: rgb(1, 69, 80);
  background: linear-gradient(180deg, rgba(1, 69, 80, 1) 2%, rgba(221, 230, 232, 1) 100%);

}

.body-light-2 {
  background-image: url("https://siaptindak.siapekprovtpi.web.id/public/vector-all.png");
  background-repeat: no-repeat;
  object-fit: cover;
  background-position: center;
  background-position: 5% 0%;
}

.text-shadow {
  text-shadow: 2px 2px #4e4a4a;
}

.text-shadow1 {
  text-shadow: 1px 1px #4e4a4a;
}

.text-tulang {
  color: #f2f6f7;
}
</style>
