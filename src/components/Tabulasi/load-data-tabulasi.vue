<template>
  <div>
    <v-card flat>
      <v-tabs grow v-model="currentTab">
        <v-tab
          href="#DPR_RI"
          v-if="
            user.kode_wilayah === '3276' ||
            user.kode_wilayah === '3275' ||
            user.kode_wilayah === null
          "
        >
          TANIA LAENA PUTRI, B.Sc
        </v-tab>
        <v-tab
          href="#DPRD_KOTA"
          v-if="user.kode_wilayah === '3275' || user.kode_wilayah === null"
        >
          ASTRID LAENA PUTRI, S.H., M.H
        </v-tab>

        <v-tabs-items v-model="currentTab">
          <v-tab-item value="DPR_RI">
            <load-data-tabulasi-dpr-ri :layer="currentTab" />
          </v-tab-item>
          <v-tab-item value="DPRD_KOTA">
            <load-data-tabulasi-dprd-kota />
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>
    
<script>
import LoadDataTabulasiDprdKota from "./DprdKota/load-data-tabulasi-dprd-kota.vue";
import loadDataTabulasiDprRi from "./DprRi/load-data-tabulasi-dpr-ri.vue";

export default {
  components: {
    loadDataTabulasiDprRi,
    LoadDataTabulasiDprdKota,
  },
  data: () => ({
    currentTab: "DPR_RI",
    user: JSON.parse(localStorage.getItem("xrfgthj")),
  }),
};
</script>