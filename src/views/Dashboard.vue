<template>
  <div>
    <sidebar />
    <v-container fluid>
      <load-data-tabulasi />
    </v-container>
  </div>
</template>
    
    <script>
import sidebar from "@/components/sidebar.vue";
import LoadDataTabulasi from "@/components/Tabulasi/load-data-tabulasi.vue";

export default {
  components: { sidebar, LoadDataTabulasi },
  name: "DashboardPage",

  metaInfo: {
    title: "Tabulasi Golkar",
    titleTemplate: "%s - Dashboard",
    htmlAttrs: {
      lang: "id",
      amp: true,
    },
  },
};
</script>