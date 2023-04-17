<script>
import { defineComponent, defineAsyncComponent, computed, onBeforeMount, reactive } from "vue";
import { useSptStore } from "stores/spt";
import { useRoute } from "vue-router";
const storeSpt = useSptStore();

export default defineComponent({
  name: "laporan-detail-harian",
  setup() {
    const Route = useRoute();
    onBeforeMount(() => storeSpt.dataById(Route.query.id))

    const isLoading = computed(() => storeSpt.onDetail.isLoading)
    const spt = computed(() => storeSpt.onDetail.data)
    return {
      isLoading,
      spt
    }
  }
});
</script>
<template>
  <div>1</div>
</template>
