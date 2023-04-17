<script>
import { defineComponent, defineAsyncComponent, ref, reactive, onMounted, watch, computed } from 'vue'

import { useSptStore } from "stores/spt";


const storeSpt = useSptStore();
export default defineComponent({
  name: "spt-harian-data",
  setup() {
    const laporan = computed(() => storeSpt.onDetail.data.laporan)
    return {
      laporan,
      storeSpt
    }
  }
});
</script>
<template>
  <div>
    <p class="text-weight-bold text-uppercase">Daftar Data Laporan Harian</p>

    <q-card v-for="(l, lIndex) in laporan" :key="lIndex" class="radius10 q-mb-sm" flat bordered>
      <a :to="{ name: 'laporan-harian-detail', query: { id: l.spt_laporan_id } }">
        <q-card-section class="q-mb-none q-pb-none">
          <p class="text-caption text-grey-8 q-mb-none">Temuan</p>
          <p class="">{{ l.temuan }}</p>

          <p class="text-caption text-grey-8 q-mb-none">Tempat</p>
          <p class="">{{ l.temuan }}</p>
        </q-card-section>
        <q-item :to="{ name: 'laporan-harian-detail', query: { id: l.spt_laporan_id } }">
          <q-item-section>
            <q-item-label caption> latitude </q-item-label>
            <q-item-label>{{ l.lat }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label caption> longtitude</q-item-label>
            <q-item-label>{{ l.lng }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section class="q-mb-none q-pb-none" v-if="l.sptpegawai">
          <p class="text-caption text-grey-8 q-mb-none">laporan dari</p>
          <p v-if="l.sptpegawai.pegawai">{{ l.sptpegawai.pegawai.nama }}</p>
        </q-card-section>
      </a>
    </q-card>
  </div>
</template>
<style>
#map {
  height: 180px;
}
</style>
