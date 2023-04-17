<script>
import { useRefStore } from 'stores/ref';
import { useDashboardStore } from 'stores/spt';
import { defineComponent, computed, ref, onBeforeMount } from 'vue';
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
    name: 'Nomor',
    required: true,
    label: 'Nomor SPT',
    align: 'left',
    field: row => row.spt.sptupload != null ? row.spt.sptupload.nomor : '-',
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'tanggal',
    required: true,
    label: 'Tanggal',
    align: 'left',
    field: row => row.spt.tgl_awal,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'jam',
    required: true,
    label: 'Jam',
    align: 'center',
    field: row => row.spt.jam,
    format: val => `${val} WIB`,
    classes: 'bg-blue-2',
    style: 'width: 100px'
  },
  {
    name: 'Tempat',
    required: true,
    label: 'Tempat',
    align: 'left',
    field: row => row.spt.tempat,
    format: val => `${val}`,
    sortable: true
  },
]


const storeRef = useRefStore();
const storeSptDashboard = useDashboardStore();
export default defineComponent({
  name: 'dashboard-table',
  setup() {
    onBeforeMount(() => storeSptDashboard.getData())
    const search = ref(null)
    const rows = computed(() => {
      const data = storeSptDashboard.data.data.map((e, index) => {
        e.index = index + 1
        return e
      })
      return data
    })
    return {
      columns,
      rows
    }
  }
})
</script>
<template>
  <div>
    <q-table :rows="rows" :columns="columns" row-key="name">
      <template v-slot:top>
        <div>
          <p class="text-weight-bold text-uppercase q-ma-none">DAFTAR LAPORAN YANG BELUM DI KERJAKAN</p>
          <span class="text-caption">SURAT PERINTAH TUGAS</span>
        </div>
      </template></q-table>
  </div>
</template>
