<script>
import { defineComponent, defineAsyncComponent, computed, onBeforeMount, reactive, ref } from "vue";
import { useSptStore } from "stores/spt";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LControl } from "@vue-leaflet/vue-leaflet";
import { useRoute } from "vue-router";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";

const storeSpt = useSptStore();

export default defineComponent({
  name: "spt-detail",
  components: {
    sptPage: defineAsyncComponent(() => import("./spt.vue")),
    PetugasPage: defineAsyncComponent(() => import("./petugas.vue")),
    LMap,
    LTileLayer,
    LControl,
    LMarker
  },
  setup() {
    const Route = useRoute();
    onBeforeMount(() => storeSpt.dataById(Route.query.id))
    const lat = computed(() => storeSpt.spt.lat)
    const lng = computed(() => storeSpt.spt.lng)
    const tileProvider = reactive({
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    })

    const zoom = ref(15)
    const isLoading = computed(() => storeSpt.onDetail.isLoading)
    const spt = computed(() => storeSpt.onDetail.data)
    return {
      isLoading,
      spt,
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
      <div class="cardDetailSpt">
        &nbsp;
      </div>
      <section class="cardContainerDetail q-pa-sm">
        <q-card class="radius10">
          <q-card-section>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <p class="text-h5 text-weight-bold q-mb-sm">
                  <q-icon name="qr_code" size="md" color="blue-8" /> {{ spt.code }}
                </p>
                <p class="q-mb-none text-weight-bold text-grey-8">RINCIAN SURAT PERINTAH TUGAS</p>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 text-right">
                <p class="text-caption q-mb-none">Jam</p>
                <p class="text-h5 q-mb-none text-weight-bold">{{ spt.jam }} WIB</p>
              </div>
            </div>

          </q-card-section>
        </q-card>
      </section>
      <div class="row  justify-center">
        <div class="col-lg-11 col-md-11 col-sm-12 col-xs-12">
          <q-card class="radius10">
            <q-card-section>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <p class="text-h5 text-weight-bold q-mb-sm">
                    <q-icon name="qr_code" size="md" color="blue-8" /> {{ spt.code }}
                  </p>
                  <p class="q-mb-none text-weight-bold text-grey-8">RINCIAN SURAT PERINTAH TUGAS</p>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 text-right">
                  <p class="text-caption q-mb-none">Jam</p>
                  <p class="text-h5 q-mb-none text-weight-bold">{{ spt.jam }} WIB</p>
                </div>
              </div>

            </q-card-section>
            <q-card-section class="bg-teal-2">
              <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                  <span class="text-caption text-gery-9">Kota</span>
                  <p>Tanjungpinang</p>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                  <span class="text-caption text-gery-9">Kecamatan / Kelurahan</span>
                  <p>{{ spt.kecamatan }} - {{ spt.kelurahan }}</p>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <span class="text-caption text-gery-9">Alamat</span>
                  <p>{{ spt.tempat }}</p>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <sptPage />
            </q-card-section>
            <q-card-section>
              <PetugasPage />
            </q-card-section>
          </q-card>

        </div>
        <div class="col-lg-11 col-md-11 col-sm-12 col-xs-12">
          <section class="q-mt-sm q-mb-md shadow-4">
            <l-map ref="map" class="radius10" style="height: 380px; width: 100%; z-index: 0 !important;" :zoom="zoom"
              :center="[
                lat, lng
              ]">
              <l-tile-layer :url="tileProvider.url" :attribution="tileProvider.attribution"></l-tile-layer>
              <l-control :position="'bottomleft'" class="custom-control-watermark">

                SIAP TINDAK SATPOL PP KOTA TANJUNGPINANG
              </l-control>
              <l-marker visible draggable :lat-lng="[lat, lng]"></l-marker>
            </l-map>
          </section>
          <q-list bordered class="radius10 shadow-2">
            <q-item clickable v-ripple class="bg-indigo-4 text-white radius10">
              <q-item-section avatar>
                <q-avatar color="teal" text-color="white" icon="cloud_sync" />
              </q-item-section>

              <q-item-section>
                <q-item-label caption>Posisi Berkas</q-item-label>
                <q-item-label>{{ spt.step.nama }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="indigo-5" text-color="white" icon="groups" />
              </q-item-section>

              <q-item-section>
                <q-item-label><q-badge>{{ spt.petugas.length }}</q-badge> Petugas</q-item-label>
              </q-item-section>
            </q-item>


          </q-list>
          <section class="q-mt-md">
            <p class="text-weight-bold text-grey-8">History Surat Perintah Tugas</p>
            <q-timeline color="secondary">
              <q-timeline-entry v-for="(h, hIndex) in spt.history" :key="hIndex" :subtitle="h.created_at">
                <div>
                  {{ h.content }}
                </div>
              </q-timeline-entry>

            </q-timeline>
          </section>
        </div>
      </div>
    </q-pull-to-refresh>
  </div>
</template>
<style scoped>
.cardDetailSpt {
  background: rgb(1, 69, 80);
  height: 150px;
  color: #000 !important;
}

.cardContainerDetail {
  margin-top: -130px;
}
</style>
