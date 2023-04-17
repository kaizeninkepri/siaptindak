<script>
import { useRefStore } from "stores/ref";
import { useAuthStore } from "stores/auth";
export default {
  name: "main-sidebar",
  setup() {
    const storeRef = useRefStore();
    const storeAuth = useAuthStore();
    return {
      storeRef,
      storeAuth,
      toggleLeftDrawer() {
        storeRef.sideBar.left = !storeRef.sideBar.left;
      },
    };
  },
};
</script>
<template>
  <div>
    <q-drawer v-model="storeRef.sideBar.left" :width="125" class="q-pa-sm">
      <div class="sidebar q-pa-sm radius10 shadow-2">
        <div class="text-center q-mt-md">
          <q-avatar>
            <q-img src="/images/logo.png" />
          </q-avatar>
        </div>
        <div class="row items-center justify-center sidebarHeight">


          <div class="text-center text-white">
            <q-list v-for="(i, index) in storeAuth.sidebar" :key="index">
              <q-expansion-item :group="index.toString()" v-if="i.child.length && i.permission.read" dense dense-toggle
                expand-separator>
                <template v-slot:header>
                  <p class="q-ma-xs full-width">
                    <q-icon size="md" :name="i.icon" style="margin-left: 20px;" />
                    <q-tooltip anchor="center right" class="bg-amber text-black shadow-4" self="center left"
                      :offset="[10, 10]">{{ i.nama }}</q-tooltip>
                  </p>
                </template>
                <div v-for="(c, Cindex) in i.child" :key="Cindex">
                  <q-item v-if="c.permission.read" dense clickable :to="{ name: c.route_name }">
                    <q-item-section class="q-pl-md">
                      <p class="q-ma-xs full-width">
                        <q-icon size="xs" :name="c.icon" color="amber" class="q-mr-sm" />
                        <q-tooltip anchor="center right" class="bg-amber text-black shadow-4" self="center left"
                          :offset="[10, 10]">{{ c.nama }}</q-tooltip>
                      </p>
                    </q-item-section>
                  </q-item>
                </div>
              </q-expansion-item>
            </q-list>
            <q-list v-for="(i, index) in storeAuth.sidebar" :key="index" dense class="q-mb-md">
              <q-item v-if="!i.child.length && i.permission.read" dense clickable :to="{ name: i.route_name }"
                style="heigth: 40px">
                <q-item-section>
                <p class="q-mt-xs q-mb-xs">
                  <q-icon size="md" :name="i.icon" class="q-mr-sm" />
                  <q-tooltip anchor="center right" class="bg-amber text-black shadow-4" self="center left"
                    :offset="[10, 10]">{{ i.nama }}</q-tooltip>
                </p>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="absolute-bottom q-pa-sm text-center">
          <q-btn icon="logout" flat color="white" @click="storeRef.dialog.logout = true" style="margin-bottom: 20px;">
            <q-tooltip class="bg-amber text-black shadow-4">Keluar Aplikasi</q-tooltip>
          </q-btn>

        </div>
      </div>
    </div>
    <!-- <div class="column items-between q-mt-xl">
        <div class="text-center">
          <q-img src="/images/profile.png" width="80px" />
          <p class="text-weight-bold q-mt-sm text-orange-8 q-mb-none">
            {{ storeAuth.active.email }}
          </p>
          <p class="text-caption text-weight-bold q-mt-none text-grey-7">
            {{ storeAuth.active.devisi }}
          </p>
        </div>
        <div>
          <q-list v-for="(i, index) in storeAuth.sidebar" :key="index">
            <q-expansion-item group="somegroup" v-if="i.child.length && i.permission.read" dense dense-toggle
              expand-separator>
              <template v-slot:header>
                <p class="q-ma-xs full-width">
                  <q-icon size="sm" :name="i.icon" class="q-mr-sm" />
                  {{ i.nama }}
                </p>
              </template>
              <div v-for="(c, Cindex) in i.child" :key="Cindex">
                <q-item v-if="c.permission.read" dense clickable :to="{ name: c.route_name }">
                  <q-item-section class="q-pl-md">
                    <p class="q-ma-xs full-width">
                      <q-icon size="xs" name="square" color="blue-grey-5" class="q-mr-sm" />
                      {{ c.nama }}
                    </p>
                  </q-item-section>
                </q-item>
              </div>
            </q-expansion-item>
          </q-list>
          <q-list v-for="(i, index) in storeAuth.sidebar" :key="index" dense>
            <q-item v-if="!i.child.length && i.permission.read" dense clickable :to="{ name: i.route_name }"
              style="heigth: 40px">
              <q-item-section>
                        <p class="q-mt-xs">
                          <q-icon size="sm" :name="i.icon" class="q-mr-sm" />
                          {{ i.nama }}
                        </p>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="fixed-bottom q-pa-sm">
                  <q-item dense clickable v-ripple @click="storeRef.dialog.logout = true">
                    <q-item-section avatar>
                      <q-icon color="negative" name="logout" />
                    </q-item-section>

                    <q-item-section>keluar Aplikasi</q-item-section>
                  </q-item>
                </div>
              </div> -->
    </q-drawer>
  </div>
</template>
