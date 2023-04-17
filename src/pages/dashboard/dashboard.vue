<script>
import { defineComponent, defineAsyncComponent, reactive, ref, computed } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useSptStore } from "stores/spt";
import { useNotificationStore } from "stores/notification";
const maxSize = 10000
const heavyList = []

for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: 'Option ' + (i + 1),
    class: i === 0 ? 'q-pa-md bg-white text-black' : 'q-pa-sm self-center bg-grey-2 text-black'
  })
}
const storeAuth = useAuthStore()
const storeSpt = useSptStore();
const storeNotification = useNotificationStore();
export default defineComponent({
  name: 'dashboard-index',
  components: {
    sptSliderPage: defineAsyncComponent(() => import("./sptSlider.vue")),
  },
  setup() {

    const tab = ref('mails')
    const sptActive = ref(0)
    const user = computed(() => storeAuth.active)
    return {
      tab,
      heavyList,
      user,
      sptActive,
      storeSpt,
      storeNotification,
      scrollFn(index, from, to) {
        sptActive.value = index.index
      },
      scanBarcode() {
        cordova.plugins.barcodeScanner.scan(
          function (result) {
            alert("We got a barcode\n" +
              "Result: " + result.text + "\n" +
              "Format: " + result.format + "\n" +
              "Cancelled: " + result.cancelled);
          },
          function (error) {
            alert("Scanning failed: " + error);
          },
          {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: false, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: false, // Android, save scan history (default false)
            prompt: "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 300, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: true, // iOS
            disableSuccessBeep: true // iOS and Android
          }
        );
      },

    }
  }
})
</script>
<template>
  <div>
    <div class="q-pl-md q-pr-md">
      <q-item style="margin-left:-13px" class="q-mb-md">
        <q-item-section>

          <q-item-label caption class="text-grey-8">Selamat Datang</q-item-label>
          <q-item-label class="text-weight-bold h6">{{ user.nama }}</q-item-label>
        </q-item-section>
        <q-item-section side style="position: absolute; right: 0;">
          <div class="q-gutter-sm">
            <q-btn round unelevated icon="qr_code_scanner" size="12px" color="grey-3" text-color="black"
              @click="scanBarcode" />
            <q-btn round unelevated icon="notifications" size="12px" color="grey-3" text-color="black"
              @click="storeNotification.dialog = true" />
            <q-btn round unelevated icon="manage_accounts" size="12px" color="grey-3" text-color="black"
              :to="{ name: 'users-profile' }" />
          </div>
        </q-item-section>
      </q-item>

      <sptSliderPage />
    </div>
    <!-- MENU  -->
    <section class="q-pa-md">
      <p class="text-weight-bold">Menu Surat Perintah Tugas</p>
      <div class="row q-col-gutter-sm">
        <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
          <q-btn class="text-center" flat padding="0px" @click="(storeSpt.onDialogAdd = true),
            (storeSpt.headerTittle = 'Formulir Pembuatan  Surat Perintah Tugas'),
            (storeSpt.spt.routing_id = 1)">
            <q-img src="/images/icon_spt.png" width="50px" />
            <p class="q-mb-none q-mt-sm text-caption">Formulir</p>
          </q-btn>
        </div>
        <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
          <q-btn flat class="text-center" :to="{ name: 'spt' }" padding="0px">
            <q-img src="/images/folder.png" width="59px" />
            <p class="q-mb-none q-mt-none text-caption">Data</p>
          </q-btn>
        </div>
        <!-- <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
              <div class="text-center">
                <q-img src="/images/reflection.png" width="50px" />
                <p class="q-mb-none q-mt-sm text-caption">Statistik</p>
              </div>
            </div> -->
      </div>
      <p class="text-weight-bold q-mt-md">Menu Laporan</p>
      <div class="row q-col-gutter-sm">
        <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
          <q-btn flat class="text-center" padding="0px" :to="{ name: 'laporan-harian-form' }">
            <q-img src="/images/note.png" width="50px" />
            <p class="q-mb-none q-mt-none text-caption">Harian</p>
          </q-btn>
        </div>
        <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
          <q-btn flat class="text-center" padding="0px" :to="{ name: 'laporan-kejadian-form' }">
            <q-img src="/images/briefcase.png" width="50px" />
            <p class="q-mb-none q-mt-none text-caption">Kejadian</p>
          </q-btn>
        </div>
        <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
          <q-btn flat class="text-center" padding="0px" :to="{ name: 'laporan-informasi-form' }">
            <q-img src="/images/agenda.png" width="50px" />
            <p class="q-mb-none q-mt-none text-caption">Informasi</p>
          </q-btn>
        </div>
        <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
          <q-btn flat class="text-center" padding="0px" @click="storeNotification.dialogMap = true">
            <q-img src="/images/maps.png" width="55px" />
            <p class="q-mb-none q-mt-none text-caption">Maps</p>
          </q-btn>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.card-anim {
  padding: 20px 15px 20px 15px;
}
</style>
