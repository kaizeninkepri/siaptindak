<script>
import { useRefStore } from 'stores/ref';
import { defineComponent, reactive, computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useUnsurStore } from 'stores/master';
const storeUndang = useUnsurStore();
export default defineComponent({
  name: 'master-unsur-form',
  setup() {
    const form = storeUndang.form
    const myForm = ref(null);
    const isLoading = computed(() => storeUndang.isLoading)
    onBeforeUnmount(() => storeUndang.resetForm())
    return {
      form,
      myForm,
      isLoading,
      storeUndang,
      async onActionForm() {
        const DB = async () => {
          await storeUndang.dataInsert()
          storeUndang.dialog.form = false
          storeUndang.resetForm()
        }
        myForm.value.validate().then(success => {
          if (success) {
            DB()
          }

        })

      }
    }
  }
})
</script>
<template>
  <div>
    <q-form ref="myForm">
      <div class="row">
        <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
          <q-input filled dense v-model="form.nama" label="Nama Unsur"
            :rules="[val => val && val.length > 0 || 'Please type something']" />
        </div>
        <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
          <q-checkbox label="Aktif" v-model="form.is_active" />
        </div>
      </div>
    </q-form>
    <div class="q-mt-md q-gutter-sm">
      <q-btn label="Simpan" color="primary" class="radius5" @click="onActionForm" />
      <q-btn label="Batal" color="grey-8" flat class="radius5" @click="storeUndang.dialog.form = false" />
    </div>
    <q-inner-loading :showing="isLoading" label="Mohon Menunggu, memproses data..." label-class="text-secondary"
      label-style="font-size: 1.1em" />
  </div>
</template>
