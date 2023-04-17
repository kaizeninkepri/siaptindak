<script>
import { defineComponent, defineAsyncComponent, computed, onBeforeMount, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useRefStore } from "stores/ref";
const storeRef = useRefStore();
export default defineComponent({
  name: "laporan-index",
  components: {
    harianPage: defineAsyncComponent(() => import("./harian/data.vue")),
    kejadianPage: defineAsyncComponent(() => import("./kejadian/data.vue")),
    informasiPage: defineAsyncComponent(() => import("./informasi/data.vue")),
  },
  setup() {
    const route = useRoute()
    onBeforeMount(() => {
      if (route.query.p == 1) {
        tab.active = 'kejadian'
      }
      else if (route.query.p == 2) {
        tab.active = 'informasi'
      }
      storeRef.header.title = "Laporan Data Management";
      storeRef.header.subtitle = "Informasi Laporan Harian, Kejadian dan Informasi yang termonitoring secara realtime";
    })
    const tab = reactive({
      color: '',
      textColor: '',
      active: 'harian',
      colorDefault: 'grey-4',
      textColorDefault: 'black',
      activeDefault: 'jabatan'
    });
    return {
      storeRef,
      tab,
      route
    }
  }
});
</script>
<template>
  <q-page class="q-pa-md">
    <router-view v-if="route.name != 'laporan' ? true : false" />
    <div v-if="route.name == 'laporan' ? true : false">
      <div class="row justify-between items-center q-col-gutter-md">
        <div class="col-lg-5 col-md-5 col-xs-12 col-sm-12">
          <div class="text-h6">{{ storeRef.header.title }}</div>
          <p class="text-caption">{{ storeRef.header.subtitle }}</p>
        </div>
        <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">

        </div>
      </div>
      <section class="q-mt-md">
        <div class="q-gutter-md">
          <q-tabs align="left" dense v-model="tab.active" class="text-black radius5 q-mt-lg" indicator-color="teal-6"
            active-class="radius5" inline-label active-color="white" active-bg-color="teal-6">
            <q-tab name="harian" icon="view_day" label="Laporan Harian"
              :class="[tab.active == 'harian' ? '' : 'bg-grey-4', 'q-mr-sm radius5']" />
            <q-tab name="kejadian" icon="topic" label="Laporan Kejadian"
              :class="[tab.active == 'kejadian' ? '' : 'bg-grey-4', 'q-mr-sm radius5']" />
            <q-tab name="informasi" icon="contact_mail" label="Laporan Informasi"
              :class="[tab.active == 'informasi' ? '' : 'bg-grey-4', 'q-mr-sm radius5']" />

          </q-tabs>
        </div>
      </section>
      <section class="q-mt-md">
        <harianPage v-if="tab.active == 'harian' ? true : false" />
        <kejadianPage v-if="tab.active == 'kejadian' ? true : false" />
        <informasiPage v-if="tab.active == 'informasi' ? true : false" />
      </section>
    </div>
  </q-page>
</template>
