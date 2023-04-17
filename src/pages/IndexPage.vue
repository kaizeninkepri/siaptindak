
<script>
import { defineComponent, defineAsyncComponent, reactive, ref } from 'vue'
export default defineComponent({
  name: 'IndexPage',
  components: {
    // BarcodePage: defineAsyncComponent(() => import("./scanner/index.vue")),
    dashboardPage: defineAsyncComponent(() => import("./dashboard/dashboard.vue")),
    // rekapPage: defineAsyncComponent(() => import("./dashboard/rekap.vue")),
    // mappingPage: defineAsyncComponent(() => import("./dashboard/mapping.vue")),
    // sptSliderPage: defineAsyncComponent(() => import("./dashboard/sptSlider.vue")),
    // NotificationPage: defineAsyncComponent(() => import("./notification/index.vue")),
    NotificationMobilePage: defineAsyncComponent(() => import("./notification/mobile.vue")),
    PageProfile: defineAsyncComponent(() => import("./dashboard/profile.vue")),
    PageSpt: defineAsyncComponent(() => import("./spt/spt.vue")),
    PageMap: defineAsyncComponent(() => import("./mapping/mobile.vue")),

  },
  setup() {
    const tab = ref('home')
    return {
      tab,
      refresh() {
        location.reload()
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
  <q-page>
    <q-pull-to-refresh @refresh="refresh">
      <div>
        <NotificationMobilePage class="mobile-only" />
        <!--              <NotificationPage class="desktop-only" /> -->
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel class="q-pa-none" name="home">

            <dashboardPage />
            <!-- <sptSliderPage /> -->
          </q-tab-panel>
          <q-tab-panel class="q-pa-none" name="profile">
            <PageProfile />
          </q-tab-panel>
          <q-tab-panel class="q-pa-none" name="spt">
            <PageSpt />
          </q-tab-panel>
          <q-tab-panel class="q-pa-none" name="map">
            <PageMap />
          </q-tab-panel>
        </q-tab-panels>




      </div>
    </q-pull-to-refresh>
  </q-page>
</template>
