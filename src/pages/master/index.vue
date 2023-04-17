<script>
import { useRefStore } from 'stores/ref';
import { defineComponent, reactive, defineAsyncComponent } from 'vue';

const storeRef = useRefStore();
export default defineComponent({
  name: 'master-index',
  preFetch({ store }) {
    storeRef.header.title = "Master Data Management";
    storeRef.header.subtitle = "Informasi Suatu cara untuk memperoleh, meningkatkan, dan berbagi data master";
  },
  components: {
    kategorJabatan: defineAsyncComponent(() => import("./kategori_jabatan/index.vue")),
    undangPage: defineAsyncComponent(() => import("./undang-undang/index.vue")),
    unsurPage: defineAsyncComponent(() => import("./unsur/index.vue")),
    unsurSubPage: defineAsyncComponent(() => import("./unsur_sub/index.vue")),
  },
  setup() {
    const tab = reactive({
      color: '',
      textColor: '',
      active: 'jabatan',
      colorDefault: 'grey-4',
      textColorDefault: 'black',
      activeDefault: 'jabatan'
    });
    return {
      storeRef,
      tab,
      onClickCategori(color, textColor, active) {
        tab.color = color
        tab.textColor = textColor
        tab.active = active
      }
    }
  }
})
</script>
<template>
  <div class="q-pa-md">
    <div class="row justify-between items-center q-col-gutter-md">
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
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
          <q-tab name="jabatan" icon="manage_accounts" label="Kategori Jabatan SPT"
            :class="[tab.active == 'jabatan' ? '' : 'bg-grey-4', 'q-mr-sm radius5']" />
          <q-tab name="Undang-Undang" icon="topic" label="Undang-Undang"
            :class="[tab.active == 'Undang-Undang' ? '' : 'bg-grey-4', 'q-mr-sm radius5']" />
          <q-tab name="kegiatan" icon="subject" label="Kegiatan"
            :class="[tab.active == 'kegiatan' ? '' : 'bg-grey-4', 'q-mr-sm radius5']" />
          <q-tab name="unsur" icon="notes" label="Unsur"
            :class="[tab.active == 'unsur' ? '' : 'bg-grey-4', 'q-mr-sm radius5']" />
          <q-tab name="unsurSub" icon="tab" label="Sub Unsur"
            :class="[tab.active == 'unsurSub' ? '' : 'bg-grey-4', 'q-mr-sm radius5']" />
        </q-tabs>
      </div>
    </section>
    <section class="q-mt-md">
      <kategorJabatan v-if="tab.active == 'jabatan' ? true : false" />
      <undangPage v-if="tab.active == 'Undang-Undang' ? true : false" />
      <unsurPage v-if="tab.active == 'unsur' ? true : false" />
      <unsurSubPage v-if="tab.active == 'unsurSub' ? true : false" />
    </section>
  </div>
</template>
