<template>
  <q-layout view="lHh Lpr lFf">
    <headerPage />
    <sidebarPage />
    <q-page-container>
      <!-- <notificationPage /> -->
      <router-view />
    </q-page-container>
    <q-footer class="q-pa-sm bg-white mobile-only" style="z-index:1  !important">
      <div class="bg-primary radius10 shadow-4" style=" z-index:1 !important; position: relative;">
        <q-tabs class="text-white" style="z-index:1  !important; position: relative;">
          <q-route-tab name="home" :to="{ name: 'beranda' }">
            <q-icon name="home" size="md" />
          </q-route-tab>
          <q-route-tab name="map" @click="storeNotification.dialogMap = true">
            <q-icon name="map" size="md" />
          </q-route-tab>
          <q-tab name="alarms" class="qrCodeClass1">
          </q-tab>
          <q-route-tab name="spt" :to="{ name: 'spt' }">
            <q-icon name="snippet_folder" size="md" class="q-mr-md" />
          </q-route-tab>
          <q-route-tab name="profile" :to="{ name: 'users-profile' }">
            <q-icon name="account_circle" size="md" />
          </q-route-tab>
        </q-tabs>
        <q-btn @click="scanBarcode" round icon="qr_code_scanner" color="blue-8" size="lg" class="qrCodeIcon" />
      </div>
    </q-footer>
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
              <formulirSpt />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="storeNotification.dialog" persistent transition-show="slide-left" transition-hide="slide-right"
      :maximized="true">
      <q-card>
        <q-bar class="bg-primary text-white q-pa-md">
          <q-btn dense flat icon="arrow_back" label="Kembali" @click="storeNotification.dialog = false">
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="row justify-center">
            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <notifPage />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="storeNotification.dialogMap" persistent transition-show="slide-left" transition-hide="slide-right"
      :maximized="true">
      <q-card>
        <q-bar class="bg-primary text-white q-pa-md">
          <q-btn dense flat icon="arrow_back" label="Kembali" @click="storeNotification.dialogMap = false">
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <PageMap />
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { defineComponent, ref, defineAsyncComponent } from "vue";
import { useRefStore } from "stores/ref";
import { useAuthStore } from "stores/auth";
import { useSptStore } from "stores/spt";
import { useNotificationStore } from "stores/notification";
const storeRef = useRefStore();
const storeAuth = useAuthStore();
const storeSpt = useSptStore();
const storeNotification = useNotificationStore();

export default defineComponent({
  name: "MainLayout",

  components: {
    headerPage: defineAsyncComponent(() => import("./header.vue")),
    sidebarPage: defineAsyncComponent(() => import("./sidebar.vue")),
    formulirSpt: defineAsyncComponent(() => import("./../pages/spt/form.vue")),
    notifPage: defineAsyncComponent(() => import("../pages/notification/data.vue")),
    PageMap: defineAsyncComponent(() => import("../pages/mapping/mobile.vue")),
    // notificationPage: defineAsyncComponent(() => import("../pages/notification/index.vue")),
  },
  preFetch() {
    storeAuth.set_sidebar();
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const tab = ref('home')
    return {
      storeRef,
      storeAuth,
      storeSpt,
      leftDrawerOpen,
      tab,
      storeNotification,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
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
    };
  },
});
</script>
<style>
.body--light {
  background-color: #f7f7f7 !important;
  background-image: null !important;
}

.qrCodeClass {
  position: absolute;
  height: 100px;
  z-index: 1 !important;
}

.qrCodeIcon {
  position: absolute;
  bottom: 10px;
  left: 42%;
  right: 50%;
  z-index: 999 !important;
}
</style>
