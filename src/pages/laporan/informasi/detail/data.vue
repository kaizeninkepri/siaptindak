<script>
import { defineComponent, defineAsyncComponent, computed, onBeforeMount, reactive, ref } from "vue";
import { useSptStore } from "stores/spt";
import { useRoute } from "vue-router";
import { useLaporanKejadianStore } from "stores/spt";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LControl } from "@vue-leaflet/vue-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";

const storeLK = useLaporanKejadianStore();
const storeSpt = useSptStore();

export default defineComponent({
  name: "laporan-detail-kejadian-data",
  props: ['laporanKejadianId'],
  components: {
    pelakuPage: defineAsyncComponent(() => import("./pelaku.vue")),
    LMap,
    LTileLayer,
    LControl,
    LMarker
  },
  setup(props) {
    const Route = useRoute();
    onBeforeMount(async () => {
      await storeLK.getDataById(props.laporanKejadianId)
    })
    const lat = computed(() => storeLK.onDetail.data.lat)
    const lng = computed(() => storeLK.onDetail.data.lng)
    const tileProvider = reactive({
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    })

    const zoom = ref(15)
    const isLoading = computed(() => storeLK.onDetail.isLoading)
    const lk = computed(() => storeLK.onDetail.data)
    return {
      isLoading,
      lk,
      lat,
      lng,
      zoom,
      tileProvider
    }
  }
});
</script>
<template>
  <div>
    <q-item>
      <q-item-section>
        <div class="text-left">
          <q-btn icon="arrow_back" color="black" flat :to="{ name: 'laporan', query: { p: 2 } }"
            label="Kembali Ke Data Laporan" padding="0" />
        </div>
      </q-item-section>
      <q-item-section side>
        <q-btn icon="home" color="primary" flat :to="{ name: 'beranda' }" padding="0" />
      </q-item-section>
    </q-item>
    <q-card class="radius10">
      <q-card-section>
        <div class="row items-center">
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <p class="q-mb-none text-weight-bold text-grey-8">RINCIAN LAPORAN INFORMASI</p>
            <p class="text-caption q-mb-none text-weight-bold text-grey-8">Laporan Informasi Oleh Petugas</p>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item>
              <q-item-section avatar top>
                <q-icon name="qr_code" size="xl" color="blue-8" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Nomor Laporan Kejadian</q-item-label>
                <q-item-label class="text-weight-bold text-h6">{{ lk.nomor == null ? 'Belum di verifikasi' : '-'
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

        </div>

      </q-card-section>
      <q-card-section class="bg-teal-2">
        <div class="row">
          <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <span class="text-caption text-gery-9">Pelapor</span>
            <p class="text-weight-bold">{{ lk.pelapor.nama }}</p>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <span class="text-caption text-gery-9">Tanggal dan Jam Informasi</span>
            <p>{{ lk.kejadian_tgl }} {{ lk.kejadian_jam }} WIB</p>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <span class="text-caption text-gery-9">Alamat</span>
            <p>{{ lk.kejadian_tempat }}</p>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-card bordered flat class="radius10">
          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                <p class="text-caption q-mb-none">Analisa Singkat</p>
                <p class="text-subtitle1">
                  <span v-html="lk.deskripsi"></span>
                </p>
              </div>
              <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                <p class="text-caption q-mb-none">Prediksi</p>
                <span v-html="lk.operandi"></span>
              </div>
              <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                <p class="text-caption q-mb-none">Cara Mendapatkan Informasi</p>
                <p v-for="(t, tIndex) in lk.tindakan" :key="tIndex">
                  {{ t.tindakan }}</p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-section class="q-pa-none q-mt-md">
        <pelakuPage :laporanKejadianId="lk.laporan_kejadian_id" />
      </q-card-section>
    </q-card>
    <l-map ref="map" class="radius10" style="height: 280px; width: 100%; z-index: 0 !important;" :zoom="zoom" :center="[
      lat, lng
    ]">
      <l-tile-layer :url="tileProvider.url" :attribution="tileProvider.attribution"></l-tile-layer>
      <l-control :position="'bottomleft'" class="custom-control-watermark">

        SIAP TINDAK SATPOL PP KOTA TANJUNGPINANG
      </l-control>
      <l-marker visible :lat-lng="[lat, lng]"></l-marker>
    </l-map>
  </div>
</template>
<style scoped>
.tindakanTable {
  width: 100% !important;
  border-collapse: collapse;
  text-align: left !important;
  border: 1px solid #333;
}

.tindakanTable th,
td {
  padding: 5px;
  border: 1px solid #333;
}
</style>
