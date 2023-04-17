<script>
import { defineComponent, defineAsyncComponent, ref, reactive, onMounted, watch, computed } from 'vue'
import L from "leaflet"
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LControl } from "@vue-leaflet/vue-leaflet";
import VGeosearch from 'vue2-leaflet-geosearch';
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import 'leaflet-geosearch/dist/geosearch.css';
import { useSptStore } from "stores/spt";
import { useLaporanHarianStore } from "stores/spt";
const storeLaporanHarian = useLaporanHarianStore()
const storeSpt = useSptStore();
export default defineComponent({
  name: "spt-mapping",
  components: {
    LMap,
    LTileLayer,
    LControl,
    LMarker
  },
  setup() {
    const mapElement = ref(null)
    const provider = new OpenStreetMapProvider();

    const lat = computed(() => storeLaporanHarian.laporan.lat)
    const lng = computed(() => storeLaporanHarian.laporan.lng)
    const tileProvider = reactive({
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    })

    const zoom = ref(15)
    const searchControl = reactive({
      data: [],
      search: null
    })
    return {
      lat,
      lng,
      searchControl,
      zoom,
      tileProvider,
      provider,
      async onTypeData(val, update) {
        const result = await provider.search({ query: val });
        update(() => {
          searchControl.data = result
          if (val === '') {
            searchControl.data = result
          }
          else {
            const needle = val.toLowerCase()
            searchControl.data.filter((v => {
              return v.label.toLowerCase().includes(needle)
            }))
          }
        })


      },
      onSelected(value) {
        storeLaporanHarian.laporan.lat = value.y
        storeLaporanHarian.laporan.lng = value.x
      },
      addMarker(e) {
        storeLaporanHarian.laporan.lat = e.latlng.lat
        storeLaporanHarian.laporan.lng = e.latlng.lng

      }
    }
  }
});
</script>
<template>
  <div>
    <div class="">
      <q-select class="q-mb-sm" filled label="Ketik Nama Tempat, Tentukan Titik Lokasi" :options="searchControl.data"
        v-model="searchControl.search" dense use-input input-debounce="0" @filter="onTypeData"
        @update:model-value="onSelected" />
    </div>
    <l-map ref="map" style="height: 380px; width: 100%; z-index: 0 !important;" :zoom="zoom" :center="[
      lat, lng
    ]" @click="addMarker">
      <l-tile-layer :url="tileProvider.url" :attribution="tileProvider.attribution"></l-tile-layer>
      <l-control :position="'bottomleft'" class="custom-control-watermark">

        Vue2Leaflet Watermark Control
      </l-control>
      <l-marker visible draggable :lat-lng="[lat, lng]" @dragstart="dragging = true"
        @dragend="dragging = false"></l-marker>
    </l-map>
  </div>
</template>
<style>
#map {
  height: 180px;
}
</style>
