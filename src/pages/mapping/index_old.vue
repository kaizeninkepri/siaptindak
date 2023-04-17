
<script>
import { defineComponent, defineAsyncComponent, ref, reactive, onMounted, watch, computed } from 'vue'

import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LControl } from "@vue-leaflet/vue-leaflet";
import VGeosearch from 'vue2-leaflet-geosearch';
import { OpenStreetMapProvider, SearchControl } from "leaflet-geosearch";
import L from "leaflet";
export default defineComponent({
  name: 'mapping-index',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    VGeosearch,
    LControl
  },
  setup() {
    const map = ref(null)
    const searchControl = new SearchControl({
      provider: new OpenStreetMapProvider(),
      style: 'bar',
    });
    const dragging = ref(false)
    const markerLatLng = ref([0.91599, 104.46340])
    const location = reactive({
      default: {
        lat: 0.91599,
        lng: 104.46340
      },
      user: {
        lat: 0.91599,
        lng: 104.46340
      },
      position: {
        lat: 0.91599,
        lng: 104.46340
      },
      address: ""
    })

    const tileProvider = reactive({
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    })

    const getUserLocation = () => {
      if (navigator.geolocation) {
        // get  geolocation
        navigator.geolocation.getCurrentPosition(pos => {
          // set user location
          location.user = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
        });
      }
    }
    const getAddress = async () => {
      location.address = "Unresolved address";
      try {
        const { lat, lng } = location.position;
        const result = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        if (result.status === 200) {
          const body = await result.json();
          location.address = body.display_name;
        }
      } catch (e) {
        console.error("Reverse Geocode Error->", e);
      }
    }
    watch(location.position, (value) => {
      if (value) {
        getAddress()
      }
    })
    const tooltipContent = computed(() => {
      return `<strong>${location.address.replace(
        ",",
        "<br/>"
      )}</strong> <hr/><strong>lat:</strong> ${location.position.lat
        }<br/> <strong>lng:</strong> ${location.position.lng}`;
    })
    onMounted(() => {
      getUserLocation()
    })
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [0.91599, 104.46340],
      markerLatLng,
      location,
      addMarker(e) {
        console.log(e)
        location.position.lat = e.latlng.lat;
        location.position.lng = e.latlng.lng;
        // location.position = e.latlang
      },
      geoSearchOptions: {
        provider: new OpenStreetMapProvider(),
        showMarker: false,
        autoClose: true
      },
      getUserLocation,
      dragging,
      tooltipContent,
      tileProvider,
      searchControl,
      map
    };
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
        <div class="q-gutter-sm">
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
        </div>
      </div>
    </div>
    <q-btn class="q-mb-md" @click="getUserLocation" label="Current Location" />
    <!-- <pre>{{ searchControl }}</pre> -->

    <l-map ref="map" style="height: 480px; width: 100%;" :zoom="zoom" :center="[
      location.user.lat || location.default.lat || location.position.lat,
      location.user.lng || location.default.lng || location.position.lng
    ]" class="radius10 shadow-4" @click="addMarker">
      <l-tile-layer :url="tileProvider.url" :attribution="tileProvider.attribution"></l-tile-layer>
      <l-marker visible draggable :lat-lng="[location.position.lat, location.position.lng
      ]" @dragstart="dragging = true" @dragend="dragging = false"></l-marker>
      <l-control>
        <v-geosearch :options="geoSearchOptions"></v-geosearch>
      </l-control>
    </l-map>
  </div>
</template>
