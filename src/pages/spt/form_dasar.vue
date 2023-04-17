<script>
import { defineComponent, computed, ref, onBeforeMount } from "vue";
import { useSptStore } from "stores/spt";
import { useUndangStore } from "stores/master";
const storeSpt = useSptStore();
const storeDasar = useUndangStore()

export default defineComponent({
  name: "spt-form-dasar",
  setup() {
    const form = storeSpt.spt
    const search = ref(null)
    const dasar = computed(() => {
      const data = storeDasar.data.data.filter((fe) => fe.is_active == true)
      if (search.value == '' || search.value == null) {
        return data
      }
      return data.filter((fn) => fn.nama.toLowerCase().includes(search.value.toLowerCase()))
    });
    onBeforeMount(() => {
      if (storeDasar.data.data.length == 0) {
        storeDasar.getData()
        return
      }
    })
    return {
      dasar,
      form,
      search,
      async onReload() {
        await storeDasar.getData()
        search.value = null
      }

    };
  },
});
</script>
<template>
  <div>
    <div class="row q-col-gutter-sm items-center">
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <p class="q-mb-xs text-grey-9">Dasar Surat Perintah Tugas</p>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <div class="q-gutter-sm">
          <q-btn label="Refresh" icon="refresh" flat color="secondary" @click="onReload" />
        </div>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-right">
        <q-input dense placeholder="Pencarian" v-model="search" />
      </div>
    </div>
    <div class="q-gutter-sm q-mt-md">
      <q-item tag="label" v-ripple v-for="(d, dIndex) in dasar" :key="dIndex">
        <q-item-section avatar top>
          <q-checkbox class="q-ma-none" v-model="form.dasar" :val="d.undang_id" />
        </q-item-section>
        <q-item-section top>
          <q-item-label>{{ d.nama }}</q-item-label>
        </q-item-section>
      </q-item>

    </div>
  </div>
</template>
