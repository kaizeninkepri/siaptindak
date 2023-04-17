<script>
import { useRefStore } from 'stores/ref';
import { defineComponent, reactive, computed, onBeforeMount, ref, defineAsyncComponent } from 'vue';
import { useJabatanCategoryStore } from 'stores/master';
import { useLaporanKejadianStore } from 'stores/spt';
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
    name: 'pelapor',
    required: true,
    label: 'Pelapor',
    align: 'left',
    field: row => row.pelapor == null ? '-' : row.pelapor.nama,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'tanggal',
    required: true,
    label: 'Tanggal',
    align: 'left',
    field: row => row.kejadian_tgl,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'jam',
    required: true,
    label: 'Jam',
    align: 'center',
    field: row => row.kejadian_jam,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'tempat',
    required: true,
    label: 'Tempat',
    align: 'left',
    field: row => row.kejadian_tempat,
    format: val => `${val}`,
    sortable: true
  },
]

const storeRef = useRefStore();
const storeLK = useLaporanKejadianStore();
export default defineComponent({
  name: 'laporan-harian-data',
  setup() {
    const state = reactive({
      search: null,
      dialogShow: computed(() => storeCategoryJabatan.dialog.form),
      dialogTitle: 'Penambahan Data',
      isLoading: computed(() => storeLK.data.isLoading)
    });
    const table = reactive({
      data: computed(() => {
        const data = storeLK.data.data.map((e, index) => {
          e.index = index + 1
          return e
        })
        if (state.search == null || state.search == "") {
          return data;
        }
        return data.filter((fn) => {
          return fn.tempat.toLowerCase().includes(state.search.toLowerCase())
        })
      }),
      isLoading: computed(() => storeLK.data.isLoading)
    })
    onBeforeMount(() => storeLK.getData())
    return {
      columns,
      table,
      state,
      storeLK
    }
  }
})
</script>
<template>
  <div>
    <q-table :rows="table.data" :loading="table.isLoading" :columns="columns" row-key="name">
      <template v-slot:top>
        <div>
          <p class="text-weight-bold text-uppercase q-ma-none">Laporan Kejadian</p>
          <span class="text-caption">Surat Perintah Tugas</span>
        </div>
        <q-space />
        <q-btn label="Tambah Data" class="q-mr-sm radius5" color="blue-8" icon="add"
          :to="{ name: 'laporan-kejadian-form' }" />
        <q-btn label="Muat Ulang" class="q-mr-sm radius5" color="secondary" icon="refresh" flat
          @click="storeLK.getData()" />
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
              <q-btn label="Rincian Data" icon="next_plan" class="radius5" color="indigo-4" unelevated
                :to="{ name: 'laporan-kejadian-detail', params: { v: props.row.laporan_kejadian_id } }" />

            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
