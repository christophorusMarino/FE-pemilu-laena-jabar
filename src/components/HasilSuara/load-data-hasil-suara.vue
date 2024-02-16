<template>
  <div>
    <v-card class="mx-auto" shaped elevation="3">
      <v-tabs grow v-model="currentTab">
        <v-tab href="#TPS">
          <v-icon left> mdi-home-city </v-icon>
          TPS
        </v-tab>
        <v-tab href="#KECAMATAN">
          <v-icon left> mdi-city </v-icon>
          KECAMATAN
        </v-tab>

        <v-tabs-items v-model="currentTab">
          <v-tab-item value="TPS">
            <load-suara-tps />
          </v-tab-item>
          <v-tab-item value="KECAMATAN">
            <load-suara-kecamatan />
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>
  
  <script>
import LoadSuaraKecamatan from "./Kecamatan/load-suara-kecamatan.vue";
import loadSuaraTps from "./Tps/load-suara-tps.vue";

export default {
  components: { loadSuaraTps, LoadSuaraKecamatan },
  data: () => ({
    currentTab: "TPS",
  }),
};
</script>