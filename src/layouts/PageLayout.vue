<template>
  <q-layout class="body--light1">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageLayout",
});
</script>
