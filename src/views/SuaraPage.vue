<template>
  <div>
    <sidebar />
    <v-container fluid>
      <load-data-hasil-suara />
    </v-container>
  </div>
</template>
    
    <script>
import Sidebar from "@/components/sidebar.vue";
import LoadDataHasilSuara from "@/components/HasilSuara/load-data-hasil-suara.vue";

export default {
  name: "SuaraPage",
  components: { Sidebar, LoadDataHasilSuara },
  metaInfo: {
    title: "Tabulasi Golkar",
    titleTemplate: "%s - Hasil Suara",
    htmlAttrs: {
      lang: "id",
      amp: true,
    },
  },
};
</script>Sidebar