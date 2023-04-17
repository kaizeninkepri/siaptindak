<script>
import { defineComponent, computed, ref, onBeforeMount, defineAsyncComponent, reactive } from "vue";
import { useRefStore } from "stores/ref";
import { useSptStore } from "stores/spt";
import { useUndangStore } from "stores/master";
const storeRef = useRefStore();
const storeSpt = useSptStore();
const storeDasar = useUndangStore()

export default defineComponent({
  name: "spt-form",
  components: {
    formulirDasar: defineAsyncComponent(() => import("./form_dasar.vue")),
    formulirPegawai: defineAsyncComponent(() => import("./form_pegawai.vue")),
    formulirMapping: defineAsyncComponent(() => import("./form_mapping.vue")),
  },
  setup() {
    const myForm = ref(null);
    const form = storeSpt.spt
    const isLoading = computed(() => storeSpt.isLoading)
    const state = reactive({
      kecamatanCode: null,
      searchPegawai: null,
      isLoading: {
        kecamatan: computed(() => storeRef.kecamatan.isLoading),
        pegawai: computed(() => storeSpt.pegawai.isLoading),
        spt: computed(() => storeSpt.isLoading),
      }
    });
    const kecamatan = computed(() => storeRef.kecamatan.data)
    const kelurahan = computed(() => {
      if (state.kecamatanCode == null || state.kecamatanCode == "") {
        return []
      }
      return storeRef.kecamatan.kelurahan.filter((kn) => {
        return kn.code.toLowerCase().includes(state.kecamatanCode.toLowerCase())
      })

    })
    onBeforeMount(() => {
      storeRef.kecamatanGet();
    })
    return {
      storeSpt,
      isLoading,
      myForm,
      form,
      state,
      kecamatan,
      kelurahan,
      onDatabases() {
        myForm.value.validate().then((success) => {
          if (success) {
            // storeUser.set_user();
          } else {
            // oh no, user has filled in
            // at least one invalid value
          }
        });
      },
    };
  },
});
</script>
<template>
  <div>
    <div class="col text-center text-weight-bold q-pa-md text-uppercase">
      {{ storeSpt.headerTittle }}
    </div>
    <section class="row q-col-gutter-sm">
      <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
        <p class="text-caption q-mb-xs">Tanggal Mulai</p>
        <q-input dense class="radius10" filled v-model="storeSpt.spt.tgl_awal" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="storeSpt.spt.tgl_awal">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
        <p class="text-caption q-mb-xs">Tanggal Akhir</p>
        <q-input dense class="radius10" filled v-model="storeSpt.spt.tgl_akhir" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="storeSpt.spt.tgl_akhir">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-lg-2 col-md-2 col-xs-6 col-sm-6">
        <p class="text-caption q-mb-xs">Jam</p>
        <q-input dense filled v-model="form.jam" mask="time" :rules="['time']">
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="form.jam" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </section>
    <section class="q-mb-md bg-grey-3 q-pa-md radius10">
      <formulirDasar />
    </section>
    <section class="q-mt-md">
      <p class="q-mb-xs text-grey-9">Untuk Surat Perintah Tugas</p>
      <q-editor placeholder="Ketik Untuk Surat Perintah Tugas" v-model="form.perihal" />
    </section>
    <section class="q-mt-md">
      <p class="q-mb-sm text-grey-9">Tempat</p>
      <section class="row q-col-gutter-sm">
        <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
          <q-checkbox v-model="form.isAllkota" label="Sekota Tanjungpinang" />
          <q-icon name="contact_support" size="sm" class="q-ml-md" color="blue-7">
            <q-tooltip class="bg-amber text-black shadow-4 text-weight-bold">Centang Checkbox ini apabila Surat Perintah
              Tugas Ruang
              Lingkupnya Sekota
              Tanjungpinang</q-tooltip>
          </q-icon>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <q-select :options="kecamatan" map-options option-label="nama" option-value="code" emit-value filled dense
            label="Kecamatan" v-model="form.kecamatan" @update:model-value="v => state.kecamatanCode = v" :rules="[
              val => val !== null && val !== '' || 'Please type something',
            ]" />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <q-select :options="kelurahan" map-options option-label="nama" option-value="nama" emit-value filled dense
            label="Kelurahan" v-model="form.kelurahan" :rules="[
              val => val !== null && val !== '' || 'Please type something',
            ]" />
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-input filled dense label="Tempat" v-model="form.tempat"
            :rules="[val => val && val.length > 0 || 'Please type something']" />
        </div>
      </section>

    </section>
    <section>
      <formulirMapping />
    </section>
    <section class="q-mt-md bg-teal-1 q-pa-md radius10">
      <formulirPegawai />
    </section>
    <section class="q-mt-md q-mb-md q-gutter-sm">
      <q-btn label="Ok, Proses" icon="save" color="primary" class="radius5" @click="storeSpt.dataInsert()" />
      <q-btn label="Batal" flat color="grey-6" class="radius5" />
    </section>
    <q-inner-loading :showing="isLoading" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em" />
  </div>
</template>
