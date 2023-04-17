<script>
import { defineComponent, defineAsyncComponent, reactive, ref, computed } from 'vue'
import { useAuthStore } from 'src/stores/auth'
const maxSize = 10000
const heavyList = []

for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: 'Option ' + (i + 1),
    class: i === 0 ? 'q-pa-md bg-white text-black' : 'q-pa-sm self-center bg-grey-2 text-black'
  })
}
const storeAuth = useAuthStore()
export default defineComponent({
  name: 'dashboard-rekap',
  setup() {

    const tab = ref('mails')
    const sptActive = ref(0)
    const user = computed(() => storeAuth.active)
    return {
      tab,
      heavyList,
      user,
      sptActive,
      scrollFn(index, from, to) {
        sptActive.value = index.index
      }
    }
  }
})
</script>
<template>
  <div style="margin-top: 120px;" class="q-pa-md">
    <q-card class="radius10 shadow-4 q-pa-sm card-bg">
      <q-item>
        <q-item-section class="text-center">
          <p class="text-h5 q-mb-none text-white">100</p>
          <p class="text-white">SPT</p>
        </q-item-section>
        <q-item-section class="text-center">
          <p class="text-h5 q-mb-none text-white">100</p>
          <p class="text-white">SPT</p>
        </q-item-section>
        <q-item-section class="text-center">
          <p class="text-h5 q-mb-none text-white">100</p>
          <p class="text-white">SPT</p>
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>
<style scoped>
.card-bg {
  background: rgb(1, 69, 80);
  background: linear-gradient(90deg, rgba(1, 69, 80, 1) 3%, rgba(94, 137, 144, 1) 50%, rgba(25, 200, 153, 1) 92%);
}
</style>
