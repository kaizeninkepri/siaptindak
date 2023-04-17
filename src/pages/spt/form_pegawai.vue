<script>
import { defineComponent, computed, ref, onBeforeMount } from "vue";
import { useSptStore } from "stores/spt";
import { useUndangStore } from "stores/master";
const storeSpt = useSptStore();
const storeDasar = useUndangStore()

export default defineComponent({
  name: "spt-pegawai-dasar",
  setup() {
    const form = storeSpt.spt
    const search = ref(null)
    const pegawai = computed(() => {
      const data = storeSpt.pegawai.data.filter((fe) => fe.is_active == true)
      if (search.value == '' || search.value == null) {
        return data
      }
      return data.filter((fn) => fn.nama.toLowerCase().includes(search.value.toLowerCase()))
    });
    onBeforeMount(() => {
      if (storeSpt.pegawai.data.length == 0) {
        storeSpt.pegawaiAvaibaleGet()
        return
      }
    })
    return {
      pegawai,
      form,
      search,
      async onReload() {
        await storeSpt.pegawaiAvaibaleGet()
        search.value = null
      },
      filterPegawaiFn(val, update) {
        if (val === '') {
          update(() => {
            pegawai
            search.value = null

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          search.value = needle
        })
      },
      onSelected(value) {
        search.value = null
        const indexPegawaiAvaiable = storeSpt.pegawai.data.findIndex((pf) => pf.pegawai_id == value)
        storeSpt.pegawai.data[indexPegawaiAvaiable]['isSelected'] = true
      },
      onAddPegawaiForm() {
        form.petugas.push({
          spt_pegawai_id: null,
          pegawai_id: null,
          jabatan_spt: 'Anggota',
        })
      },
      onDeletePegawaiForm(pegawaiId, index) {
        const indexPegawaiAvaiable = storeSpt.pegawai.data.findIndex((pf) => pf.pegawai_id == pegawaiId)
        // storeSpt.pegawai.data[indexPegawaiAvaiable]['isSelected'] = false
        form.petugas.splice(index, 1)
      }

    };
  },
});
</script>
<template>
  <div>
    <div class="row q-col-gutter-sm items-center">
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <p class="q-mb-xs text-grey-9 text-weight-bold">PETUGAS</p>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <div class="q-gutter-sm">
          <q-btn label="Refresh" icon="refresh" flat color="secondary" @click="onReload" />
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mt-md" v-for="(i, index) in form.petugas" :key="index">
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <q-select filled dense label="Nama Pegawai" v-model="i.pegawai_id" :options="pegawai" option-label="nama"
          option-value="pegawai_id" option-disable="isSelected" map-options emit-value use-input input-debounce="0"
          @filter="filterPegawaiFn" @update:model-value="onSelected" :rules="[
            val => val !== null && val !== '' || 'Please type something',
          ]" />
      </div>
      <div class="col-lg-3 col-md-3 col-sm-10 col-xs-10">
        <q-select :options="['Koordinator', 'Anggota']" filled dense label="Jabatan SPT" v-model="i.jabatan_spt" />
      </div>
      <div class="col-lg-1 col-md-1 col-sm-11 col-xs-11">
        <q-btn icon="delete" flat color="negative" v-if="index > 0" @click="onDeletePegawaiForm(i.pegawai_id, index)" />
      </div>
    </div>
    <q-btn size="sm" outline icon="person" label="Tambah Petugas" color="primary" class="q-mt-sm"
      @click="onAddPegawaiForm" />
  </div>
</template>
