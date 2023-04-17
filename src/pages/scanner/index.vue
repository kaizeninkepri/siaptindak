<script>
import { defineComponent, reactive, computed, ref } from 'vue'
import { useQuasar } from 'quasar';
import { api } from "boot/axios";
import { useAuthStore } from "stores/auth";

const storeAuth = useAuthStore()
export default defineComponent({
  name: 'barcode-index',
  setup() {
    const token = ref('andi')
    const getToken = () => {
      token.value = "yuni"
      cordova.plugins.firebase.messaging.getToken().then((e) => {
        token.value = e
        console.log(e)
      });

    }
    return {
      getToken,
      token
    }
  },
  methods: {
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

    getDataImage() {
      console.log('a')
      navigator.camera.getPicture(onSuccess, onFail, { quality: 100, correctOrientation: true });
      function onSuccess(imageData) {
        textocr.recText(0, /*3,*/ imageData, onSuccess, onFail); // removed returnType (here 3) from version 2.0.0
        // for sourceType Use 0,1,2,3 or 4
        // for returnType Use 0,1,2 or 3 // 3 returns duplicates[see table]
        function onSuccess(recognizedText) {
          //var element = document.getElementById('pp');
          //element.innerHTML=recognizedText;
          //Use above two lines to show recognizedText in html
          console.log(recognizedText);
          alert(recognizedText);
        }
        function onFail(message) {
          alert('Failed because: ' + message);
        }
      }
      function onFail(message) {
        alert('Failed because: ' + message);
      }
    }
  }
})
</script>
<template>
  <div>
    <q-btn label="Scan QrCode" @click="scanBarcode" />
    <q-btn label="Scan Data" @click="getDataImage" />
    <q-btn label="Token Firebase" @click="getToken" />
    <pre>{{ token }}</pre>
  </div>
</template>
