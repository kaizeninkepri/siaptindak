<script>
import { defineComponent, defineAsyncComponent, computed, onBeforeMount, reactive, ref } from "vue";
import { useSptStore } from "stores/spt";
import { useLaporanKejadianStore } from "stores/spt";
import { useLaporanHarianStore } from "stores/spt";
import { useRoute } from "vue-router";
import { useRefStore } from "stores/ref";
import { useAuthStore } from "stores/auth";

const storeSpt = useSptStore();
const storeRef = useRefStore();
const storeAuth = useAuthStore()
const storeLK = useLaporanKejadianStore();
const storLaporanHarian = useLaporanHarianStore();


export default defineComponent({
  name: "laporan-harian-form",
  components: {
    formulirDasar: defineAsyncComponent(() => import("./form_dasar.vue")),
    formMapping: defineAsyncComponent(() => import("./form_mapping.vue")),
  },
  setup() {
    const Route = useRoute();
    const myForm = ref(null)
    onBeforeMount(() => {
      storeSpt.pegawaiAvaibaleGet()
      storeSpt.getData();
      storLaporanHarian.getData()
      storeRef.header.title = "Formulir Laporan Kejadian";
      storeRef.header.subtitle = "Pengisian Laporan Harian Oleh Petugas";
    })
    //DASAR LAPORAN KEJADIAN
    const dasarLaporan = ref(null);

    const pegawai = computed(() => {
      return storeSpt.pegawai.data
    })
    const spt = computed(() => {
      const data = storeSpt.data.data
      return data.filter((fn) => fn.sptupload != null)
    })
    const laporanHarian = computed(() => {
      const data = storLaporanHarian.data.data
      return data
    })
    const isLoading = computed(() => storeLK.laporan.isLoading)
    const lk = storeLK.laporan.kejadian
    return {
      storeRef,
      pegawai,
      isLoading,
      lk,
      myForm,
      dasarLaporan,
      spt,
      laporanHarian,
      addPersonKejadian() {
        storeLK.addPersonKejadian()
      },
      addFilesKejadian() {
        storeLK.addFilesKejadian()
      },
      deleteFilesKejadian(index) {
        storeLK.laporan.kejadian.attacemnt.splice(index, 1)
      },
      deletePersonKejadian(index) {
        storeLK.laporan.kejadian.person.splice(index, 1)
      },
      ChangeBerkasBB(event, index) {
        console.log(index)
        let fileReader = new FileReader();
        storeLK.laporan.kejadian.attacemnt[index].berkas = event.target.files[0];
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onload = async (e) => {
          storeLK.laporan.kejadian.attacemnt[index].url = e.target.result
        };
      },
      OnChangeUnggahBerkasPerson(event, index) {
        let fileReader = new FileReader();
        storeLK.laporan.kejadian.person[index].berkas = event.target.files[0];
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onload = async (e) => {
          storeLK.laporan.kejadian.person[index].url = e.target.result
        };
      },
      onValidateToDabases() {
        myForm.value.validate().then((success) => {
          if (success) {
            storeLK.insertDataWithUpload()

          } else {
            // oh no, user has filled in
            // at least one invalid value
          }
        });
      },
    }
  }
});
</script>
<template>
  <div class="q-mt-md">
    <div class="row justify-center">
      <div class="col-lg-10 col-md-11 col-sm-12 col-xs-12">
        <q-form ref="myForm">
          <q-card class="radius10">
            <q-card-section>
              <div class="row justify-between items-center q-col-gutter-md">
                <div class="col-lg-5 col-md-5 col-xs-12 col-sm-12">
                  <div class="text-h6">{{ storeRef.header.title }}</div>
                  <p class="text-caption">{{ storeRef.header.subtitle }}</p>
                </div>
                <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12 text-right">
                  <q-btn label="Data Laporan" icon="arrow_back_ios" color="secondary" class="radius5"
                    :to="{ name: 'laporan' }" />
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="row q-col-gutter-sm">
                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <q-select label="Nama Pelapor" dense filled :options="pegawai" option-label="nama"
                    option-value="pegawai_id" v-model="lk.pelapor" map-options emit-value readonly />
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <q-select label="Dasar Laporan Kejadian" dense filled
                    :options="['SPT', 'LAPORAN HARIAN', 'LAPORAN INFORMASI']" v-model="dasarLaporan" />
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12" v-if="dasarLaporan == 'SPT' ? true : false">
                  <q-select dense filled label="Surat Perintah Tugas"
                    :option-label="v => v.sptupload != null ? v.sptupload.nomor : null" option-value="spt_id"
                    :options="spt" v-model="lk.spt_id" emit-value map-options>
                    <template v-slot:option="{ itemProps, opt }">
                      <div v-bind="itemProps" class="row q-pa-md q-col-gutter-sm cursor-pointer selecetedData">
                        <div class="col-lg-3 col-md-3 col-sm-8 col-xs-8">
                          <span class="text-caption">Nomor SPT</span>
                          <p class="q-mb-none">{{ opt.sptupload.nomor }}</p>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
                          <span class="text-caption">Jam</span>
                          <p class="q-mb-none">{{ opt.jam }}</p>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <span class="text-caption">Tempat</span>
                          <p class="q-mb-none">{{ opt.tempat }}</p>
                        </div>
                      </div>
                      <q-separator />
                    </template>
                  </q-select>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="q-pa-md bg-grey-3 radius10">
                <p class="q-mb-sm text-caption text-weight-bold">WAKTU KEJADIAN</p>
                <div class="row q-col-gutter-sm">
                  <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6">
                    <q-input dense class="radius10" label="Tanggal Kejadian" filled v-model="lk.kejadian_tgl" mask="date"
                      :rules="['date']">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="lk.kejadian_tgl">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6">
                    <q-input dense filled v-model="lk.kejadian_jam" mask="time" :rules="['time']" label="Jam Kejadian">
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="lk.kejadian_jam">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <q-select label="Tindakan" dense filled
                      :options="['SURAT PERNYATAAN', 'SURAT PERINGATAN 1', 'SURAT PERINGATAN 2', 'SURAT PERINGATAN 3']"
                      v-model="lk.tindakan.tindakan" />
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6">
                    <q-input dense class="radius10" label="Masa Tenggal Awal" filled
                      v-model="lk.tindakan.masa_tenggang_awal" mask="date" :rules="['date']">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="lk.tindakan.masa_tenggang_awal">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6">
                    <q-input dense class="radius10" label="Masa Tenggal Akhir" filled
                      v-model="lk.tindakan.masa_tenggang_akhir" mask="date" :rules="['date']">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="lk.tindakan.masa_tenggang_akhir">
                              <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-input dense filled v-model="lk.kejadian_tempat" label="Tempat Kejadian" class="bg-teal-1" />
                  </div>
                </div>
              </div>
              <div class="q-pa-md bg-red-2 q-mt-sm radius10">
                <formulirDasar />
              </div>
              <div class="row q-col-gutter-sm q-mt-sm">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-editor dense filled v-model="lk.deskripsi" placeholder="Apa Yang Terjadi" />
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-editor dense filled v-model="lk.operandi" placeholder="Modus Operandi" />
                </div>
              </div>
            </q-card-section>
            <q-card-section class="bg-red-1">
              <p class="q-mb-sm text-caption text-weight-bold">PELAKU DAN SAKSI-SAKSI</p>
              <div v-for="(p, pIndex) in lk.person" :key="pIndex">
                <div class="row q-col-gutter-md q-mb-md">
                  <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <q-input dense filled v-model="p.nik" label="Nomor Induk Kependudukan" />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <q-input dense filled v-model="p.nama" label="Nama Lengkap" />
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                    <q-select dense filled v-model="p.kategori" label="Status" :options="['PELAKU', 'SAKSI']" />
                  </div>
                  <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 row q-col-gutter-sm">
                    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                      <q-input dense filled v-model="p.hp" label="Nomor HP / WA" />
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                      <input type="file" name="file" :id="pIndex" class="inputfile"
                        @change="OnChangeUnggahBerkasPerson($event, pIndex)" />
                      <label :for="pIndex"> <q-icon name="upload" size="sm" class="q-mr-sm" />Pilih Berkas (.Pdf / .png,
                        .jpg)</label>
                    </div>

                    <div class="col-lg-12 col-md-2 col-sm-12 col-xs-12">
                      <q-btn icon="delete" color="red-5" v-if="pIndex != 0 ? true : false"
                        @click="deletePersonKejadian(pIndex)" />
                    </div>
                  </div>

                </div>
                <q-separator class="q-mb-md" />
              </div>
              <div class="q-gutter-sm q-mt-sm">
                <q-btn label="Tambah Pelaku / Saksi" outline color="secondary" class="radius5"
                  @click="addPersonKejadian" />
              </div>
            </q-card-section>
            <q-card-section class="bg-blue-1">

              <p class="q-mb-sm text-caption text-weight-bold">BARANG BUKTI</p>
              <div v-for="(b, bIndex) in lk.attacemnt" :key="bIndex">
                <div class="row q-col-gutter-sm q-mb-sm">
                  <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <q-input dense filled v-model="b.nama" label="Nama Barang Bukti" />
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-8 col-xs-8">
                    <q-select dense filled v-model="b.kategori" label="Status" :options="['BARANG BUKTI']" />
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                    <input type="file" name="bb" :id="'files' + bIndex" class="inputfile"
                      @change="ChangeBerkasBB($event, bIndex)" />
                    <label :for="'files' + bIndex"> <q-icon name="upload" size="sm" class="q-mr-sm" />Pilih Berkas (.Pdf /
                      .png,
                      .jpg)</label>
                  </div>
                  <div class="col-lg-1 col-md-1 col-sm-4 col-xs-4">
                    <q-btn icon="delete" color="red-5" v-if="bIndex != 0 ? true : false"
                      @click="deleteFilesKejadian(bIndex)" />
                  </div>
                </div>
                <q-separator class="q-mb-md" />
              </div>
              <div class="q-gutter-sm q-mt-sm">
                <q-btn label="Tambah Barang Bukti" outline color="blue-8 " class="radius5" @click="addFilesKejadian" />
              </div>
            </q-card-section>
            <q-card-section>
              <formMapping />
            </q-card-section>
            <q-card-actions>
              <q-btn label="ok, Kirim Laporan" color="primary" @click="onValidateToDabases" />
            </q-card-actions>
          </q-card>
        </q-form>
        <!-- <q-inner-loading :showing="isLoading" label="Mohon Menunggu, Memproses Laporan Harian ..." label-class="text-teal"
                                                                                                                                                                                                                                                label-style="font-size: 1.1em" /> -->
      </div>

    </div>
  </div>
</template>
<style scoped>
.selecetedData:hover {
  background-color: antiquewhite;
}
</style>
<style scoped>
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputfile+label {
  padding: 8px;
  font-size: 1em;
  font-weight: 700;
  color: white;
  background-color: #44a3a9;
  display: inline-block;
  cursor: pointer;
  outline: 1px dotted #50ab50;
  outline: -webkit-focus-ring-color auto 5px;
}

.inputfile+label * {
  pointer-events: none;
}

.inputfile:focus+label,
.inputfile+label:hover {
  background-color: #50ab50;
}
</style>
