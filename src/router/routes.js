const routes = [
  {
    path: "/",
    redirect: { name: "beranda" },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "beranda",
        name: "beranda",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "mapping",
        name: "mapping",
        component: () => import("src/pages/mapping/index.vue"),
      },
      {
        path: "master/data",
        name: "master-data",
        component: () => import("pages/master/index.vue"),
      },
      {
        path: "users",
        name: "users",
        redirect: { name: "users-data" },
        component: () => import("pages/users/index.vue"),
        children: [
          {
            path: "data",
            name: "users-data",
            component: () => import("pages/users/users.vue"),
          },
          {
            path: "form",
            name: "users-form",
            component: () => import("pages/users/form.vue"),
          },
          {
            path: "profile",
            name: "users-profile",
            component: () => import("pages/users/profile.vue"),
          },
        ],
      },
      {
        path: "routing",
        name: "routing",
        redirect: { name: "routing-data" },
        component: () => import("pages/routing/index.vue"),
        children: [
          {
            path: "data",
            name: "routing-data",
            component: () => import("pages/routing/data.vue"),
          },
          {
            path: "form",
            name: "routing-form",
            component: () => import("pages/routing/form.vue"),
          },
        ],
      },
      {
        path: "pegawai",
        name: "pegawai",
        redirect: { name: "pegawai-data" },
        component: () => import("pages/pegawai/index.vue"),
        children: [
          {
            path: "data",
            name: "pegawai-data",
            component: () => import("pages/pegawai/pegawai.vue"),
          },
          {
            path: "form",
            name: "routing-form",
            component: () => import("pages/routing/form.vue"),
          },
        ],
      },
      {
        path: "spt",
        name: "spt",
        redirect: { name: "spt-data" },
        component: () => import("pages/spt/index.vue"),
        children: [
          {
            path: "data",
            name: "spt-data",
            component: () => import("pages/spt/spt.vue"),
          },
          {
            path: "detail",
            name: "spt-detail",
            component: () => import("pages/spt/detail/data.vue"),
          },
          {
            path: "form",
            name: "spt-form",
            component: () => import("pages/spt/form.vue"),
          },
        ],
      },
      {
        path: "laporan",
        name: "laporan",
        component: () => import("pages/laporan/index.vue"),
        children: [
          {
            path: "harian",
            name: "laporan-harian",
            component: () => import("pages/laporan/harian/data.vue"),
          },
          {
            path: "harian/detail",
            name: "laporan-harian-detail",
            component: () => import("pages/laporan/harian/detail/data.vue"),
          },
          {
            path: "harian/form",
            name: "laporan-harian-form",
            component: () => import("pages/laporan/harian/form.vue"),
          },
          {
            path: "kejadian/form",
            name: "laporan-kejadian-form",
            component: () => import("pages/laporan/kejadian/form.vue"),
          },
          {
            path: "kejadian/detail/:v",
            name: "laporan-kejadian-detail",
            component: () => import("pages/laporan/kejadian/detail/index.vue"),
          },
          {
            path: "informasi/form",
            name: "laporan-informasi-form",
            component: () => import("pages/laporan/informasi/form.vue"),
          },
          {
            path: "informasi/detail/:v",
            name: "laporan-informasi-detail",
            component: () => import("pages/laporan/informasi/detail/index.vue"),
          },
          {
            path: "detail1",
            name: "spt-detail1",
            component: () => import("pages/spt/detail/data.vue"),
          },
          {
            path: "form",
            name: "spt-form",
            component: () => import("pages/spt/form.vue"),
          },
        ],
      },
      {
        path: "acl",
        name: "acl",
        component: () => import("pages/acl/index.vue"),
        children: [
          {
            path: "modul",
            name: "acl-modul",
            component: () => import("pages/acl/modul/modul.vue"),
          },
          {
            path: "roles",
            name: "acl-roles",
            component: () => import("pages/acl/roles/roles.vue"),
          },
          {
            path: "roles/form",
            name: "acl-roles-form",
            component: () => import("pages/acl/roles/form.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/pages",
    component: () => import("layouts/PageLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("pages/login/index.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
