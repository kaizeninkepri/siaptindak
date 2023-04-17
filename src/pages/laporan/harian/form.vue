<script>
import { defineComponent, defineAsyncComponent, computed, onBeforeMount, reactive, ref } from "vue";
import { useSptStore } from "stores/spt";
import { useRoute } from "vue-router";
import { useRefStore } from "stores/ref";
import { useUnsurStore } from "stores/master";
import { useUnsurSubStore } from "stores/master";
import { useLaporanHarianStore } from "stores/spt";
const storeSpt = useSptStore();
const storeRef = useRefStore();
const storeUnsur = useUnsurStore();
const storeUnsurSub = useUnsurSubStore();
const storeLaporanHarian = useLaporanHarianStore()
export default defineComponent({
  name: "laporan-harian-form",
  components: {
    mappingPage: defineAsyncComponent(() => import("./form_mapping.vue")),
  },
  setup() {
    const Route = useRoute();
    const myForm = ref(null)
    onBeforeMount(() => {
      if (storeUnsur.data.data.length == 0) {
        storeUnsur.getData()
      }
      if (storeUnsurSub.data.data.length == 0) {
        storeUnsurSub.getData()
      }
      storeSpt.getData();
      storeRef.header.title = "Formulir Laporan Harian";
      storeRef.header.subtitle = "Pengisian Laporan Harian Oleh Petugas";
    })
    const search = reactive({
      unsur: null,
      unsurSub: null
    })
    const sptSearch = ref(null)
    const isLoading = computed(() => storeLaporanHarian.laporan.isLoading)
    const unsur = computed(() => {
      const data = storeUnsur.data.data.filter((fs) => fs.is_active == true)
      if (search.unsur == null || search.unsur == "") {
        return data
      }
      return data.filter((fn) => fn.nama.toLowerCase().includes(search.unsur.toLowerCase()))
    })
    const unsurSub = computed(() => {
      const data = storeUnsurSub.data.data.filter((fs) => fs.is_active == true)
      if (search.unsurSub == null || search.unsurSub == "") {
        return data
      }
      return data.filter((fn) => fn.nama.toLowerCase().includes(search.unsurSub.toLowerCase()))
    })

    const spt = computed(() => {
      const data = storeSpt.data.data
      return data.filter((fn) => fn.sptupload != null)
    })
    const laporan = storeLaporanHarian.laporan
    return {
      storeRef,
      spt,
      laporan,
      unsur,
      unsurSub,
      myForm,
      isLoading,
      sptSearch,
      onSelected(value) {
        storeLaporanHarian.laporan.spt = value
        storeLaporanHarian.laporan.spt_id = value.spt_id
      },
      onSelectedSubUnsur(value) {
        const dataSubUnsurIndex = storeUnsurSub.data.data.findIndex((fus) => fus.unsur_sub_id == value)
        storeLaporanHarian.laporan.unsur_id = storeUnsurSub.data.data[dataSubUnsurIndex].unsur_id
      },
      OnChangeUnggahBerkas(event, index) {
        let fileReader = new FileReader();
        storeLaporanHarian.laporan.attacemnt[index].berkas = event.target.files[0];
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onload = async (e) => {
          storeLaporanHarian.laporan.attacemnt[index].url = e.target.result
          storeLaporanHarian.laporan.attacemnt[index].spt_id = storeLaporanHarian.laporan.spt_id
        };
      },
      onValidateToDabases() {
        myForm.value.validate().then((success) => {
          if (success) {
            // storeLaporanHarian.insertData()
            storeLaporanHarian.insertDataWithUpload()
          } else {
            // oh no, user has filled in
            // at least one invalid value
          }
        });
      },
      addAttacment() {
        storeLaporanHarian.addAttacment()
      },
      deleteAttacment(index) {
        storeLaporanHarian.laporan.attacemnt.splice(index, 1)
      }
    }
  }
});
</script>
<template>
  <div class="q-mt-md">
    <div class="row justify-center">
      <div class="col-lg-8 col-md-10 col-sm-12 col-xs-12">
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
              <div class="bg-grey-4 radius10 q-pa-md">
                <section>
                  <q-select v-model="sptSearch" dense filled label="Surat Perintah Tugas" :options="spt"
                    @update:model-value="onSelected">
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
                </section>
                <section class="q-mt-md">
                  <p class="q-mb-xs text-weight-bold">IDENTITAS SURAT PERINTAH TUGAS</p>
                  <table>
                    <tr>
                      <td>Nomor</td>
                      <td> : </td>
                      <td>{{ laporan.spt.sptupload.nomor }}</td>
                    </tr>
                    <tr>
                      <td>Tanggal</td>
                      <td> : </td>
                      <td>{{ laporan.spt.tgl_awal }}</td>
                    </tr>
                    <tr>
                      <td valign="top">Dasar</td>
                      <td valign="top"> : </td>
                      <td>
                        <table>
                          <tr v-for="(d, dIndex) in laporan.spt.dasar_uud" :key="dIndex">
                            <td valign="top">{{ dIndex + 1 }}. </td>
                            <td valign="top" v-if="d.undang"> {{ d.undang.nama }}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td width="150px">Lokasi Kegiatan</td>
                      <td> : </td>
                      <td>{{ laporan.spt.tempat }}</td>
                    </tr>
                  </table>
                </section>
              </div>
            </q-card-section>
            <q-card-section>
              <section>
                <p class="q-mb-sm text-weight-bold">LAPORAN PETUGAS</p>
                <div class="row q-col-gutter-sm">
                  <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                    <q-select dense filled label="Sub Unsur" v-model="laporan.unsur_sub_id" :options="unsurSub"
                      map-options option-label="nama" option-value="unsur_id" emit-value
                      @update:model-value="onSelectedSubUnsur" :rules="[
                        val => val !== null && val !== '' || 'Please type something',
                      ]" />
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                    <q-select dense filled label="Unsur" v-model="laporan.unsur_id" :options="unsur" map-options
                      option-label="nama" option-value="unsur_id" emit-value :rules="[
                        val => val !== null && val !== '' || 'Please type something',
                      ]" />
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <q-input dense filled mask="time" label="Jam Mulai" bg-color="teal-1" v-model="laporan.spt.jam"
                      :rules="['time']">
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time format24h v-model="laporan.jam">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <q-input dense filled mask="time" v-model="laporan.jam_selesai" label="Jam Selesai" bg-color="teal-1"
                      :rules="['time']">
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time format24h v-model="laporan.jam_selesai">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-select :options="['LAPORAN KEJADIAN', 'LAPORAN HARIAN']" v-model="laporan.solusi"
                      label="Solusi / Tindakan" filled dense :rules="[
                        val => val !== null && val !== '' || 'Please type something',
                      ]" />
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-input v-model="laporan.tempat" label="Tempat" filled dense :rules="[
                      val => val !== null && val !== '' || 'Please type something',
                    ]" />
                  </div>
                </div>
                <div class="row q-col-gutter-sm q-mt-sm">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-editor label="Temuan Dalam Kegiatan" placeholder="Temuan Dalam Kegiatan"
                      v-model="laporan.temuan" />
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-editor label="Saran / Catatan" placeholder="Saran / Catatan" v-model="laporan.saran" />
                  </div>

                </div>
              </section>
            </q-card-section>
            <q-card-section>
              <section>
                <p class="q-mb-sm text-weight-bold">UNGGAH BERKAS / FOTO PENDUKUNG</p>
                <div class="row q-col-gutter-sm q-mb-sm" v-for="(a, aIndex) in laporan.attacemnt" :key="aIndex">
                  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-select dense filled label="Nama Berkas" v-model="a.nomor"
                      :options="['Foto Lokasi', 'Berkas Laporan']" />
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                    <input type="file" name="file" :id="aIndex" class="inputfile"
                      @change="OnChangeUnggahBerkas($event, aIndex)" />
                    <label :for="aIndex"> <q-icon name="upload" size="sm" class="q-mr-sm" />Pilih Berkas (.Pdf / .png,
                      .jpg)</label>
                  </div>
                  <div class="col-lg-1 col-md-1 col-xs-2 col-sm-2" v-if="aIndex != 0 ? true : false">
                    <q-btn icon="delete" color="red-5" class="radius5" @click="deleteAttacment(aIndex)" />
                  </div>

                </div>
                <div class="row q-mt-md">
                  <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12">
                    <q-btn label="Tambah Attacment" color="secondary" class="radius5" unelevated @click="addAttacment" />
                  </div>
                </div>
              </section>
            </q-card-section>
            <q-card-section>
              <mappingPage />
            </q-card-section>
            <q-card-actions>
              <q-btn label="ok, Kirim Laporan" color="primary" @click="onValidateToDabases" />
            </q-card-actions>
          </q-card>
        </q-form>
        <q-inner-loading :showing="isLoading" label="Mohon Menunggu, Memproses Laporan Harian ..." label-class="text-teal"
          label-style="font-size: 1.1em" />
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
