
<script>
import { defineComponent, defineAsyncComponent, ref, reactive, onMounted, watch, computed } from 'vue'

import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LControl } from "@vue-leaflet/vue-leaflet";
import VGeosearch from 'vue2-leaflet-geosearch';
import { OpenStreetMapProvider, SearchControl } from "leaflet-geosearch";
const maxSize = 10000
const heavyList = []

for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: 'Option ' + (i + 1),
    class: i === 0 ? 'q-pa-md bg-white text-black' : 'q-pa-sm self-center bg-grey-2 text-black'
  })
}
export default defineComponent({
  name: 'mapping-index',
  components: {
    LMap,
    LTileLayer,
    LMarker,
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
      map,
      heavyList
    };
  }
})
</script>
<template>
  <div class="bg-secondary">

    <!-- <pre>{{ searchControl }}</pre> -->
    <l-map ref="map" style="height: 380px; width: 100%; z-index: 0 !important;" :zoom="zoom" :center="[
      location.user.lat || location.default.lat || location.position.lat,
      location.user.lng || location.default.lng || location.position.lng
    ]" class="" @click="addMarker">
      <l-tile-layer :url="tileProvider.url" :attribution="tileProvider.attribution"></l-tile-layer>
      <l-marker visible draggable :lat-lng="[location.position.lat, location.position.lng
      ]" @dragstart="dragging = true" @dragend="dragging = false"></l-marker>
    </l-map>
  </div>
</template>
