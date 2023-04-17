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
  name: 'dashboard-index',
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
  <div>
    <div class="dashboard-bg q-pa-md">
      <q-item class="text-white" style="margin-left:-13px">
        <q-item-section avatar>
          <q-avatar class="shadow-4">
            <q-img src="/images/profile_1.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-bold">{{ user.nama }}</q-item-label>
          <q-item-label caption class="text-white">{{ user.email }}</q-item-label>
        </q-item-section>
      </q-item>
      <section class="q-mt-md">
        <q-virtual-scroll :items="heavyList" virtual-scroll-horizontal v-slot="{ item, index }"
          @virtual-scroll="scrollFn">
          <div :key="index"
            :class="[sptActive == index ? 'q-pa-sm bg-white text-black card-anim' : 'q-pa-sm self-center bg-grey-2 text-black', 'q-mr-sm radius10 shadow-4 q-mb-md']">
            <q-item style="margin-left: -13px;">
              <q-item-section>
                <p class="text-caption q-mb-sm">
                  <q-icon name="snippet_folder" class="q-mr-sm" size="sm" color="orange-8" /> Surat Perintah Tugas
                </p>
                <p class="text-weight-bold q-mb-sm">Nomor Surat {{ item.label }}</p>
              </q-item-section>
              <q-item-section side>
                <q-circular-progress :value="70" show-value font-size="12px" size="40px" :thickness="0.3" color="amber-9"
                  track-color="grey-3" center-color="teal-7" class="text-white" />
              </q-item-section>
            </q-item>
            <p class="text-caption">
              <q-icon name="location_on" class="q-mr-sm" size="sm" color="red-5" /> Surat Perintah Tugas
            </p>
          </div>

        </q-virtual-scroll>
      </section>

    </div>
  </div>
</template>
<style scoped>
.card-anim {
  padding: 20px 15px 20px 15px;
}
</style>
