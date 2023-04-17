<script>
import { defineComponent, defineAsyncComponent, reactive, onMounted, onBeforeMount, ref, computed } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useSptStore } from "stores/spt";
const maxSize = 10000
const heavyList = []

for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: 'Option ' + (i + 1),
    class: i === 0 ? 'q-pa-md bg-white text-black' : 'q-pa-sm self-center bg-grey-2 text-black'
  })
}
const storeSpt = useSptStore();
const storeAuth = useAuthStore()
export default defineComponent({
  name: 'dashboard-index',
  setup() {

    const tab = ref('mails')
    const sptActive = ref(0)
    const user = computed(() => storeAuth.active)
    const isLoading = computed(() => storeSpt.data.isLoading)
    const rows = computed(() => {
      const data = storeSpt.data.data.map((e, index) => {
        e.index = index + 1
        return e
      })
      return data;
    })
    onBeforeMount(() => storeSpt.getData());
    return {
      tab,
      heavyList,
      user,
      rows,
      isLoading,
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
    <div class="q-pa-md" v-if="isLoading">
      <q-card style="max-width: 300px">
        <q-skeleton height="140px" square />
      </q-card>
    </div>
    <section>
      <q-virtual-scroll :items="rows" virtual-scroll-horizontal v-slot="{ item, index }" @virtual-scroll="scrollFn"
        style="z-index: 10 !important;">
        <div :key="index"
          :class="[sptActive == index ? 'q-pa-sm bg-primary text-white card-anim' : 'q-pa-sm self-center bg-grey-2 text-black', 'q-mr-sm radius10 shadow-4 q-mb-md cardSlider']">
          <q-item style="margin-left: -13px;" :to="{ name: 'spt-detail', query: { id: item.spt_id } }">
            <q-item-section>
              <p class="text-caption q-mb-sm">
                <q-icon name="snippet_folder" class="q-mr-sm" size="sm" color="orange-8" /> Surat Perintah Tugas
              </p>
              <p class="text-weight-bold q-mb-sm">Nomor Surat <span
                  v-if="item.sptupload == null ? '-' : item.sptupload.nomor">{{ item.sptupload == null ? '-' :
                    item.sptupload.nomor }}</span></p>
            </q-item-section>
            <q-item-section side>
              <q-circular-progress :value="70" show-value font-size="12px" size="40px" :thickness="0.3" color="amber-9"
                track-color="grey-3" center-color="teal-7" class="text-white" />
            </q-item-section>
          </q-item>
          <p class="text-caption">
            <q-icon name="location_on" class="q-mr-sm" size="sm" color="red-5" /> {{ item.kecamatan }} {{ item.tempat }}
          </p>
        </div>

      </q-virtual-scroll>
    </section>

  </div>
</template>
<style scoped>
.card-anim {
  padding: 20px 15px 20px 15px;
}

.cardSlider {
  width: 320px;
}
</style>
