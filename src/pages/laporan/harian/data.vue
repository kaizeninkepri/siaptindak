<script>
import { useRefStore } from 'stores/ref';
import { defineComponent, reactive, computed, onBeforeMount, ref, defineAsyncComponent } from 'vue';
import { useJabatanCategoryStore } from 'stores/master';
import { useLaporanHarianStore } from 'stores/spt';
const columns = [
  {
    name: 'index',
    required: true,
    label: '#',
    align: 'left',
    field: row => row.index,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'nama',
    required: true,
    label: 'Nomor SPT',
    align: 'left',
    field: row => row.spt.sptupload != null ? row.spt.sptupload.nomor : '-',
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'pegawai',
    required: true,
    label: 'Petugas',
    align: 'left',
    field: row => row.sptpegawai != null ? row.sptpegawai.pegawai.nama : '-',
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'tanggallaporan',
    required: true,
    label: 'Tanggal',
    align: 'left',
    field: row => row.created_at,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'solusi',
    required: true,
    label: 'Solusi / Tindakan',
    align: 'left',
    field: row => row.solusi,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'status', align: 'center', label: 'Verifikasi', field: 'is_active', sortable: true },
]

const storeRef = useRefStore();
const storLaporanHarian = useLaporanHarianStore();
export default defineComponent({
  name: 'laporan-harian-data',
  setup() {
    const state = reactive({
      search: null,
      dialogShow: computed(() => storeCategoryJabatan.dialog.form),
      dialogTitle: 'Penambahan Data',
      isLoading: computed(() => storeCategoryJabatan.isLoading)
    });
    const table = reactive({
      data: computed(() => {
        const data = storLaporanHarian.data.data.map((e, index) => {
          e.index = index + 1
          return e
        })
        if (state.search == null || state.search == "") {
          return data;
        }
        return data.filter((fn) => {
          console.log(fn.nama)
          return fn.nama.toLowerCase().includes(state.search.toLowerCase())
        })
      }),
      isLoading: computed(() => storLaporanHarian.data.isLoading)
    })
    onBeforeMount(() => storLaporanHarian.getData())
    return {
      columns,
      table,
      state,
      storLaporanHarian
    }
  }
})
</script>
<template>
  <div>
    <q-table :rows="table.data" :loading="table.isLoading" :columns="columns" row-key="name">
      <template v-slot:top>
        <div>
          <p class="text-weight-bold text-uppercase q-ma-none">Laporan Harian</p>
          <span class="text-caption">Surat Perintah Tugas</span>
        </div>
        <q-space />
        <q-btn label="Tambah Data" class="q-mr-sm radius5" color="blue-8" icon="add"
          :to="{ name: 'laporan-harian-form' }" />
        <q-btn label="Muat Ulang" class="q-mr-sm radius5" color="secondary" icon="refresh" flat
          @click="storLaporanHarian.getData()" />
        <q-input filled dense debounce="300" color="primary" v-model="state.search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props" class="bg-teal-1">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th />
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <span v-if="col.name == 'status'">
              <q-badge :color="col.value ? 'positive' : 'red-5'"
                :label="col.value ? 'Verfikasi' : 'Belum di Verifikasi'" />
            </span>
            <span v-else>
              {{ col.value }}
            </span>
          </q-td>
          <q-td width="200px">
            <div class="q-gutter-sm">
              <q-btn label="Rincian Data" icon="edit" class="radius5" color="secondary" unelevated
                :to="{ name: 'laporan-harian-detail', query: { id: props.row.spt_laporan_id } }" />
              <q-btn icon="delete" class="radius5" color="red-5" unelevated
                @click="storeCategoryJabatan.dataDelete(props.row.category_jabatan_id)" />

            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
