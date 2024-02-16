<template>
  <div>
    <v-card outlined>
      <v-app-bar elevate-on-scroll scroll-target="#scroll-dpr-ri">
        <v-tabs
          centered
          background-color="yellow lighten-5"
          v-model="currentTabDprRi"
        >
          <v-tab href="#TPS_DPR_RI"> PLANO TPS </v-tab>
          <v-tab href="#KECAMATAN_DPR_RI"> PLANO KECAMATAN </v-tab>
        </v-tabs>
      </v-app-bar>
      <v-sheet id="scroll-dpr-ri" class="overflow-y-auto" max-height="75vh">
        <v-container fluid style="height: 100vh">
          <v-tabs-items v-model="currentTabDprRi">
            <v-tab-item value="TPS_DPR_RI">
              <tabulasi-tps-dpr-ri :layer="layer" :jenis="currentTabDprRi" />
            </v-tab-item>
            <v-tab-item value="KECAMATAN_DPR_RI"> </v-tab-item>
          </v-tabs-items>
        </v-container>
      </v-sheet>
    </v-card>
  </div>
</template>
    
<script>
import tabulasiTpsDprRi from "./tabulasi-tps-dpr-ri.vue";

export default {
  components: { tabulasiTpsDprRi },
  props: ["layer"],

  data: () => ({
    currentTabDprRi: "TPS_DPR_RI",
  }),

  watch: {
    layer() {
      if (this.layer === "DPR_RI") {
        this.currentTabDprRi = "TPS_DPR_RI";
      }
    },
  },

  mounted() {
    if (this.layer === "DPR_RI") {
      this.currentTabDprRi = "TPS_DPR_RI";
    }
  },
};
</script>