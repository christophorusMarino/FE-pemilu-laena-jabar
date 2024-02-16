<template>
  <div>
    <v-card flat v-if="kec">
      <template v-if="dataDapilDprRi?.partai">
        <v-card-text class="pa-0 py-2">
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12">
              <v-card-title
                class="justify-center py-0 text-subtitle-1 black--text font-weight-bold"
              >
                {{ kabupaten }} / {{ kecamatan }}
              </v-card-title>
              <v-card-title
                class="justify-center py-0 text-subtitle-1 black--text font-weight-bold"
              >
                - DPR RI / {{ dataDapilDprRi?.dapil?.nama?.toUpperCase() }} -
                <v-icon
                  right
                  large
                  @click="
                    () => {
                      getDapil();
                      $emit('reloadHasil');
                    }
                  "
                >
                  mdi-refresh-circle
                </v-icon>
              </v-card-title>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text
          class="py-0 pt-5"
          style="background-color: yellow; border-radius: 10px"
        >
          <v-form ref="form" v-model="valid">
            <v-row class="my-1">
              <v-col
                v-for="(item, index) in dataDapilDprRi?.partai"
                :key="index"
                cols="12"
                :class="`mb-0 py-1 ${index == flag ? 'col-lg-12' : 'col-lg-3'}`"
              >
                <v-row no-gutters>
                  <v-col
                    :cols="`${index == flag ? '3' : '12'}`"
                    :class="`${index == flag ? 'ma-2' : ''}`"
                    v-for="(el, idx) in item.calegs"
                    :key="idx"
                  >
                    <v-card
                      :color="
                        index == flag ? 'brown darken-4' : 'teal lighten-4'
                      "
                    >
                      <div
                        v-if="dataSuaraDprRi"
                        class="d-flex flex-no-wrap justify-space-between"
                        :key="idx"
                      >
                        <template
                          v-if="
                            dataSuaraDprRi[
                              idx === 0
                                ? index
                                : dataDapilDprRi.partai.length - 1 + idx
                            ]
                          "
                        >
                          <div>
                            <v-card-title
                              :class="
                                index == flag
                                  ? 'pa-2 pb-0 text-caption white--text font-weight-bold'
                                  : 'pa-2 pb-0 text-caption black--text font-weight-bold'
                              "
                            >
                              {{
                                `${
                                  idx === 0 ? item.nomor_urut : el.nomor_urut
                                }. ${el.nama}`
                              }}
                            </v-card-title>
                            <v-card-actions class="pt-0 pb-2">
                              <v-text-field
                                v-model="
                                  dataSuaraDprRi[
                                    idx === 0
                                      ? index
                                      : dataDapilDprRi.partai.length - 1 + idx
                                  ].jumlah_suara
                                "
                                class="text-caption font-weight-bold"
                                maxlength="3"
                                full-width
                                dense
                                solo
                                :hint="resolveHint(index, idx)"
                                persistent-hint
                                :rules="[rules.required]"
                                type="number"
                                @keypress="
                                  (e) => {
                                    if (!/\d+/.test(e.key)) {
                                      e.preventDefault();
                                    }
                                  }
                                "
                              ></v-text-field>
                            </v-card-actions>
                          </div>
                          <v-avatar
                            class="ma-1"
                            size="60"
                            tile
                            v-if="idx === 0"
                          >
                            <v-img
                              contain
                              :src="`${publicPathPartai}${el.foto.toLowerCase()}`"
                            ></v-img>
                          </v-avatar>
                          <v-avatar class="ma-1" size="50" v-else>
                            <v-img
                              fill
                              :src="`${publicPathCaleg}${el.foto}`"
                            ></v-img>
                          </v-avatar>
                        </template>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
          <v-row
            class="py-5"
            no-gutters
            align="center"
            justify="center"
            v-if="dataSuaraDprRi.length > 0"
          >
            <v-col cols="12" class="col-lg-6 pa-1">
              <v-btn
                color="secondary"
                block
                style="border-radius: 10px"
                @click="document.getElementById('uploaderAwalDprRi').click()"
              >
                <v-icon left>mdi-paperclip</v-icon>
                Foto C Hasil Salinan ({{ fotoDprRi.length }} file)
                <v-file-input
                  v-model="tempDprRi"
                  :rules="[rules.required]"
                  multiple
                  class="d-none"
                  id="uploaderAwalDprRi"
                  @change="chooseImageDprRi"
                ></v-file-input>
              </v-btn>
            </v-col>
            <v-col cols="12" class="col-lg-6 pa-1">
              <v-btn
                :disabled="!valid"
                color="primary"
                block
                style="border-radius: 10px"
                :loading="btnLoading"
                @click="postHasil"
              >
                <v-icon left>mdi-content-save</v-icon>
                Simpan
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </template>
    </v-card>
  </div>
</template>
  
  <script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["kec", "hasilSuara", "kabupaten", "kecamatan"],

  data: () => ({
    document,
    valid: false,
    rules: {
      required: (v) => !!v || "!! Tidak boleh kosong !!",
    },
    publicPathPartai: "img/partai/",
    publicPathCaleg: "img/caleg/",
    flag: 3,
    dataSuaraDprRi: [],
    fotoDprRi: [],
    tempDprRi: [],
    alertSnackbar: false,
    textSnackbar: "",
    colorSnackbar: "",
    state: "SAVE",
    btnLoading: false,
    user: JSON.parse(localStorage.getItem("xrfgthj")).uid,
  }),

  computed: {
    ...mapGetters({
      dataDapilDprRi: "dapil/dapilDprRi",
    }),
  },

  watch: {
    async kec() {
      if (this.kec) {
        await this.$emit("reloadHasil");
        await this.getDapil();
      }
    },
  },

  methods: {
    ...mapActions({
      getDataDapilDprRi: "dapil/getDapilDprRi",
      postDataDprRi: "hasil/postHasilSuaraKecamatan",
    }),
    async getDapil() {
      let queryDapil = {
        wilayah: this.kec.toString().substring(0, 4),
      };
      await this.getDataDapilDprRi(queryDapil)
        .then(() => {
          this.dataDapilDprRi.partai.map((el, index) => {
            el.calegs.map((val, idx) => {
              if (idx == 0) {
                this.dataSuaraDprRi[index] = {
                  caleg: val.uid,
                  jumlah_suara: null,
                  nama: val.nama,
                  uid_partai: el.id,
                };
              } else {
                this.dataSuaraDprRi[
                  this.dataDapilDprRi.partai.length - 1 + idx
                ] = {
                  caleg: val.uid,
                  jumlah_suara: null,
                  nama: val.nama,
                  uid_partai: el.id,
                };
              }
            });
            this.$forceUpdate();
          });
        })
        .catch((e) => {
          this.textSnackbar = "FETCH DATA DAPIL ERROR";
          this.colorSnackbar = "error";
          this.alertSnackbar = true;
        });

      if (this.hasilSuara.length > 0) {
        this.dataSuaraDprRi.forEach((val, index) => {
          let find = this.hasilSuara.find((obj) => {
            return obj.uid_caleg === val.caleg;
          });
          if (find) {
            this.dataSuaraDprRi[index].jumlah_suara = find.jumlah_suara;
            this.state = "EDIT";
          } else {
            this.state = "SAVE";
          }
        });
        this.$forceUpdate();
      }
    },
    async postHasil() {
      this.btnLoading = true;
      this.valid = false;
      let timeStamp = new Date().toISOString().replaceAll(":", "-");
      const dataSend = new FormData();
      dataSend.append("uid_saksi", this.user);
      dataSend.append("uid_wilayah", this.kec);
      dataSend.append("jenis", "DPR RI");
      dataSend.append("suara", JSON.stringify(this.dataSuara));
      if (this.fotoDprRi.length > 0) {
        let newFoto = [];
        this.fotoDprRi.forEach((item, index) => {
          let kode = `C1-${this.kabupaten}-${this.kecamatan}-CAMAT-${
            index + 1
          }-${timeStamp}-DPRRI.${item.file.name.split(".").pop()}`;
          newFoto.push(
            new File([item.file], kode.toLowerCase(), {
              type: item.file.type,
            })
          );
        });
      }
    },
    chooseImageDprRi() {
      if (this.tempDprRi?.length) {
        this.tempDprRi.map((el) => {
          this.fotoDprRi.unshift({
            url: URL.createObjectURL(el),
            file: el,
            ket: "",
          });
        });
      }
    },
    resolveHint(index, idx) {
      if (index === this.flag) {
        if (idx === 0) {
          return "* kolom A1";
        } else {
          return "* kolom A2";
        }
      } else {
        return "* total Suara Parpol + Suara Caleg";
      }
    },
  },

  mounted() {
    if (this.kec) {
      this.getDapil();
    }
  },
};
</script>