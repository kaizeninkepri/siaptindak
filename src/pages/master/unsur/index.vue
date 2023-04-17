<script>
import { useRefStore } from 'stores/ref';
import { defineComponent, reactive, computed, onBeforeMount, ref, defineAsyncComponent } from 'vue';
import { useUnsurStore } from 'stores/master';
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
    label: 'Nama Unsur',
    align: 'left',
    field: row => row.nama,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'is_active', align: 'center', label: 'Aktif', field: 'is_active', sortable: true },
]

const storeRef = useRefStore();
const storeUndang = useUnsurStore();
export default defineComponent({
  name: 'master-unsur-table',
  components: {
    formulir: defineAsyncComponent(() => import("./form.vue")),
  },
  setup() {
    const state = reactive({
      search: null,
      dialogShow: computed(() => storeUndang.dialog.form),
      dialogTitle: 'Penambahan Data',
      isLoading: computed(() => storeUndang.isLoading)
    });
    const table = reactive({
      data: computed(() => {
        const data = storeUndang.data.data.map((e, index) => {
          e.index = index + 1
          return e
        })
        if (state.search == null || state.search == "") {
          return data;
        }
        return data.filter((fn) => {
          return fn.nama.toLowerCase().includes(state.search.toLowerCase())
        })
      }),
      isLoading: computed(() => storeUndang.data.isLoading)
    })
    const form = storeUndang.form
    const myForm = ref(null);
    onBeforeMount(() => storeUndang.getData())
    return {
      columns,
      table,
      state,
      form,
      myForm,
      storeUndang,
      async onActionForm() {
        const DB = async () => {
          await storeUndang.dataInsert()
          state.dialogShow = false
        }
        myForm.value.validate().then(success => {
          if (success) {
            DB()
          }

        })

      },
      onFormShow(value, row) {
        if (value == 'add') {
          state.dialogTitle = 'Penambahan Data'
          storeUndang.dialog.form = true
          return
        }
        state.dialogTitle = 'Perubahan Data'
        storeUndang.form = row
        storeUndang.dialog.form = true
      }
    }
  }
})
</script>
<template>
  <div>
    <q-table :rows="table.data" :loading="table.isLoading" :columns="columns" row-key="name">
      <template v-slot:top>
        <div>
          <p class="text-weight-bold text-uppercase q-ma-none">Daftar Unsur</p>
          <span class="text-caption">Surat Perintah Tugas</span>
        </div>
        <q-space />
        <q-btn label="Tambah Data" class="q-mr-sm radius5" color="blue-8" icon="add" @click="onFormShow('add', '')" />
        <q-btn label="Muat Ulang" class="q-mr-sm radius5" color="secondary" icon="refresh" flat
          @click="storeUndang.getData()" />
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
            <span v-if="col.name == 'is_active'">
              <q-badge :color="col.value ? 'positive' : 'red-5'" :label="col.value ? 'Aktif' : 'non Aktif'" />
            </span>
            <span v-else>
              {{ col.value }}
            </span>
          </q-td>
          <q-td width="200px">
            <div class="q-gutter-sm">
              <q-btn label="Edit" icon="edit" class="radius5" color="secondary" unelevated
                @click="onFormShow('edit', props.row)" />
              <q-btn icon="delete" class="radius5" color="red-5" unelevated
                @click="storeUndang.dataDelete(props.row.unsur_id)" />

            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog persistent v-model="state.dialogShow">
      <q-card style="width: 700px; max-width: 80vw;" class="radius10">
        <q-item>
          <q-item-section avatar>
            <img src="/images/siaptindak.png" style="width:80px" />
          </q-item-section>
          <q-item-section></q-item-section>
          <q-item-section side class="text-black">
            <q-item-label>UNSUR</q-item-label>
            <q-item-label caption>{{ state.dialogTitle }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section>
          <formulir />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
