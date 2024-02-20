<template>
  <div>
    <v-card outlined>
      <v-app-bar elevate-on-scroll scroll-target="#scroll-dpr-ri">
        <v-tabs
          centered
          background-color="yellow lighten-5"
          v-model="currentTabDprdKota"
        >
          <v-tab href="#TPS_DPRD_KOTA"> PLANO TPS </v-tab>
          <v-tab href="#KECAMATAN_DPRD_KOTA"> PLANO KECAMATAN </v-tab>
        </v-tabs>
      </v-app-bar>
      <v-sheet id="scroll-dpr-ri" class="overflow-y-auto" max-height="90vh">
        <v-container fluid style="height: 100vh">
          <v-tabs-items v-model="currentTabDprdKota">
            <v-tab-item value="TPS_DPRD_KOTA">
              <tabulasi-tps-dprd-kota
                :layer="layer"
                :jenis="currentTabDprdKota"
              />
            </v-tab-item>
            <v-tab-item value="KECAMATAN_DPRD_KOTA">
              <tabulasi-kecamatan-dprd-kota
                :layer="layer"
                :jenis="currentTabDprdKota"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-container>
      </v-sheet>
    </v-card>
  </div>
</template>
        
  <script>
import TabulasiKecamatanDprdKota from "./tabulasi-kecamatan-dprd-kota.vue";
import TabulasiTpsDprdKota from "./tabulasi-tps-dprd-kota.vue";
export default {
  components: { TabulasiTpsDprdKota, TabulasiKecamatanDprdKota },
  props: ["layer"],

  data: () => ({
    currentTabDprdKota: "TPS_DPRD_KOTA",
  }),

  watch: {
    layer() {
      if (this.layer === "DPRD_PROV") {
        this.currentTabDprdKota = "TPS_DPRD_KOTA";
      }
    },
  },

  mounted() {
    if (this.layer === "DPRD_PROV") {
      this.currentTabDprdKota = "TPS_DPRD_KOTA";
    }
  },
};
</script>