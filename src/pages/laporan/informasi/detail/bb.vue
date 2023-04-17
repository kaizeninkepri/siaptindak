<script>
import { defineComponent, defineAsyncComponent, computed, onBeforeMount, reactive, ref, onMounted } from "vue";
import { useSptStore } from "stores/spt";
import { useRoute } from "vue-router";
import { useLaporanKejadianStore } from "stores/spt";
const storeLK = useLaporanKejadianStore();
const storeSpt = useSptStore();
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
    label: 'Nama Barang Bukti',
    align: 'left',
    field: row => row.nama,
    format: val => `${val}`,
    sortable: true
  },
]
export default defineComponent({
  name: "laporan-detail-kejadian-data",
  props: ['laporanKejadianId'],
  setup(props) {
    const Route = useRoute();
    onMounted(() => {
      if (storeLK.onDetail.data.laporan_kejadian_id == null) {
        return
      }
      storeLK.getDataById(props.laporanKejadianId)
    })
    const search = ref(null)
    const isLoading = computed(() => storeLK.onDetail.isLoading)
    const lk = computed(() => storeLK.onDetail.data)
    const pelaku = computed(() => {
      const data = storeLK.onDetail.data.attacemnt.map((e, index) => {
        e.index = index + 1
        return e
      })
      if (search.value == null || search.value == "") {
        return data
      }
      return data.filter((fn) => {
        return fn.nama.toLowerCase().includes(search.value.toLowerCase())
      })
    })
    return {
      isLoading,
      lk,
      pelaku,
      search,
      columns
    }
  }
});
</script>
<template>
  <div>
    <q-table :rows="pelaku" :columns="columns" row-key="name" class="bg-amber-1" flat :loading="isLoading">
      <template v-slot:top>
        <div>
          <p class="text-weight-bold text-uppercase q-ma-none">Daftar Data Barang Bukti</p>
          <span class="text-caption">Laporan Kejadian</span>
        </div>
        <q-space />
        <q-input filled dense debounce="300" color="primary" v-model="search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props" class="bg-amber-2">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th />
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <span v-if="col.name == 'kategori'">
              <q-badge :color="col.value == 'PELAKU' ? 'red-5' : 'blue-8'" :label="col.value" />
            </span>
            <span v-else>
              {{ col.value }}
            </span>
          </q-td>
          <q-td width="200px">
            <div class="q-gutter-sm">
              <q-btn label="Lampiran" color="blue-8" icon="visibility" outline :href="props.row.url" size="sm"
                class="radius5" target="_blank" />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
