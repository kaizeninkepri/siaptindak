<script>
import { defineComponent, defineAsyncComponent, computed, onBeforeMount, reactive, ref } from "vue";
import { useSptStore } from "stores/spt";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LControl } from "@vue-leaflet/vue-leaflet";
import { useRoute } from "vue-router";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import { useNotificationStore } from "stores/notification";

const storeNotification = useNotificationStore();
const storeSpt = useSptStore();

export default defineComponent({
  name: "spt-detail",
  components: {
    sptPage: defineAsyncComponent(() => import("./spt.vue")),
    PetugasPage: defineAsyncComponent(() => import("./petugas.vue")),
    harianPage: defineAsyncComponent(() => import("./harian.vue")),
    kejadianPage: defineAsyncComponent(() => import("./kejadian.vue")),
    informasiPage: defineAsyncComponent(() => import("./informasi.vue")),
  },
  setup() {
    const Route = useRoute();
    onBeforeMount(() => {
      storeNotification.dialog = false
      storeSpt.dataById(Route.query.id)
    })
    const lat = computed(() => storeSpt.spt.lat)
    const lng = computed(() => storeSpt.spt.lng)
    const modal = reactive({
      harian: false,
      kejadian: false,
      informasi: false,
      tracking: false,
    })
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
      modal,
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
        <q-item>
          <q-item-section>
            <div class="text-left">
              <q-btn icon="arrow_back" color="white" flat :to="{ name: 'spt' }" padding="0" />
            </div>
          </q-item-section>
          <q-item-section side>
            <q-btn icon="home" color="white" flat :to="{ name: 'beranda' }" padding="0" />
          </q-item-section>
        </q-item>
      </div>
      <section class="cardContainerDetail q-pa-sm">
        <q-card class="radius10">
          <q-item>
            <q-item-section>
              <p class="text-h5 text-weight-bold q-mb-none">
                <q-icon name="qr_code" size="xs" color="blue-8" /> <span
                  class="text-caption  text-weight-bold text-grey-7"> {{ spt.code
                  }}</span>
              </p>
              <p class="text-subtitle1 q-mb-none  text-weight-bold ">{{ spt.dateSpt }}</p>
            </q-item-section>
            <q-item-section side>
              <p class="text-caption q-mb-none">Jam</p>
              <p class="text-subtitle2 q-mb-none text-weight-bold">{{ spt.jam }} WIB</p>
            </q-item-section>
          </q-item>
          <div class="q-pl-md q-pr-md q-pb-md">
            <p class="text-caption text-grey-8 q-mb-none "><q-icon name="place" class="q-mr-xs" color="red-5" />Lokasi</p>
            <p v-if="!spt.isAllkota">{{ spt.tempat }} , {{ spt.kelurahan }} {{ spt.kecamatan }} {{ spt.kota }}</p>
            <p v-if="spt.isAllkota">Seluruh Kota Tanjungpinang</p>
          </div>
        </q-card>
      </section>


      <!-- MENU  -->
      <section class="q-pa-md">
        <p class="text-weight-bold q-mb-sm">Laporan</p>
        <div class="row q-col-gutter-sm">
          <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
            <q-btn unelevated color="amber-13" class="radius10" padding="10px" text-color="black"
              @click="modal.harian = true">
              <q-img src="/images/harian.png" width="40px" />
              <p class="q-mb-none q-mt-xs text-caption">Harian</p>
            </q-btn>
          </div>
          <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
            <q-btn unelevated color="red-4" class="radius10" padding="10px" text-color="black"
              @click="modal.kejadian = true">
              <q-img src="/images/kejadian.png" width="40px" />
              <p class="q-mb-none q-mt-xs text-caption">Kejadian</p>
            </q-btn>
          </div>
          <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
            <q-btn unelevated color="light-blue-3" class="radius10" padding="10px" text-color="black">
              <q-img src="/images/informasi.png" width="40px" @click="modal.informasi = true" />
              <p class="q-mb-none q-mt-xs text-caption" style="font-size:11px">Informasi</p>
            </q-btn>
          </div>
          <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
            <q-btn unelevated color="teal-3" class="radius10" padding="10px" text-color="black"
              @click="modal.tracking = true">
              <q-img src="/images/history.png" width="40px" />
              <p class="q-mb-none q-mt-xs text-caption">Tracking</p>
            </q-btn>
          </div>


        </div>
      </section>
      <div class="q-pa-md">
        <sptPage />
      </div>
      <q-card>
        <q-card-section>
          <PetugasPage />
        </q-card-section>
      </q-card>
    </q-pull-to-refresh>



    <q-dialog v-model="modal.harian" persistent transition-show="slide-left" transition-hide="slide-right"
      :maximized="true">
      <q-card>
        <q-bar class="bg-primary text-white q-pa-md">
          <q-btn dense flat icon="arrow_back" label="Kembali" @click="modal.harian = false">
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="row justify-center">
            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <harianPage />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modal.kejadian" persistent transition-show="slide-left" transition-hide="slide-right"
      :maximized="true">
      <q-card>
        <q-bar class="bg-primary text-white q-pa-md">
          <q-btn dense flat icon="arrow_back" label="Kembali" @click="modal.kejadian = false">
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="row justify-center">
            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <kejadianPage />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal.informasi" persistent transition-show="slide-left" transition-hide="slide-right"
      :maximized="true">
      <q-card>
        <q-bar class="bg-primary text-white q-pa-md">
          <q-btn dense flat icon="arrow_back" label="Kembali" @click="modal.informasi = false">
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="row justify-center">
            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <informasiPage />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal.tracking" persistent transition-show="slide-left" transition-hide="slide-right"
      :maximized="true">
      <q-card>
        <q-bar class="bg-primary text-white q-pa-md">
          <q-btn dense flat icon="arrow_back" label="Kembali" @click="modal.tracking = false">
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <section class="q-mt-md">
            <p class="text-weight-bold text-grey-8">History Surat Perintah Tugas</p>
            <q-timeline color="primary">
              <q-timeline-entry v-for="(h, hIndex) in spt.history" :key="hIndex" :subtitle="h.created_at">
                <div>
                  {{ h.content }}
                </div>
              </q-timeline-entry>

            </q-timeline>
          </section>
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>
<style scoped>
.cardDetailSpt {
  background: rgb(1, 69, 80);
  height: 170px;
  color: #000 !important;
}

.cardContainerDetail {
  margin-top: -130px;
}
</style>
<style lang="sass">
.my-custom-image
  filter: grayscale(100%)
</style>
