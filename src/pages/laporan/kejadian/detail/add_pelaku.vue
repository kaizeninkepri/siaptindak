<script>
import { defineComponent, defineAsyncComponent, computed, onBeforeMount, reactive, ref } from "vue";
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
    label: 'Nama Lengkap',
    align: 'left',
    field: row => row.nama,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'nik',
    required: true,
    label: 'Nomor Induk Kependudukan (NIK)',
    align: 'center',
    field: row => row.nik,
    format: val => `${val}`,
    style: 'width: 100px',
    sortable: true
  },
  {
    name: 'hp',
    required: true,
    label: 'No. HP / WA',
    align: 'left',
    field: row => row.hp,
    format: val => `${val}`,
    style: 'width: 400px'
  },
  {
    name: 'kategori',
    required: true,
    label: 'Kategori',
    align: 'left',
    field: row => row.kategori,
    format: val => `${val}`,
    style: 'width: 400px'
  },
]
export default defineComponent({
  name: "laporan-detail-kejadian-data",
  props: ['laporanKejadianId'],
  setup(props) {
    const Route = useRoute();
    onBeforeMount(() => {
      if (storeLK.onDetail.data.laporan_kejadian_id == null) {
        return
      }
      storeLK.getDataById(props.laporanKejadianId)
    })
    const search = ref(null)
    const isLoading = computed(() => storeLK.onDetail.isLoading)
    const lk = computed(() => storeLK.onDetail.data)
    const pelaku = computed(() => {
      const data = storeLK.onDetail.data.person.map((e, index) => {
        e.index = index + 1
        return e
      })
      if (search.value == null || search.value == "") {
        return data
      }
      return data.filter((fn) => {
        return fn.nama.toLowerCase().includes(search.value.toLowerCase()) ||
          fn.nik.toLowerCase().includes(search.value.toLowerCase())
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
