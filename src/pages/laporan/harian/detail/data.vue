<script>
import { defineComponent, defineAsyncComponent, computed, onBeforeMount, reactive, ref } from "vue";
import { useSptStore } from "stores/spt";
import { useRoute } from "vue-router";
import { useLaporanHarianStore } from 'stores/spt';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LControl } from "@vue-leaflet/vue-leaflet";

const storeSpt = useSptStore();
const storLaporanHarian = useLaporanHarianStore();
export default defineComponent({
  name: "laporan-detail-harian-data",
  components: {
    LMap,
    LTileLayer,
    LControl,
    LMarker
  },
  setup(props) {
    const Route = useRoute();
    onBeforeMount(async () => {
      await storLaporanHarian.getDataById(Route.query.id)
    })
    const lat = computed(() => storLaporanHarian.onDetail.data.lat)
    const lng = computed(() => storLaporanHarian.onDetail.data.lng)
    const tileProvider = reactive({
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    })

    const zoom = ref(15)
    const isLoading = computed(() => storLaporanHarian.onDetail.isLoading)
    const lh = computed(() => storLaporanHarian.onDetail.data)
    return {
      isLoading,
      lh,
      lat,
      lng,
      zoom,
      tileProvider,
      refresh() {
        location.reload()
      }
    }
  }
});
</script>
<template>
  <div>
    <q-pull-to-refresh @refresh="refresh">
    </q-pull-to-refresh>
    <div>
      <q-item style="margin-left: -16px;">
        <q-item-section avatar>
          <q-avatar>
            <q-img src="/images/profile_1.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section v-if="lh.sptpegawai">
          <q-item-label v-if="lh.sptpegawai.pegawai">{{ lh.sptpegawai.pegawai.nama }}</q-item-label>
          <q-item-label v-if="lh.sptpegawai.pegawai" caption>{{ lh.sptpegawai.pegawai.jabatan }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn icon="home" color="black" flat :to="{ name: 'beranda' }" padding="0" />
        </q-item-section>
      </q-item>
      <q-card class="radius10 q-mb-md">
        <l-map ref="map" class="radius10" style="height: 280px; width: 100%; z-index: 0 !important;" :zoom="zoom" :center="[
          lat, lng
        ]">
          <l-tile-layer :url="tileProvider.url" :attribution="tileProvider.attribution"></l-tile-layer>
          <l-control :position="'bottomleft'" class="custom-control-watermark">

            SIAP TINDAK SATPOL PP KOTA TANJUNGPINANG
          </l-control>
          <l-marker visible :lat-lng="[lat, lng]"></l-marker>
        </l-map>
        <q-card-section>
          <p class="text-caption text-grey-8 q-mb-none">Tempat</p>
          <p>{{ lh.tempat }}</p>
          <q-item style="margin-left: -16px;">
            <q-item-section>
              <q-item-label caption> latitude</q-item-label>
              <q-item-label v-if="lh.spt">{{ lh.lat }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label caption> longtitude</q-item-label>
              <q-item-label>{{ lh.lng }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>

      <section class="q-pa-sm">
        <q-item style="margin-left: -16px;">
          <q-item-section>
            <q-item-label caption> Jam Mulai</q-item-label>
            <q-item-label v-if="lh.spt">{{ lh.spt.jam }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label caption> Jam Selesai</q-item-label>
            <q-item-label>{{ lh.jam_selesai }}</q-item-label>
          </q-item-section>
        </q-item>
        <p class="text-caption q-mb-none text-grey-8">Sub Unsur</p>
        <p class="text-weight-bold" v-if="lh.unsur_sub">{{ lh.unsur_sub.nama }}</p>
        <p class="text-caption q-mb-none text-grey-8">Temuan</p>
        <p class="text-weight-bold">{{ lh.temuan }}</p>

        <p class="text-caption q-mb-none text-grey-8">Saran</p>
        <p class="text-weight-bold">{{ lh.saran }}</p>
      </section>
      <q-list bordered class="radius10">
        <q-item v-for="(f, fIndex) in lh.get_files" :key="fIndex">
          <q-item-section>
            <q-item-label caption>Keterangan</q-item-label>
            <q-item-label v-if="lh.spt">{{ f.nomor }}</q-item-label>
          </q-item-section>
          <q-item-section top>
            <q-btn label="pratinjau" icon="visibility" class="radius5" size="sm" color="grey-14" :href="f.url"
              target="_blank" unelevated />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
