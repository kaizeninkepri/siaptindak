<script>
import { defineComponent, defineAsyncComponent, reactive, ref, onBeforeMount, computed } from 'vue'
import { useNotificationStore } from "stores/notification";
const storeNotification = useNotificationStore();
export default defineComponent({
  name: 'notification-data',
  setup() {
    onBeforeMount(() => storeNotification.getData())

    const notif = computed(() => storeNotification.data.data)
    return {
      notif,
    }
  }
})
</script>
<template>
  <div>
    <q-item style="margin-left: -14px;">
      <q-item-section avatar top>
        <q-btn unelevated icon="notifications" color="grey-13" class="radius8" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-weight-bold">Data Notifikasi</q-item-label>
        <q-item-label caption>Informasi SPT, Laporan Harian</q-item-label>
      </q-item-section>
    </q-item>
    <q-list bordered class="radius10 q-mt-sm" v-for="(n, nIndex) in notif" :key="nIndex">
      <q-item :to="{ name: 'spt-detail', query: { id: n.spt_id } }">
        <q-item-section>
          <q-item-label>{{ n.content }}</q-item-label>
          <q-item-label caption>{{ n.created_at }}</q-item-label>
        </q-item-section>

      </q-item>

    </q-list>
  </div>
</template>
