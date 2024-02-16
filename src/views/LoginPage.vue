<template>
  <v-row no-gutters class="ma-0">
    <v-col cols="12" sm="6" md="6" class="hidden-sm-and-down">
      <v-img height="100vh" max-width="fill" src="login.jpg" />
    </v-col>
    <v-col cols="12" sm="6" md="6">
      <v-card
        height="100vh"
        max-width="600"
        class="mx-auto py-15"
        elevation="0"
      >
        <v-card-title>
          <v-img height="80px" src="golkar.png" contain transition="false" />
        </v-card-title>
        <v-card-title class="pa-0 justify-center font-weight-bold">
          SISTEM TABULASI
        </v-card-title>
        <v-card-title class="pa-0 justify-center font-weight-bold">
          HASIL PEMILIHAN CALEG
        </v-card-title>
        <v-card-title class="pa-0 justify-center font-weight-bold">
          PARTAI GOLONGAN KARYA
        </v-card-title>
        <v-card-title class="pa-0 justify-center font-weight-bold">
          JAWA BARAT
        </v-card-title>
        <v-divider class="my-3"></v-divider>
        <v-card-title class="pb-0 text-h5 justify-center font-weight-bold">
          - Login -
        </v-card-title>
        <v-card-title class="py-0 text-subtitle-1 grey--text justify-center">
          Silahkan masukkan token untuk mengakses
        </v-card-title>
        <v-card-text class="py-0 pb-2">
          <v-form ref="form" v-model="valid" class="mt-10">
            <v-row align="center" justify="center">
              <v-col cols="12" class="col-lg-6">
                <v-text-field
                  class="centered_text_field"
                  placeholder="masukkan token"
                  v-model="token"
                  outlined
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPasswordClick"
                  :rules="[rules.required]"
                  v-on:keyup.enter="login"
                  style="border-radius: 8px"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12" class="col-lg-6">
                <v-btn
                  class="white--text"
                  color="#2d2f90"
                  large
                  block
                  style="border-radius: 10px"
                  :disabled="!valid"
                  :loading="btnLoading"
                  @click="login"
                >
                  Masuk
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider class="my-3"></v-divider>
      </v-card>
    </v-col>

    <v-snackbar v-model="alertSnackbar" timeout="2000" :color="colorSnackbar">
      <strong>{{ textSnackbar }}</strong>
    </v-snackbar>
  </v-row>
</template>
      
  <script>
import { mapActions } from "vuex";
export default {
  name: "LoginPage",

  metaInfo: {
    title: "Tabulasi GOLKAR",
    titleTemplate: "%s - Login",
    htmlAttrs: {
      lang: "id",
      amp: true,
    },
  },

  data: () => ({
    btnLoading: false,
    valid: false,
    publicPathPartai: "img/partai/",
    token: "",
    rules: {
      required: (value) => !!value || "Tidak boleh kosong !!",
    },
    alertSnackbar: false,
    textSnackbar: "",
    colorSnackbar: "",
    showPassword: false,
  }),

  methods: {
    ...mapActions({
      postLogin: "auth/logIn",
    }),
    showPasswordClick() {
      this.showPassword = !this.showPassword;
    },
    login() {
      this.btnLoading = true;
      if (this.valid) {
        this.postLogin({ token: this.token })
          .then((response) => {
            if (response.role === "ADMIN") {
              this.$router.replace({
                name: "dashboard",
              });
            } else {
              this.textSnackbar = "Anda Tidak Dapat Mengakses Halaman Ini";
              this.colorSnackbar = "error";
              this.alertSnackbar = true;
            }
          })
          .catch((e) => {
            this.textSnackbar = e.response.data.message;
            this.colorSnackbar = "error";
            this.alertSnackbar = true;
          })
          .finally(() => {
            this.btnLoading = false;
            this.token = "";
          });
      }
    },
  },
};
</script>