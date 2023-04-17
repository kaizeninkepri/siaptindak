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
  name: "spt-detail-spt",
  setup() {
    const Route = useRoute();
    const myForm = ref(null);
    const isLoading = computed(() => storeSpt.onDetail.isLoading)
    const spt = computed(() => storeSpt.onDetail.data)
    const uploadSpt = reactive({
      dialog: false,
      spt_file_id: null,
      nomor: null,
      url: null,
      berkas: null,
      isLoading: false,
      errorBerkas: false,
      spt_id: Route.query.id,
      kategori: 'SPT',
      user_id: storeAuth.active.id
    })
    return {
      isLoading,
      spt,
      myForm,
      uploadSpt,
      onUploadSpt() {
        uploadSpt.dialog = true
        uploadSpt.nomor = null
        uploadSpt.url = null
        uploadSpt.berkas = null
        uploadSpt.errorBerkas = null
      },
      OnChangeUnggahBerkas(event) {

        let fileReader = new FileReader();
        uploadSpt.berkas = event.target.files[0];
        uploadSpt.isLoading = true
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onload = async (e) => {
          uploadSpt.errorBerkas = false
          uploadSpt.url = e.target.result
          uploadSpt.isLoading = false
        };
      },
      onValidateDB() {
        myForm.value.validate().then((success) => {
          if (success) {
            if (uploadSpt.url == null) {
              uploadSpt.errorBerkas = true
              return
            }
            uploadSpt.isLoading = true
            const data = new FormData();
            data.append("type", "spt-unggah-spt");
            data.append("documentFile", uploadSpt.berkas);
            data.append("data", JSON.stringify(uploadSpt));
            api.post("/spt/unggah", data).then((e) => {


              uploadSpt.isLoading = false
              uploadSpt.dialog = false
              storeSpt.onDetail.data.sptupload = e.data.data
              storeSpt.onDetail.data.history.push(e.data.history)
              storeSpt.onDetail.data.step = e.data.step
              storeSpt.onDetail.data.routing_step_id = e.data.step.routing_step_id
              Notify.create({
                message: "Berhasil Mengunggah Surat Perintah Tugas",
                color: "blue-8",
                icon: "info",
              });
            });
          }
        });
      }
    }
  }
});
</script>
<template>
  <div>
    <div class="bg-indigo-6 radius10 q-pa-md shadow-4" v-if="spt.sptupload != null ? true : false">
      <p class="text-weight-bold text-grey-1 text-caption q-mb-none">Nomor Surat Perintah Tugas</p>
      <section v-if="spt.sptupload == null ? true : false">
        <p class="q-mb-none"> - </p>
        <q-badge color="red-5">Surat Perintah Tugas Belum di Unggah </q-badge>
      </section>
      <section v-if="spt.sptupload != null ? true : false">
        <q-item style="margin-left: -13px;">
          <q-item-section>
            <p class="q-mb-none text-white"> {{ spt.sptupload.nomor }} </p>
          </q-item-section>
          <q-item-section side>
            <q-btn label="pratinjau" icon="visibility" class="radius5" size="sm" color="grey-14" :href="spt.sptupload.url"
              target="_blank" unelevated />
          </q-item-section>
        </q-item>

        <q-badge color="positive">Surat Perintah Tugas Telah Di unggah </q-badge>

      </section>
    </div>
    <q-btn label="Surat Perintah Belum di Unggah" class="radius8 full-width" icon="error" unelevated color="red-4"
      v-if="spt.sptupload == null ? true : false" />
    <section class="bg-grey-3 radius10 q-mt-md q-pa-md shadow-2" v-if="spt.sptupload == null ? true : false">
      <div class="row justify-center q-col-gutter-md">
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card class="radius10 text-center cursor-pointer" @click="onUploadSpt">
            <q-card-section>
              <q-icon name="create_new_folder" size="6em" color="blue-8" />
              <p class="q-mb-none text-subtitle1 text-weight-bold">Upload Surat Perintah Tugas</p>
              <span class="text-caption text-grey-8 ">(Surat Perintah Tugas yang telah di TTD Secara
                Elektornik)</span>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card class="radius10 text-center ">
            <q-card-section class="unduhDraft">
              <a :href="spt.urlDraft" target="_blank">
                <q-icon name="file_download" size="6em" color="primary" />
                <p class="q-mb-none text-subtitle1 text-weight-bold">Unduh Surat Perintah Tugas</p>
                <span class="text-caption text-grey-8 ">(Surat Perintah Tugas Berformat .word yang <span
                    class="text-weight-bold">Belum di TTD Secara
                    Elektornik)</span></span>
              </a>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>
    <q-dialog persistent v-model="uploadSpt.dialog">
      <q-card style="width: 700px; max-width: 80vw;" class="radius10">
        <q-item>
          <q-item-section avatar>
            <img src="/images/siaptindak.png" style="width:80px" />
          </q-item-section>
          <q-item-section></q-item-section>
          <q-item-section side class="text-black">
            <q-item-label>SURAT PERINTAH TUGAS</q-item-label>
            <q-item-label caption>Unggah SPT TTD Elektronik</q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section>
          <q-form ref="myForm">
            <div class="row q-col-gutter-sm">
              <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-input dense filled label="Nomor Surat Perintah Tugas" v-model="uploadSpt.nomor" :rules="[
                  val => val !== null && val !== '' || 'Please type something',
                ]" />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <input type="file" name="file" id="file" class="inputfile" @change="OnChangeUnggahBerkas" />
                <label for="file"> <q-icon name="upload" size="sm" class="q-mr-sm" />Pilih Berkas .Pdf</label>
              </div>
              <div class="col-sm-12" v-if="uploadSpt.errorBerkas">
                <q-banner class="bg-red-3 radius10"> BERKAS BELUM DI UNGGAH</q-banner>
              </div>
            </div>
          </q-form>
          <section class="q-mt-md" v-if="uploadSpt.url">
            <q-pdfviewer :src="uploadSpt.url" type="html5" style="height:400px" />
          </section>

        </q-card-section>

        <q-card-section class="bg-grey-3">

          <div class="q-gutter-sm">
            <q-btn label="Ok, Proses" color="primary" unelevated icon="upload" class="radius5" @click="onValidateDB" />
            <q-btn label="Batal" color="grey-8" flat class="radius5" @click="uploadSpt.dialog = false" />
          </div>
        </q-card-section>
        <q-inner-loading :showing="uploadSpt.isLoading" label="Mohon Menunggu, memproses data..."
          label-class="text-secondary" label-style="font-size: 1.1em" />
      </q-card>

    </q-dialog>
  </div>
</template>
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

.unduhDraft a {
  text-decoration: none;
  color: black;
}

.unduhDraft a:hover {
  color: #50ab50;
}
</style>
