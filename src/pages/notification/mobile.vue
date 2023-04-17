<script>
import { defineComponent, reactive, computed } from 'vue'
import { useQuasar } from 'quasar';
import { api } from "boot/axios";
import { useAuthStore } from "stores/auth";

const storeAuth = useAuthStore();
export default defineComponent({
  name: 'notification-mobile',
  setup() {
    const q = useQuasar();
    const isNotificationEnabled = q.localStorage.getItem('isTokenMobile')
    const enableNotifications = () => {
      cordova.plugins.firebase.messaging.getToken().then((e) => {
        console.log(e)
        storeAuth.setAuthToken(e, storeAuth.active.id)
        q.localStorage.set('isTokenMobile', true)
        isNotificationEnabled = true
      });

    }
    return {
      enableNotifications,
      isNotificationEnabled,
      disableNotifications() {
        q.localStorage.remove('isTokenMobile')
      }
    }
  }
})
</script>
<template>
  <div>
    <!-- <q-btn label="Delete" @click="disableNotifications" /> -->
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="banner-container bg-primary">
        <div class="constrain">
          <q-banner class="bg-grey-3 q-mb-md" v-if="isNotificationEnabled == null ? true : false">
            <template v-slot:avatar>
              <q-avatar>
                <q-img src="/images/logo_login.png" />
              </q-avatar>
            </template>

            Aktifkan Fitur Notifikasi Untuk Mendapatkan Informasi Terbaru ?

            <template v-slot:action>
              <q-btn @click="enableNotifications" label="Yes" color="primary" class="q-px-sm" dense flat />
            </template>
          </q-banner>
        </div>
      </div>
    </transition>
  </div>
</template>
