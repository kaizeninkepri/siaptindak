
<script>
import { defineComponent, defineAsyncComponent, ref, reactive, onMounted, watch, computed } from 'vue'

import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LControl } from "@vue-leaflet/vue-leaflet";
import VGeosearch from 'vue2-leaflet-geosearch';
import { OpenStreetMapProvider, SearchControl } from "leaflet-geosearch";

import { useAuthStore } from 'src/stores/auth';
import { useMappingStore } from 'src/stores/mapping';

const storeMap = useMappingStore();
import L from "leaflet";
export default defineComponent({
  name: 'mapping-index',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
    // VGeosearch,
    // LControl
  },
  setup() {
    const zoom = ref(12)
    const center = computed(() => storeMap.spt.data[0]);
    const marker = computed(() => storeMap.spt.data);
    const user = reactive({
      lat: 0,
      lng: 0
    })
    const getUserLocation = () => {
      if (navigator.geolocation) {
        // get  geolocation
        navigator.geolocation.getCurrentPosition(pos => {
          // set user location
          user.lat = pos.coords.latitude
          user.lng = pos.coords.longitude
        });
      }
    }

    onMounted(() => {
      storeMap.getSptData()
    })
    return {
      zoom,
      center,
      storeMap,
      marker,
      user,
      getUserLocation
    }
  }
})
</script>
<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md justify-between items-center">
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
        <div class="text-h6">DATA MANAGEMENT TITIK KOORDINAT</div>
        <p class="text-caption">Surat Perintah Tugas, Laporan Kejadian, Laporan Informasi dan Laporan Harian</p>
      </div>
      <div class="col-lg-5 col-md-5 col-xs-12 col-sm-12">
        <!-- <div class="q-gutter-sm">
              <q-btn label="Surat Perintah Tugas" icon="snippet_folder" color="primary" class="radius5" />
              <q-btn-dropdown label="Laporan Kejadian" icon="summarize" color="red-4" class="radius5">
                <q-list>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Harian</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Kejadian</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Informasi</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div> -->
      </div>
    </div>
    <!-- <q-btn class="q-mb-md" @click="getUserLocation" label="Current Location" /> -->
    <!-- <pre>{{ searchControl }}</pre> -->
    <section v-if="center">
      <l-map ref="map" style="height: 550px; width: 100%;" :zoom="zoom" :center="[center.lat, center.lng]"
        class="radius10 shadow-4">
        <l-tile-layer :url="storeMap.tileProvider.url" :attribution="storeMap.tileProvider.attribution"></l-tile-layer>
        <l-marker visible :lat-lng="[user.lat, user.lng]"></l-marker>
        <l-marker visible v-for="(m, mIndex) in marker" :key="mIndex" :lat-lng="[m.lat, m.lng
        ]">
          <l-popup>
            <p class="q-mb-none">{{ m.dateSpt }}</p>
            <p class="q-mt-none text-weight-medium">
              <q-icon name="groups" size="sm" class="q-mr-sm" />
              <span v-if="m.petugas"> {{ m.petugas[0].pegawai.nama }}</span>
            </p>
          </l-popup></l-marker>
      </l-map>
    </section>
  </div>
</template>
