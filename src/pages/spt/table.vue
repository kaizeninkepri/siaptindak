<script>
import { defineComponent, defineAsyncComponent, computed, onBeforeMount, reactive } from "vue";
import { useSptStore } from "stores/spt";
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
    name: 'Code',
    required: true,
    label: 'No. Refrensi',
    align: 'left',
    field: row => row.code,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'petugas',
    required: true,
    label: 'Petugas',
    align: 'center',
    field: row => row.petugas.length,
    format: val => `${val}`,
    style: 'width: 100px',
    sortable: true
  },
  {
    name: 'tempat',
    required: true,
    label: 'Tempat',
    align: 'left',
    field: row => row.tempat,
    format: val => `${val}`,
    style: 'width: 400px'
  },
  {
    name: 'jam',
    required: true,
    label: 'Jam',
    align: 'center',
    field: row => row.jam,
    format: val => `${val} WIB`,
    classes: 'bg-blue-2',
    style: 'width: 100px'
  },
]
const storeSpt = useSptStore();
export default defineComponent({
  name: "spt-table",
  setup() {
    const rows = computed(() => {
      const data = storeSpt.data.data.map((e, index) => {
        e.index = index + 1
        return e
      })
      if (state.search == null || state.search == '') {
        return data;
      }
      return data.filter((fn) => {
        return fn.code.toLowerCase().includes(state.search.toLowerCase())
      })
    })
    const state = reactive({
      search: null,
      isLoading: computed(() => storeSpt.data.isLoading)
    })
    onBeforeMount(() => storeSpt.getData());
    return {
      columns,
      rows,
      state,
      storeSpt,
      onRefresh() {
        storeSpt.getData()
      }
    }
  }
});
</script>
<template>
  <div>
    <section>
      <div class="row q-col-gutter-md">
        <div class="col-lg-6 col-md-6 col-sm-8 col-xs-7">
          <q-input filled dense debounce="300" color="primary" v-model="state.search"
            label="Ketik Nomor Spt, Alamat, Pegawai">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-4 col-xs-5">
          <div class="q-gutter-xs">
            <q-btn unelevated class="radius5" color="primary" icon="post_add" @click="
              (storeSpt.onDialogAdd = true),
              (storeSpt.headerTittle = 'Formulir Pembuatan ' + i.nama),
              (storeSpt.spt.routing_id = i.routing_id)">
              <q-tooltip>Tambah SPT</q-tooltip>
            </q-btn>

            <q-btn unelevated class="radius5" color="amber-8" icon="refresh" @click="onRefresh">
              <q-tooltip>Muat Ulang Data</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
    </section>
    <q-table grid :rows="rows" :columns="columns" row-key="name" class="radius10" :loading="state.isLoading">
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card flat bordered>
            <q-expansion-item expand-separator icon="perm_identity" label="Account settings" caption="John Doe">
              <template v-slot:header>
                <q-item-section avatar top>

                  <h5 class="q-mt-sm text-weight-bold q-mb-md">{{ props.row.jam }}</h5>

                  <q-badge color="blue">{{ props.row.petugas.length }} Petugas</q-badge>
                </q-item-section>

                <q-item-section top>
                  <p class="q-mb-none">{{ props.row.dateSpt }}</p>
                  <p class="q-mb-none text-caption text-grey-8" v-if="props.row.sptupload">{{ props.row.sptupload.nomor }}
                  </p>
                  <p class="q-mb-none text-caption text-grey-8" v-if="!props.row.sptupload">-</p>
                  <p class="q-mb-none text-caption text-grey-10 text-italic">
                    <q-icon name='location_on' size="xs" color="red-5" /> {{ props.row.tempat }}
                  </p>
                </q-item-section>
              </template>
              <q-card>
                <q-card-section>
                  <p class="text-caption q-mb-none">Perihal</p>
                  <p>{{ props.row.perihal }}</p>
                  <p class="text-caption q-mb-none">Dasar</p>
                  <p v-for="(d, dIndex) in props.row.dasar_uud" :key="dIndex">{{ d.undang.nama }}</p>

                  <q-btn label="Rincian Data" unelevated color="primary" class="radius5" icon="source"
                    :to="{ name: 'spt-detail', query: { id: props.row.spt_id } }" />
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-separator />
            <q-circular-progress :value="80" size="20px" :thickness="0.4" color="orange" center-color="grey-4"
              track-color="transparent" class="q-ma-md" />

            <span class="text-caption">{{ props.row.stepDetail }}</span>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>
