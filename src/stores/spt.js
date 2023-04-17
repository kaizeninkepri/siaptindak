import { defineStore } from "pinia";
import { useAuthStore } from "stores/auth";
import { SessionStorage, LocalStorage } from "quasar";
import { api } from "boot/axios";
import { Notify } from "quasar";
const today = `${new Date().getFullYear()}/0${
  new Date().getMonth() + 1
}/${new Date().getDate()}`;
const jam =
  new Date().getHours() +
  ":" +
  (new Date().getMinutes() < 10 ? "0" : "") +
  new Date().getMinutes();
export const useSptStore = defineStore("useSptStore", {
  state: () => ({
    onDialogAdd: false,
    headerTittle: "Formulir Penambahan Surat Perintah Tugas",
    isLoading: false,
    spt: {
      spt_id: null,
      tgl_awal: today,
      tgl_akhir: today,
      routing_id: null,
      routing_step_id: 1,
      dasar: [],
      perihal: "",
      kecamatan: null,
      kelurahan: null,
      tempat: null,
      jam: jam,
      isAllkota: false,
      user_id: useAuthStore().active.id,
      petugas: [
        {
          spt_pegawai_id: null,
          pegawai_id: null,
          jabatan_spt: "Koordinator",
        },
      ],
      lat: 0.91599,
      lng: 104.4634,
    },
    onDetail: {
      isLoading: false,
      data: {
        petugas: [],
        dasar: [],
        history: [
          {
            content: null,
          },
        ],
        step: {
          nama: null,
        },
      },
    },
    data: {
      isLoading: true,
      data: [],
    },
    pegawai: {
      isLoading: true,
      data: [],
    },
  }),
  // persist: true,
  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    BackToSptData() {
      LocalStorage.remove("useSptStore");
      this.onDialogAdd = false;
      this.spt = {
        spt_id: null,
        tgl_awal: today,
        tgl_akhir: today,
        routing_id: null,
        routing_step_id: 1,
        dasar: [],
        perihal: "",
        kecamatan: null,
        kelurahan: null,
        tempat: null,
        jam: jam,
        isAllkota: false,
        user_id: useAuthStore().active.id,
        petugas: [
          {
            spt_pegawai_id: null,
            pegawai_id: null,
            jabatan_spt: "Koordinator",
          },
        ],
      };
    },
    async getData() {
      this.data.isLoading = true;
      await api
        .post("/spt", {
          type: "spt-data",
        })
        .then((e) => {
          this.data.data = e.data.data;
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          this.data.isLoading = false;
        });
    },
    async dataById(id) {
      this.onDetail.isLoading = true;
      await api
        .post("/spt", {
          type: "spt-byId",
          id: id,
        })
        .then((e) => {
          this.onDetail.data = e.data.data;
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          this.onDetail.isLoading = false;
        });
    },
    async dataInsert() {
      this.isLoading = true;
      await api
        .post("/spt", {
          type: "spt-insert",
          data: this.spt,
        })
        .then((e) => {
          this.BackToSptData();
          this.router.push({
            name: "spt-detail",
            query: { id: e.data.data.spt_id },
          });
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          this.isLoading = false;
        });
    },
    async pegawaiAvaibaleGet() {
      this.pegawai.isLoading = true;
      await api
        .post("/spt", {
          type: "spt-pegawaiAvaiable",
        })
        .then((e) => {
          this.pegawai.data = e.data.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally((result) => {
          this.pegawai.isLoading = false;
        });
    },
  },
});

export const useLaporanHarianStore = defineStore("useLaporanStore", {
  state: () => ({
    data: {
      isLoading: true,
      data: [],
    },
    onDetail: {
      data: {
        lat: 0.91599,
        lng: 104.4634,
      },
      isLoading: false,
    },
    laporan: {
      isLoading: false,
      spt: {
        sptupload: { nomor: null },
        dasar: [],
      },
      spt_laporan_id: null,
      spt_id: null,
      spt_pegawai_id: useAuthStore().active.pegawai_id,
      solusi: null,
      saran: "",
      tempat: null,
      unsur_sub_id: null,
      unsur_id: null,
      temuan: "",
      jam_selesai: null,
      lat: 0.91599,
      lng: 104.4634,
      attacemnt: [
        {
          spt_file_id: null,
          nomor: null,
          berkas: null,
          url: null,
          spt_id: null,
          kategori: "LAPORAN",
          user_id: useAuthStore().active.id,
        },
      ],
    },
  }),
  // persist: true,
  actions: {
    async getData() {
      this.data.isLoading = true;
      await api
        .post("/spt", {
          type: "laporan-by-petugas-data",
          userId: useAuthStore().active.id,
        })
        .then((e) => {
          this.data.data = e.data.data;
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          this.data.isLoading = false;
        });
    },
    async getDataById(id) {
      this.onDetail.isLoading = true;
      await api
        .post("/spt", {
          type: "laporan-harianById",
          id: id,
        })
        .then((e) => {
          this.onDetail.data = e.data.data;
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          this.onDetail.isLoading = false;
        });
    },
    async insertDataWithUpload() {
      await this.insertData();
      await this.unggahLaporanFile();
      await this.router.push({ name: "laporan" });
    },
    async insertData() {
      this.laporan.isLoading = true;
      await api
        .post("/spt", {
          type: "laporan-by-petugas",
          data: this.laporan,
        })
        .then((e) => {
          //  this.data.data = e.data.data;
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          this.laporan.isLoading = false;
        });
    },
    async unggahLaporanFile() {
      this.laporan.isLoading = true;
      for (var i = 0; i < this.laporan.attacemnt.length; i++) {
        const data = new FormData();
        data.append("type", "spt-unggah-laporan");
        data.append("documentFile", this.laporan.attacemnt[i].berkas);
        data.append("data", JSON.stringify(this.laporan.attacemnt[i]));
        data.append(
          "spt_pegawai_id",
          JSON.stringify(this.laporan.spt_pegawai_id)
        );
        await api.post("/spt/unggah", data).then((e) => {
          Notify.create({
            message: "Berhasil Mengunggah Surat Perintah Tugas",
            color: "blue-8",
            icon: "info",
          });
        });
      }
      this.laporan.isLoading = false;
    },
    addAttacment() {
      this.laporan.attacemnt.push({
        spt_file_id: null,
        nomor: null,
        berkas: null,
        url: null,
        spt_id: null,
        kategori: "LAPORAN",
        user_id: useAuthStore().active.id,
      });
    },
  },
});

export const useLaporanKejadianStore = defineStore("useLaporanKejadianStore", {
  state: () => ({
    data: {
      isLoading: true,
      data: [],
    },
    laporan: {
      isLoading: false,
      laporan_kejadian_id: null,
      kejadian: {
        laporan_kejadian_id: null,
        nomor: null,
        pelapor: useAuthStore().active.pegawai_id,
        kejadian_tgl: today,
        kejadian_jam: jam,
        kejadian_tempat: null,
        deskripsi: "",
        operandi: "",
        pasal_pelanggaran: [],
        tindakan: {
          laporan_kejadian_tindakan_id: null,
          laporan_kejadian_id: null,
          tindakan: null,
          masa_tenggang_awal: today,
          masa_tenggang_akhir: today,
          user_id: useAuthStore().active.pegawai_id,
        },
        spt_id: 0,
        spt_laporan_id: 0,
        laporan_informasi_id: 0,
        routing_id: 2,
        routing_step_id: 7,
        person: [
          {
            laporan_kejadian_person_id: null,
            nik: null,
            nama: null,
            alamat: null,
            laporan_kejadian_id: null,
            kategori: "PELAKU",
            hp: null,
            berkas: null,
            url: null,
          },
        ],
        attacemnt: [
          {
            laporan_kejadian_file_id: null,
            laporan_kejadian_id: null,
            berkas: null,
            url: null,
            nama: null,
            kategori: "BARANG BUKTI",
            user_id: useAuthStore().active.pegawai_id,
          },
        ],
        lat: 0.91599,
        lng: 104.4634,
        kategori: "kejadian",
      },
    },
    onDetail: {
      isLoading: false,
      data: {
        laporan_kejadian_id: null,
        pelapor: {
          nama: null,
        },
        person: [],
        attacemnt: [],
        step: {
          nama: null,
        },
        lat: 0.91599,
        lng: 104.4634,
      },
    },
  }),
  // persist: true,
  actions: {
    async getData() {
      this.data.isLoading = true;
      await api
        .post("/laporan", {
          type: "laporan-kejadian-data",
          userId: useAuthStore().active.id,
        })
        .then((e) => {
          this.data.data = e.data.data;
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          this.data.isLoading = false;
        });
    },
    async getDataById(id) {
      this.onDetail.isLoading = true;
      await api
        .post("/laporan", {
          type: "laporan-kejadian-byId",
          id: id,
        })
        .then((e) => {
          this.onDetail.data = e.data.data;
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          this.onDetail.isLoading = false;
        });
    },
    async insertDataWithUpload() {
      await this.insertData();
      await this.UnggahDataPerson();
      await this.UnggahDataFiles();
      await this.router.push({ name: "laporan" });
    },
    async insertData() {
      this.laporan.isLoading = true;
      await api
        .post("/laporan", {
          type: "laporan-kejadian",
          data: this.laporan.kejadian,
        })
        .then((e) => {
          this.laporan.laporan_kejadian_id = e.data.data.laporan_kejadian_id;
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          this.laporan.isLoading = false;
        });
    },
    async UnggahDataPerson() {
      this.laporan.isLoading = true;
      for (var i = 0; i < this.laporan.kejadian.person.length; i++) {
        const data = new FormData();
        data.append("type", "laporan-unggah-person");
        data.append("documentFile", this.laporan.kejadian.person[i].berkas);
        data.append("data", JSON.stringify(this.laporan.kejadian.person[i]));
        data.append("lkId", JSON.stringify(this.laporan.laporan_kejadian_id));
        await api.post("/laporan/unggah", data).then((e) => {
          Notify.create({
            message: "Berhasil Mengunggah Pelaku Dan Saksi-Saksi",
            color: "blue-8",
            icon: "info",
          });
        });
      }
      this.laporan.isLoading = false;
    },
    async UnggahDataFiles() {
      this.laporan.isLoading = true;
      for (var i = 0; i < this.laporan.kejadian.attacemnt.length; i++) {
        const data = new FormData();
        data.append("type", "laporan-unggah-files");
        data.append("documentFile", this.laporan.kejadian.attacemnt[i].berkas);
        data.append("data", JSON.stringify(this.laporan.kejadian.attacemnt[i]));
        data.append("lkId", JSON.stringify(this.laporan.laporan_kejadian_id));
        await api.post("/laporan/unggah", data).then((e) => {
          Notify.create({
            message: "Berhasil Mengunggah Pelaku Dan Saksi-Saksi",
            color: "blue-8",
            icon: "info",
          });
        });
      }
      this.laporan.isLoading = false;
    },
    addPersonKejadian() {
      this.laporan.kejadian.person.push({
        laporan_kejadian_person_id: null,
        nik: null,
        nama: null,
        alamat: null,
        laporan_kejadian_id: null,
        kategori: "SAKSI",
        hp: null,
        berkas: null,
        url: null,
      });
    },
    addFilesKejadian() {
      this.laporan.kejadian.attacemnt.push({
        laporan_kejadian_file_id: null,
        laporan_kejadian_id: null,
        berkas: null,
        url: null,
        nama: null,
        kategori: "BARANG BUKTI",
        user_id: useAuthStore().active.pegawai_id,
      });
    },
  },
});

export const useLaporanInformasiStore = defineStore(
  "useLaporanInformasiStore",
  {
    state: () => ({
      data: {
        isLoading: true,
        data: [],
      },
      laporan: {
        isLoading: false,
        laporan_kejadian_id: null,
        kejadian: {
          laporan_kejadian_id: null,
          nomor: null,
          pelapor: useAuthStore().active.pegawai_id,
          kejadian_tgl: today,
          kejadian_jam: jam,
          kejadian_tempat: null,
          deskripsi: "",
          operandi: "",
          pasal_pelanggaran: [],
          tindakan: {
            laporan_kejadian_tindakan_id: null,
            laporan_kejadian_id: null,
            tindakan: null,
            masa_tenggang_awal: today,
            masa_tenggang_akhir: today,
            user_id: useAuthStore().active.pegawai_id,
          },
          spt_id: 0,
          spt_laporan_id: 0,
          laporan_informasi_id: 0,
          routing_id: 2,
          routing_step_id: 7,
          person: [
            {
              laporan_kejadian_person_id: null,
              nik: null,
              nama: null,
              alamat: null,
              laporan_kejadian_id: null,
              kategori: "NARASUMBER",
              hp: null,
              berkas: null,
              url: null,
            },
          ],
          attacemnt: [
            {
              laporan_kejadian_file_id: null,
              laporan_kejadian_id: null,
              berkas: null,
              url: null,
              nama: null,
              kategori: "BARANG BUKTI",
              user_id: useAuthStore().active.pegawai_id,
            },
          ],
          lat: 0.91599,
          lng: 104.4634,
          kategori: "informasi",
        },
      },
      onDetail: {
        isLoading: false,
        data: {
          laporan_kejadian_id: null,
          pelapor: {
            nama: null,
          },
          person: [],
          attacemnt: [],
          step: {
            nama: null,
          },
          lat: 0.91599,
          lng: 104.4634,
        },
      },
    }),
    // persist: true,
    actions: {
      async getData() {
        this.data.isLoading = true;
        await api
          .post("/laporan", {
            type: "laporan-informasi-data",
            userId: useAuthStore().active.id,
          })
          .then((e) => {
            this.data.data = e.data.data;
          })
          .catch((error) => {
            Notify.create({
              message: error.response.data.messages,
              color: "negative",
              icon: "error",
            });
          })
          .finally((result) => {
            this.data.isLoading = false;
          });
      },
      async getDataById(id) {
        this.onDetail.isLoading = true;
        await api
          .post("/laporan", {
            type: "laporan-informasi-byId",
            id: id,
          })
          .then((e) => {
            this.onDetail.data = e.data.data;
          })
          .catch((error) => {
            Notify.create({
              message: error.response.data.messages,
              color: "negative",
              icon: "error",
            });
          })
          .finally((result) => {
            this.onDetail.isLoading = false;
          });
      },
      async insertDataWithUpload() {
        await this.insertData();
        await this.UnggahDataPerson();
        // await this.UnggahDataFiles();
        await this.router.push({ name: "laporan", query: { p: 2 } });
      },
      async insertData() {
        this.laporan.isLoading = true;
        await api
          .post("/laporan", {
            type: "laporan-kejadian",
            data: this.laporan.kejadian,
          })
          .then((e) => {
            this.laporan.laporan_kejadian_id = e.data.data.laporan_kejadian_id;
          })
          .catch((error) => {
            Notify.create({
              message: error.response.data.messages,
              color: "negative",
              icon: "error",
            });
          })
          .finally((result) => {
            this.laporan.isLoading = false;
          });
      },
      async UnggahDataPerson() {
        this.laporan.isLoading = true;
        for (var i = 0; i < this.laporan.kejadian.person.length; i++) {
          const data = new FormData();
          data.append("type", "laporan-unggah-person");
          data.append("documentFile", this.laporan.kejadian.person[i].berkas);
          data.append("data", JSON.stringify(this.laporan.kejadian.person[i]));
          data.append("lkId", JSON.stringify(this.laporan.laporan_kejadian_id));
          await api.post("/laporan/unggah", data).then((e) => {
            Notify.create({
              message: "Berhasil Mengunggah Pelaku Dan Saksi-Saksi",
              color: "blue-8",
              icon: "info",
            });
          });
        }
        this.laporan.isLoading = false;
      },
      async UnggahDataFiles() {
        this.laporan.isLoading = true;
        for (var i = 0; i < this.laporan.kejadian.attacemnt.length; i++) {
          const data = new FormData();
          data.append("type", "laporan-unggah-files");
          data.append(
            "documentFile",
            this.laporan.kejadian.attacemnt[i].berkas
          );
          data.append(
            "data",
            JSON.stringify(this.laporan.kejadian.attacemnt[i])
          );
          data.append("lkId", JSON.stringify(this.laporan.laporan_kejadian_id));
          await api.post("/laporan/unggah", data).then((e) => {
            Notify.create({
              message: "Berhasil Mengunggah Pelaku Dan Saksi-Saksi",
              color: "blue-8",
              icon: "info",
            });
          });
        }
        this.laporan.isLoading = false;
      },
      addPersonKejadian() {
        this.laporan.kejadian.person.push({
          laporan_kejadian_person_id: null,
          nik: null,
          nama: null,
          alamat: null,
          laporan_kejadian_id: null,
          kategori: "SAKSI",
          hp: null,
          berkas: null,
          url: null,
        });
      },
      addFilesKejadian() {
        this.laporan.kejadian.attacemnt.push({
          laporan_kejadian_file_id: null,
          laporan_kejadian_id: null,
          berkas: null,
          url: null,
          nama: null,
          kategori: "BARANG BUKTI",
          user_id: useAuthStore().active.pegawai_id,
        });
      },
    },
  }
);

export const useDashboardStore = defineStore("useDashboardStore", {
  state: () => ({
    data: {
      isLoading: true,
      data: [],
    },
  }),
  // persist: true,
  actions: {
    async getData() {
      this.data.isLoading = true;
      await api
        .post("/dashboard", {
          type: "spt-by-pegawai",
          userId: useAuthStore().active.id,
        })
        .then((e) => {
          this.data.data = e.data.data;
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.messages,
            color: "negative",
            icon: "error",
          });
        })
        .finally((result) => {
          this.data.isLoading = false;
        });
    },
  },
});
