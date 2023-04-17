<script>
import { defineComponent, defineAsyncComponent, ref, reactive, onMounted, watch, computed } from 'vue'

import { useSptStore } from "stores/spt";


const storeSpt = useSptStore();
export default defineComponent({
  name: "spt-harian-data",
  setup() {
    const laporan = computed(() => storeSpt.onDetail.data.laporaninformasi)
    return {
      laporan,
      storeSpt
    }
  }
});
</script>
<template>
  <div>
    <p class="text-weight-bold text-uppercase">Daftar Data Laporan Informasi</p>

    <q-card v-for="(l, lIndex) in laporan" :key="lIndex" class="radius10 q-mb-sm" flat bordered>
      <q-card-section class="q-mb-none q-pb-none">
        <q-item :to="{ name: 'laporan-informasi-detail', params: { v: l.laporan_kejadian_id } }"
          style="margin-left:-13px">
          <q-item-section>
            <q-item-label caption> Tanggal </q-item-label>
            <q-item-label>{{ l.kejadian_tgl }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label caption> jam</q-item-label>
            <q-item-label>{{ l.kejadian_jam }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'laporan-kejadian-detail', params: { v: l.laporan_kejadian_id } }" style="margin-left:-13px">
          <q-item-section>
            <q-item-label caption> Tempat </q-item-label>
            <q-item-label>{{ l.kejadian_tempat }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'laporan-kejadian-detail', params: { v: l.laporan_kejadian_id } }" style="margin-left:-13px">
          <q-item-section>
            <q-item-label caption> Laporan dari </q-item-label>
            <q-item-label v-if="l.pelapor">{{ l.pelapor.nama }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </div>
</template>
<style>
#map {
  height: 180px;
}
</style>
