<template>
  <div>
    <v-card flat>
      <v-card-title class="justify-center"> - SUARA TPS - </v-card-title>
      <v-card-text>
        <v-row no-gutters>
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
              @change="(e) => actionDesa(e)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" class="col-lg-3 col-md-3 col-sm-12">
            <v-autocomplete
              label="pilih kelurahan"
              outlined
              dense
              hide-details
              :items="dataDesa"
              item-text="nama"
              item-value="uid"
              @change="(e) => actionTps(e)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" class="col-lg-3 col-md-3 col-sm-12">
            <v-autocomplete
              label="pilih tps"
              outlined
              dense
              hide-details
              :items="dataTps"
              @change="(e) => populateDapil(e)"
            >
              <template v-slot:item="{ item }"> TPS {{ item.nomor }} </template>
              <template v-slot:selection="data">
                TPS {{ data.item.nomor }}
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-divider class="my-3"></v-divider>
        <v-tabs grow v-model="currentItems" background-color="yellow lighten-5">
          <v-tab href="#DPR_RI"> TANIA LAENA PUTRI, B.Sc </v-tab>
          <v-tab href="#DPRD_KOTA"> ASTRID LAENA PUTRI, S.H., M.H </v-tab>

          <v-tabs-items v-model="currentItems">
            <v-tab-item value="DPR_RI">
              <tps-dpr-ri
                :tps="tps"
                :hasil-suara="hasilSuara"
                @reloadHasil="dataHasil"
              />
            </v-tab-item>
            <v-tab-item value="DPRD_KOTA">
              <tps-dprd-kota
                :tps="tps"
                :hasil-suara="hasilSuara"
                @reloadHasil="dataHasil"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>
    </v-card>
  </div>
</template>
    
    <script>
import { mapActions, mapGetters } from "vuex";
import tpsDprRi from "./tps-dpr-ri.vue";
import TpsDprdKota from "./tps-dprd-kota.vue";

export default {
  components: { tpsDprRi, TpsDprdKota },
  data: () => ({
    currentItems: "DPR_RI",
    tpsSelected: null,
    tps: null,
    hasilSuara: [],
    user: JSON.parse(localStorage.getItem("xrfgthj")),
  }),
  computed: {
    ...mapGetters({
      dataKota: "wilayah/kota",
      dataKecamatan: "wilayah/kecamatan",
      dataDesa: "wilayah/desa",
      dataTps: "wilayah/tps",
    }),
  },

  methods: {
    ...mapActions({
      getDataKota: "wilayah/getKota",
      getDataKecamatan: "wilayah/getKecamatan",
      getDataDesa: "wilayah/getDesa",
      getDataTps: "wilayah/getTps",
      getHasilSuara: "hasil/getHasilSuara",
    }),
    actionKecamatan(e) {
      this.tps = null;
      let query = {
        id: e,
      };
      this.getDataKecamatan(query);
    },
    actionDesa(e) {
      this.tps = null;
      let query = {
        id: e,
      };
      this.getDataDesa(query);
    },
    actionTps(e) {
      this.tps = null;
      let query = {
        uid_wilayah: e,
        limit: 150,
        offset: 0,
      };
      this.getDataTps(query);
    },
    async populateDapil(e) {
      this.hasilSuara = [];
      this.tps = e;
      this.dataHasil();
      this.currentItems = "DPR_RI";
    },
    async dataHasil() {
      console.log("GET HASIL");
      let queryHasil = {
        uid_tps: this.tps?.uid,
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
    this.tps = null;
  },
};
</script>