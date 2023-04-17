<script>
import { defineComponent, reactive, computed } from 'vue'
import { useQuasar } from 'quasar';
import { api } from "boot/axios";
import { useAuthStore } from "stores/auth";

const storeAuth = useAuthStore()
export default defineComponent({
  name: 'notification-index',
  setup() {
    const q = useQuasar();
    const state = reactive({
      showNotificationsBanner: true,
      serviceWorkerSupported: computed(() => {
        if ('serviceWorker' in navigator) return true
        return false
      }),
      pushNotificationsSupported: computed(() => {
        if ('PushManager' in window) return true
        return false
      })

    })

    const neverShowNotificationsBanner = () => {
      state.showNotificationsBanner = false
      q.localStorage.set('neverShowNotificationsBanner', true)
    }
    const checkForExistingPushSubscription = () => {
      if (state.serviceWorkerSupported && state.pushNotificationsSupported) {
        let reg
        navigator.serviceWorker.ready.then(swreg => {
          reg = swreg
          return swreg.pushManager.getSubscription()
        }).then(sub => {
          if (!sub) {
            createPushSubscription(reg)
          }
        })
      }
    }
    const enableNotifications = () => {
      console.log(state.pushNotificationsSupported)
      if (state.pushNotificationsSupported) {
        Notification.requestPermission(result => {
          console.log('result: ', result)
          neverShowNotificationsBanner()
          if (result == 'granted') {
            // this.displayGrantedNotification()
            checkForExistingPushSubscription()
          }
        })
      }
    }

    const displayGrantedNotification = () => {

      if (state.serviceWorkerSupported && state.pushNotificationsSupported) {
        navigator.serviceWorker.ready.then(swreg => {
          swreg.showNotification("You're subscribed to notifications!", {
            body: 'Thanks for subscribing!',
            icon: '/icons/icon-128x128.png',
            image: '/icons/icon-128x128.png',
            badge: '/icons/icon-128x128.png',
            dir: 'ltr',
            lang: 'en-US',
            vibrate: [100, 50, 200],
            tag: 'confirm-notification',
            renotify: true,
          })
        })
      }
    }


    const urlBase64ToUint8Array = (base64String) => {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    const createPushSubscription = (reg) => {
      let vapidPublicKey = 'BK0MXQSsSTkLRsmGe4JxPNkA3jo9BTzlzeYl7IZ64L3YzlZuZwGBR5BfmoKNihcuLtNWiJTpFqLaf7O55aFF-vU'
      let vapidPublicKeyConverted = urlBase64ToUint8Array(vapidPublicKey)
      reg.pushManager.subscribe({
        applicationServerKey: vapidPublicKeyConverted,
        userVisibleOnly: true
      }).then(newSub => {

        let newSubData = newSub.toJSON()
        api.post('/notification', {
          type: 'subscription',
          data: newSubData,
          id: storeAuth.active.id
        })
        //   newSubDataQS = qs.stringify(newSubData)
        // return this.$axios.post(`${process.env.API}/createSubscription?${newSubDataQS}`)
      }).then(response => {
        displayGrantedNotification()
      }).catch(err => {
        console.log('err: ', err)
      })
    }
    return {
      state,
      neverShowNotificationsBanner,
      checkForExistingPushSubscription,
      enableNotifications,

    }
  }
})
</script>
<template>
  <div>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="banner-container bg-primary">
        <div class="constrain">
          <q-banner class="bg-grey-3 q-mb-md">
            <template v-slot:avatar>
              <q-icon name="eva-bell-outline" color="primary" />
            </template>

            Would you like to enable notifications?

            <template v-slot:action>
              <q-btn @click="enableNotifications" label="Yes" color="primary" class="q-px-sm" dense flat />
              <q-btn @click="state.showNotificationsBanner = false" label="Later" color="primary" class="q-px-sm" dense
                flat />
              <q-btn @click="neverShowNotificationsBanner" label="Never" color="primary" class="q-px-sm" dense flat />
            </template>
          </q-banner>
        </div>
      </div>
    </transition>
  </div>
</template>
