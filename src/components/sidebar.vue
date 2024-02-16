<template>
  <nav>
    <v-app-bar app color="yellow">
      <v-app-bar-nav-icon
        class="black--text"
        @click.stop="sidebar = !sidebar"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-subtitle-1 black--text">
        <v-row no-gutters>
          <v-col cols="12">
            <img class="py-1" height="60px" src="golkar.png" />
          </v-col>
        </v-row>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        class="black--text"
        color="#FEF6F6"
        depressed
        rounded
        style="text-transform: unset !important"
        @click="exit"
      >
        <v-icon left color="#EB4646">mdi-power</v-icon>Keluar
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="sidebar" color="yellow">
      <v-list>
        <v-card class="ma-6">
          <v-list-item class="py-3">
            <v-list-item-avatar>
              <v-img src="male.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-subtitle-1 font-weight-bold">
                {{ profile.role }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-list>

      <v-list>
        <v-list-item active-class="black--text" to="/dashboard">
          <v-list-item-icon>
            <v-icon color="black">mdi-monitor-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-subtitle-1 black--text">
            Dashboard
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item active-class="black--text" to="/hasil_suara">
          <v-list-item-icon>
            <v-icon color="black">mdi-table</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-subtitle-1 black--text">
            Hasil Suara
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
    
    <script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    sidebar: false,
    profile: JSON.parse(localStorage.getItem("xrfgthj")),
  }),

  methods: {
    ...mapActions({
      postLogout: "auth/logOut",
    }),
    exit() {
      this.postLogout().then(() => {
        this.$router.replace({
          name: "login",
        });
      });
    },
  },
};
</script>