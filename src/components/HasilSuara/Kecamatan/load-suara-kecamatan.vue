<template>
  <div>
    <v-card flat>
      <v-card-title class="justify-center"> - SUARA KECAMATAN - </v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" class="col-lg-3 col-md-3 col-sm-12"></v-col>
          <v-col cols="12" class="col-lg-3 col-md-3 col-sm-12">
            <v-autocomplete
              label="pilih kota/kabupaten"
              outlined
              dense
              hide-details
              :items="dataKota"
              item-text="nama"
              item-value="uid"
              @change="(e) => actionKecamatan(e)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" class="col-lg-3 col-md-3 col-sm-12">
            <v-autocomplete
              label="pilih kecamatan"
              outlined
              dense
              hide-details
              :items="dataKecamatan"
              item-text="nama"
              item-value="uid"
              @change="(e) => populateDapil(e)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" class="col-lg-3 col-md-3 col-sm-12"></v-col>
        </v-row>
        <v-divider class="my-3"></v-divider>
        <v-tabs grow v-model="currentItems" background-color="yellow lighten-5">
          <v-tab href="#DPR_RI"> TANIA LAENA PUTRI, B.Sc </v-tab>
          <v-tab href="#DPRD_KOTA"> ASTRID LAENA PUTRI, S.H., M.H </v-tab>

          <v-tabs-items v-model="currentItems">
            <v-tab-item value="DPR_RI">
              <kecamatan-dpr-ri
                :kec="kec"
                :hasil-suara="hasilSuara"
                :kabupaten="namaKabupaten"
                :kecamatan="namaKecamatan"
              />
            </v-tab-item>
            <v-tab-item value="DPRD_KOTA"></v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>
    </v-card>
  </div>
</template>
    
    <script>
import { mapActions, mapGetters } from "vuex";
import kecamatanDprRi from "./kecamatan-dpr-ri.vue";
export default {
  components: { kecamatanDprRi },
  computed: {
    ...mapGetters({
      dataKota: "wilayah/kota",
      dataKecamatan: "wilayah/kecamatan",
      dataDesa: "wilayah/desa",
    }),
  },

  data: () => ({
    currentItems: "DPR_RI",
    kec: null,
    hasilSuara: [],
    user: JSON.parse(localStorage.getItem("xrfgthj")),
    namaKabupaten: null,
    namaKecamatan: null,
  }),

  methods: {
    ...mapActions({
      getDataKota: "wilayah/getKota",
      getDataKecamatan: "wilayah/getKecamatan",
      getHasilSuara: "hasil/getHasilSuaraKecamatan",
    }),
    actionKecamatan(e) {
      this.namaKabupaten = this.dataKota.find((el) => {
        return el.uid === e;
      })?.nama;
      this.kec = null;
      this.namaKecamatan = null;
      let query = {
        id: e,
      };
      this.getDataKecamatan(query);
    },
    async populateDapil(e) {
      this.namaKecamatan = this.dataKecamatan.find((el) => {
        return el.uid === e;
      })?.nama;
      this.hasilSuara = [];
      this.kec = e;
      this.dataHasil();
      this.currentItems = "DPR_RI";
    },
    async dataHasil() {
      let queryHasil = {
        uid_wilayah: this.kec,
      };
      await this.getHasilSuara(queryHasil).then((response) => {
        if (response.data.length > 0) {
          this.hasilSuara = response.data;
        }
      });
    },
  },

  created() {
    let query = {};
    if (this.user.uid_wilayah) {
      query = {
        id: this.user.uid_wilayah,
      };
    }
    this.getDataKota(query);
  },
};
</script>