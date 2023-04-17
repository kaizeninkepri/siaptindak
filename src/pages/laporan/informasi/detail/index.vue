<script>
import { defineComponent, defineAsyncComponent, computed, onBeforeMount, onMounted, reactive, onUnmounted, onUpdated, onBeforeUnmount, onBeforeUpdate } from "vue";
import { useLaporanKejadianStore } from "stores/spt";
import { useRoute } from "vue-router";
const storeLK = useLaporanKejadianStore();

export default defineComponent({
  name: "laporan-detail-kejadian",
  components: {
    dataPage: defineAsyncComponent(() => import("./data.vue")),
  },
  setup() {
    const Route = useRoute();
    onMounted(async () => {
      await storeLK.getDataById(Route.params.v)
    })
    const laporanKejadianId = Route.params.v
    const isLoading = computed(() => storeLK.onDetail.isLoading)
    const lk = computed(() => storeLK.onDetail.data)
    return {
      isLoading,
      lk,
      laporanKejadianId
    }
  }
});
</script>
<template>
  <div class="row q-col-gutter-md">
    <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
      <dataPage :laporanKejadianId="laporanKejadianId" />
    </div>
  </div>
</template>
