<script>
import { defineComponent, defineAsyncComponent, computed, onBeforeMount, reactive, ref } from "vue";
import { useSptStore } from "stores/spt";
import { useAuthStore } from "stores/auth";
import { useRoute } from "vue-router";
import { api } from "boot/axios";
import { Notify } from "quasar";

const storeSpt = useSptStore();
const storeAuth = useAuthStore();

export default defineComponent({
  name: "spt-detail-petugas",
  setup() {
    const Route = useRoute();
    onBeforeMount(() => {
      if (storeSpt.pegawai.data.length == 0) {
        storeSpt.pegawaiAvaibaleGet()
        return
      }
    })
    const search = ref(null)
    const pegawaiAdd = reactive({
      dialog: false,
      search: null,
      pegawai_id: null,
      spt_id: Route.query.id,
      jabatan_spt: 'Anggota',
      isLoading: false,
      container: []
    })
    const pegawaiForm = computed(() => {
      const data = storeSpt.pegawai.data.filter((fe) => fe.is_active == true)
      if (pegawaiAdd.search == '' || pegawaiAdd.search == null) {
        return data
      }
      return data.filter((fn) => fn.nama.toLowerCase().includes(pegawaiAdd.search.toLowerCase()))
    });
    const isLoading = computed(() => storeSpt.onDetail.isLoading)
    const spt = computed(() => storeSpt.onDetail.data)
    const pegawai = computed(() => {
      const data = storeSpt.onDetail.data.petugas
      if (search.value == null || search.value == "") {
        return data
      }
      return data.filter((fn) => fn.pegawai.nama.toLowerCase().includes(search.value.toLowerCase()))
    })
    return {
      isLoading,
      spt,
      pegawai,
      search,
      pegawaiAdd,
      pegawaiForm,
      filterPegawaiFn(val, update) {
        if (val === '') {
          update(() => {
            pegawaiForm
            pegawaiAdd.search = null

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          pegawaiAdd.search = needle
        })
      },
      onSelected(value) {

        pegawaiAdd.container.push({
          pegawai_id: value.pegawai_id,
          nama: value.nama,
          nip: value.nip,
          jabatan_spt: pegawaiAdd.jabatan_spt
        })
        pegawaiAdd.pegawai_id = null
      },
      async onDeletePetugas(id, index) {
        await api
          .post("/spt", {
            type: "spt-pegawai-delete",
            id: id
          })
          .then((e) => {
            storeSpt.onDetail.data.petugas.splice(index, 1)
            Notify.create({
              message: 'Berhasil Menghapus Petugas',
              color: "positive",
              icon: "infor",
            });
          })
          .catch((error) => {
            Notify.create({
              message: error.response.data.messages,
              color: "negative",
              icon: "error",
            });
          })
          .finally((result) => {
            this.onDetail.isLoading = false
          });
      },
      async onAddPetugas() {
        pegawaiAdd.isLoading = true
        await api
          .post("/spt", {
            type: "spt-pegawai-add",
            data: pegawaiAdd.container,
            user_id: storeAuth.active.id,
            sptid: Route.query.id
          })
          .then((e) => {
            storeSpt.onDetail.data.petugas = e.data.data
            pegawaiAdd.dialog = false
            pegawaiAdd.container = []
            Notify.create({
              message: 'Berhasil Menambahkan Petugas',
              color: "positive",
              icon: "infor",
            });
          })
          .catch((error) => {
            Notify.create({
              message: error.response.data.messages,
              color: "negative",
              icon: "error",
            });
          })
          .finally((result) => {
            pegawaiAdd.isLoading = false
          });
      }
    }
  }
});
</script>
<template>
  <div>
    <div class="row q-col-gutter-sm q-mb-sm items-center">
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
        <q-btn label="Rincian Data Petugas" no-caps color="gery-9" flat style="margin-left:-13px" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 text-right">
        <q-btn label="Tambah Petugas" no-caps color="primary" unelevated size="11px" icon="groups" class="radius8"
          @click="pegawaiAdd.dialog = true" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-input dense filled placeholder="Cari Nama Petugas" v-model="search">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <q-timeline color="primary">
      <q-timeline-entry v-for="(p, pIndex) in pegawai" :key="pIndex"
        :subtitle="p.pegawai.nama + ' (' + p.jabatan_spt + ')'">
        <template v-slot:subtitle>
          <p class="text-weight-bold q-mb-none">{{ p.pegawai.nama }}</p>
          <p class="text-weight-bold">{{ p.pegawai.jabatan }} ( {{ p.jabatan_spt }} )</p>
        </template>
        <div>
          <q-btn flat color="amber-13" class="radius10" padding="0px" text-color="black" no-caps v-if="p.laporan"
            :to="{ name: 'laporan-harian-detail', query: { id: p.laporan.spt_laporan_id } }">
            <q-img src="/images/harian.png" width="30px" :class="[p.laporan == null ? 'my-custom-image' : '']" />
            <p class="q-mb-none q-ml-sm q-mt-xs text-caption">{{ p.laporan == null ? 'Belum Mengirimkan Laporan' :
              'Telah Mengirimkan Laporan' }}</p>
          </q-btn>
          <q-btn flat color="amber-13" class="radius10" padding="0px" text-color="black" no-caps v-else>
            <q-img src="/images/harian.png" width="30px" :class="[p.laporan == null ? 'my-custom-image' : '']" />
            <p class="q-mb-none q-ml-sm q-mt-xs text-caption">{{ p.laporan == null ? 'Belum Mengirimkan Laporan' :
              'Telah Mengirimkan Laporan' }}</p>
          </q-btn>
        </div>
      </q-timeline-entry>
    </q-timeline>
    <q-dialog persistent v-model="pegawaiAdd.dialog">
      <q-card style="width: 700px; max-width: 80vw;" class="radius10">
        <q-item>
          <q-item-section avatar>
            <img src="/images/siaptindak.png" style="width:80px" />
          </q-item-section>
          <q-item-section></q-item-section>
          <q-item-section side class="text-black">
            <q-item-label>PETUGAS SURAT PERINTAH TUGAS</q-item-label>
            <q-item-label caption>Penambahan Pegawai</q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-lg-3 col-md-3 col-sm-10 col-xs-10">
              <q-select :options="['Anggota']" filled dense label="Jabatan SPT" v-model="pegawaiAdd.jabatan_spt" />
            </div>
            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-select filled dense label="Nama Pegawai" v-model="pegawaiAdd.pegawai_id" :options="pegawaiForm"
                option-label="nama" option-value="pegawai_id" option-disable="isSelected" use-input input-debounce="0"
                @filter="filterPegawaiFn" @update:model-value="onSelected" />
            </div>

          </div>

        </q-card-section>
        <q-card-section class="bg-grey-3">
          <section class="text-center" v-if="pegawaiAdd.container.length == 0 ? true : false">
            BELUM ADA PEGAWAI YANG DI TAMBAHKAN
          </section>
          <section v-if="pegawaiAdd.container.length == 0 ? false : true">
            <q-card class="q-mb-sm radius10" v-for="(d, dIndex) in pegawaiAdd.container" :key="dIndex">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <q-img src="/images/profile_1.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ d.nama }}</q-item-label>
                  <q-item-label caption>{{ d.nip }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  {{ d.jabatan_spt }}
                  <q-btn icon="delete" color="red-5" size="sm" flat label="hapus"
                    @click="pegawaiAdd.container.splice(dIndex, 1)" />
                </q-item-section>
              </q-item>
            </q-card>
          </section>
          <div class="q-gutter-sm">
            <q-btn label="Ok,Proses" color="primary" class="radius5" @click="onAddPetugas"
              :disable="pegawaiAdd.container.length == 0 ? true : false" />
            <q-btn label="Batal" color="grey-8" flat class="radius5"
              @click="pegawaiAdd.dialog = false, pegawaiAdd.container = []" />
          </div>
        </q-card-section>
        <q-inner-loading :showing="pegawaiAdd.isLoading" label="Mohon Menunggu, memproses data..."
          label-class="text-secondary" label-style="font-size: 1.1em" />
      </q-card>

    </q-dialog>
  </div>
</template>
<style scoped>
.tableDetailPetugas {
  width: 100%;
  border-collapse: collapse;
  text-align: left !important;
  padding: 5px;
}

.tableDetailPetugas td,
th {
  padding: 5px;
  border: 1px solid #b8b8b8;
}
</style>
