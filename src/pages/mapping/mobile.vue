
<script>
import { defineComponent, defineAsyncComponent, ref, reactive, onMounted, watch, computed, onBeforeMount } from 'vue'

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
    const zoom = ref(10)
    const center = computed(() => storeMap.spt.data[0]);
    const marker = computed(() => storeMap.spt.data);
    const user = reactive({
      lat: 0,
      lng: 0
    })
    const kategori = ref(['Harian', 'Kejadian', 'Informasi'])
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

    onBeforeMount(() => {
      storeMap.getkejadianData()
    })
    return {
      zoom,
      center,
      storeMap,
      marker,
      user,
      getUserLocation,
      kategori,
      getKejadian() {
        storeMap.getkejadianData()
      },
      getHarian() {
        storeMap.getHarianData()
      },
      getInformasiData() {
        storeMap.getInformasiData()
      }
    }
  }
})
</script>
<template>
  <div>
    <!-- <q-btn class="q-mb-md" @click="getUserLocation" label="Current Location" /> -->
    <!-- <pre>{{ searchControl }}</pre> -->
    <section v-if="center">
      <l-map ref="map" :zoom="zoom" style="height: 540px;" :center="[center.lat, center.lng]"
        class="radius10 shadow-4 mapMobile">
        <l-tile-layer :url="storeMap.tileProvider.url" :attribution="storeMap.tileProvider.attribution"></l-tile-layer>
        <!-- <l-marker visible :lat-lng="[user.lat, user.lng]"></l-marker> -->
        <l-marker visible v-for="(m, mIndex) in marker" :key="mIndex" :lat-lng="[m.lat, m.lng
        ]">
          <l-popup>
            <p class="q-mt-none text-weight-medium">
              <q-icon name="groups" size="sm" class="q-mr-sm" />
              <span v-if="m.pelapor"> {{ m.pelapor.nama }}</span>
            </p>
          </l-popup></l-marker>
      </l-map>
      <q-card class="cardMapping" flat>
        <q-card-section>
          <p class="q-mb-sm text-weight-bold">Data Titik Koordinat Laporan</p>
          <q-btn label="kejadian" class="radius10 q-mr-sm" unelevated outline size="12px" @click="getKejadian" />
          <q-btn label="Harian" class="radius10 q-mr-sm" unelevated outline size="12px" @click="getHarian" />
          <q-btn label="informasi" class="radius10 q-mr-sm" unelevated outline size="12px" @click="getInformasiData" />
        </q-card-section>
      </q-card>
    </section>
  </div>
</template>
<style>
@media only screen and (max-width: 380px) {

  .mapMobile {
    height: 550px;
    width: 100%;
    z-index: 0 !important
  }




}



.mapMobile {
  height: 650px;
  width: 100%;
  z-index: 0 !important
}
</style>
