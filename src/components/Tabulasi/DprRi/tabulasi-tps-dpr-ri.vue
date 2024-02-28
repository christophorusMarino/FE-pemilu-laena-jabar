<template>
  <div class="ma-5">
    <v-row no-gutters>
      <v-col cols="4"></v-col>
      <v-col cols="3">
        <v-autocomplete
          v-if="user.uid_wilayah"
          label="pilih kota/kabupaten"
          outlined
          dense
          hide-details
          :items="dataKota"
          item-text="nama"
          item-value="uid"
          @change="tabulasiDprRiTpsKec"
        ></v-autocomplete>
        <v-autocomplete
          v-else
          v-model="dapil"
          label="pilih dapil"
          dense
          outlined
          :items="listDapilDprRiTps"
          item-text="nama"
          item-value="nama"
          @change="tabulasiDprRiTps"
        ></v-autocomplete>
      </v-col>
      <v-col cols="1">
        <v-card-title class="py-0 justify-center" v-if="dapil">
          <v-icon x-large @click="() => tabulasiDprRiTps()">
            mdi-refresh-circle
          </v-icon>
        </v-card-title>
        <v-card-title class="py-0 justify-center" v-if="dataKota.length > 0">
          <v-icon x-large @click="() => tabulasiDprRiTpsKec()">
            mdi-refresh-circle
          </v-icon>
        </v-card-title>
      </v-col>
      <v-col cols="4"></v-col>
    </v-row>
    <v-row no-gutters v-if="!loading">
      <template v-if="user.uid_wilayah">
        <v-col cols="12" v-if="dataHasilDprRiTps.CountSuara">
          <v-card class="ma-2">
            <v-row no-gutters>
              <v-col cols="12">
                <v-card-title
                  class="pt-1 py-0 justify-center font-weight-bold black--text text-subtitle-1"
                >
                  HASIL PERHITUNGAN SUARA
                </v-card-title>
                <v-card-title
                  class="py-0 justify-center font-weight-bold black--text text-caption"
                >
                  Suara Masuk : {{ fromTpsDprRi.tps_input_suara }} /
                  {{ fromTpsDprRi.jumlah_tps }} TPS (
                  {{
                    (
                      (fromTpsDprRi.tps_input_suara / fromTpsDprRi.jumlah_tps) *
                      100
                    ).toFixed(2)
                  }}% )
                </v-card-title>
              </v-col>
            </v-row>
            <v-divider class="my-1"></v-divider>
            <v-card-text class="px-0 mx-0">
              <v-row no-gutters>
                <v-col cols="6">
                  <v-card-title
                    class="py-0 justify-center font-weight-bold black--text text-subtitle-2"
                  >
                    - PEROLEHAN SUARA PARTAI -
                  </v-card-title>
                  <v-card-text class="ma-0 px-2">
                    <Bar
                      :chart-options="chartOptions"
                      :data="resultPartaiDprRiTps[0].result"
                      :chart-id="chartId"
                      :dataset-id-key="datasetIdKey"
                      :width="width"
                      :height="height"
                    />
                  </v-card-text>
                </v-col>
                <v-col cols="6">
                  <v-card-title
                    class="py-0 justify-center font-weight-bold black--text text-subtitle-2"
                  >
                    - PEROLEHAN SUARA CALEG -
                  </v-card-title>
                  <v-card-text class="ma-0 px-2">
                    <Bar
                      :chart-options="chartOptions"
                      :data="resultCalegDprRiTps[0].result"
                      :chart-id="chartId"
                      :dataset-id-key="datasetIdKey"
                      :width="width"
                      :height="height"
                    />
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
      <template v-else>
        <v-col cols="12" v-for="(data, idx) in dataHasilDprRiTps" :key="idx">
          <v-card class="ma-2">
            <v-row no-gutters>
              <v-col cols="12">
                <v-card-title
                  class="pt-1 py-0 justify-center font-weight-bold black--text text-subtitle-1"
                >
                  HASIL PERHITUNGAN SUARA
                </v-card-title>
                <v-card-title
                  class="py-0 justify-center font-weight-bold black--text text-subtitle-1"
                >
                  - {{ data.jenis }} / {{ data.nama }} -
                </v-card-title>
                <v-card-title
                  class="py-0 justify-center font-weight-bold black--text text-caption"
                >
                  Jumlah Kursi : {{ data.jumlah_kursi }}
                </v-card-title>
                <v-card-title
                  class="py-0 justify-center font-weight-bold black--text text-caption"
                >
                  Suara Masuk : {{ fromTpsDprRi.tps_input_suara }} /
                  {{ fromTpsDprRi.jumlah_tps }} TPS (
                  {{
                    (
                      (fromTpsDprRi.tps_input_suara / fromTpsDprRi.jumlah_tps) *
                      100
                    ).toFixed(2)
                  }}% )
                </v-card-title>
              </v-col>
            </v-row>
            <v-divider class="my-1"></v-divider>
            <v-card-text class="px-0 mx-0">
              <v-row no-gutters>
                <v-col cols="6">
                  <v-card-title
                    class="py-0 justify-center font-weight-bold black--text text-subtitle-2"
                  >
                    - PEROLEHAN SUARA PARTAI -
                  </v-card-title>
                  <v-card-text class="ma-0 px-2">
                    <Bar
                      :chart-options="chartOptions"
                      :data="resultPartaiDprRiTps[idx].result"
                      :chart-id="chartId"
                      :dataset-id-key="datasetIdKey"
                      :width="width"
                      :height="height"
                    />
                  </v-card-text>
                </v-col>
                <v-col cols="6">
                  <v-card-title
                    class="py-0 justify-center font-weight-bold black--text text-subtitle-2"
                  >
                    - PEROLEHAN SUARA CALEG -
                  </v-card-title>
                  <v-card-text class="ma-0 px-2">
                    <Bar
                      :chart-options="chartOptions"
                      :data="resultCalegDprRiTps[idx].result"
                      :chart-id="chartId"
                      :dataset-id-key="datasetIdKey"
                      :width="width"
                      :height="height"
                    />
                  </v-card-text>
                </v-col>
                <v-col cols="12" v-if="!user.uid_wilayah">
                  <v-card-title
                    class="py-0 justify-center font-weight-bold black--text text-subtitle-2"
                  >
                    - PEROLEHAN KURSI PARPOL -
                  </v-card-title>
                  <v-card-text class="ma-0 px-2">
                    <v-row no-gutters>
                      <v-col
                        cols="2"
                        v-for="(val, key, index) in dataHasilDprRiTps[idx]
                          .kursi"
                        :key="index"
                      >
                        <v-card color="yellow" outlined class="ma-1">
                          <v-card-title
                            class="justify-center black--text font-weight-bold black--text text-subtitle-2"
                          >
                            {{ key.toUpperCase() }}
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-title
                            class="justify-center black--text font-weight-bold black--text text-caption"
                          >
                            Kursi: {{ val }}
                          </v-card-title>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>
    <v-row no-gutters v-else>
      <v-col cols="6">
        <v-card color="yellow lighten-4" class="ma-2">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="yellow lighten-4" class="ma-2">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="alertSnackbar" timeout="2000" :color="colorSnackbar">
      <strong>{{ textSnackbar }}</strong>
    </v-snackbar>
  </div>
</template>
    
<script>
import { mapActions, mapGetters } from "vuex";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ChartDataLabels);

export default {
  components: { Bar },
  props: {
    layer: String,
    jenis: String,
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 230,
    },
  },

  data: () => ({
    dapil: null,
    loading: false,
    alertSnackbar: false,
    textSnackbar: "",
    colorSnackbar: "",
    listDapilDprRiTps: [],
    dataHasilDprRiTps: [],
    dataHasilCalegDprRiTps: [],
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
    },
    partai: [
      "PKB",
      "Gerindra",
      "PDI P",
      "Golkar",
      "NasDem",
      "Buruh",
      "Gelora",
      "PKS",
      "PKN",
      "Hanura",
      "Garuda",
      "PAN",
      "PBB",
      "Demokrat",
      "PSI",
      "Perindo",
      "PPP",
      "Ummat",
    ],
    bcPartai: "rgba(255, 255, 0, 0.8)",
    resultPartaiDprRiTps: [],
    resultCalegDprRiTps: [],
    fromTpsDprRi: [],
    user: JSON.parse(localStorage.getItem("xrfgthj")),
  }),

  watch: {
    layer() {
      if (this.layer === "DPR_RI" && this.jenis === "TPS_DPR_RI") {
        if (this.dapil) {
          this.tabulasiDprRiTps();
        }
      }
    },
    jenis() {
      if (this.layer === "DPR_RI" && this.jenis === "TPS_DPR_RI") {
        if (this.dapil) {
          this.tabulasiDprRiTps();
        }
      }
    },
  },

  computed: {
    ...mapGetters({
      dataKota: "wilayah/kota",
    }),
  },

  methods: {
    ...mapActions({
      getDataKota: "wilayah/getKota",
      getTabulasi: "tabulasi/getDataTabulasi",
      getSuara: "tabulasi/getHasilTpsPerDapil",
      getDapil: "dapil/getDapilByParam",
      getTabulasiByKec: "tabulasi/getHasilByKec",
      getSuaraKec: "tabulasi/getHasilTpsPerWilayah",
    }),
    async tabulasiDprRiTpsKec() {
      this.resultPartaiDprRiTps = [];
      this.resultCalegDprRiTps = [];
      this.loading = true;
      let layer = "DPR RI";
      let jenis = "tps";
      let qq = {
        layer: layer,
        jenis: jenis,
        uid_wilayah: this.user.uid_wilayah,
      };
      await this.getTabulasiByKec(qq)
        .then((response) => {
          this.dataHasilDprRiTps = response;
          this.setDataHasilPartaiKec(response.CountSuara);
          this.setHasilCalegKec(response.CalegPan);
        })
        .catch((e) => {
          this.textSnackbar = "FETCH DATA DAPIL ERROR";
          this.colorSnackbar = "error";
          this.alertSnackbar = true;
        });

      this.getSuaraKec(this.user.uid_wilayah).then((response) => {
        this.fromTpsDprRi = response.data;
      });
    },
    async tabulasiDprRiTps() {
      this.resultPartaiDprRiTps = [];
      this.resultCalegDprRiTps = [];
      this.loading = true;
      let layer = "DPR RI";
      let jenis = "tps";
      let param = {
        layer: layer,
        jenis: jenis,
        dapil: this.dapil,
      };
      await this.getTabulasi(param)
        .then((response) => {
          this.dataHasilDprRiTps = response.hasilFinal;
          this.setDataHasilPartai(response.hasilFinal);
          this.setHasilCaleg(response.hasilFinal);
        })
        .catch((e) => {
          this.textSnackbar = "FETCH DATA DAPIL ERROR";
          this.colorSnackbar = "error";
          this.alertSnackbar = true;
        });

      let uid_dapil = this.listDapilDprRiTps.find(
        (el) => el.nama === this.dapil
      ).uid;
      this.getSuara(uid_dapil).then((response) => {
        this.fromTpsDprRi = response.data;
      });
    },

    setDataHasilPartai(data) {
      data.forEach((el) => {
        let rest = {
          result: {
            labels: this.partai,
            datasets: [
              {
                label: "perolehan suara",
                backgroundColor: this.bcPartai,
                data: [
                  el.suaraPartai.pkb,
                  el.suaraPartai.gerindra,
                  el.suaraPartai.PDIP,
                  el.suaraPartai.golkar,
                  el.suaraPartai.nasdem,
                  el.suaraPartai.PBuruh,
                  el.suaraPartai.gelora,
                  el.suaraPartai.pks,
                  el.suaraPartai.pkn,
                  el.suaraPartai.hanura,
                  el.suaraPartai.garuda,
                  el.suaraPartai.pan,
                  el.suaraPartai.pbb,
                  el.suaraPartai.demokrat,
                  el.suaraPartai.psi,
                  el.suaraPartai.perindo,
                  el.suaraPartai.ppp,
                  el.suaraPartai.ummat,
                ],
                datalabels: {
                  color: "black",
                  backgroundColor: "white",
                  align: "end",
                  anchor: "center",
                },
              },
            ],
          },
        };
        this.resultPartaiDprRiTps.push(rest);
        console.log(rest);
      });
      this.loading = false;
    },
    setDataHasilPartaiKec(data) {
      let js = [];
      data.forEach((el, idx) => {
        el.nama === "pkb"
          ? js[0] = data[idx].TotalSuara
          : el.nama === "gerindra"
          ? js[1] = data[idx].TotalSuara
          : el.nama === "PDIP"
          ? js[2] = data[idx].TotalSuara
          : el.nama === "golkar"
          ? js[3] = data[idx].TotalSuara
          : el.nama === "nasdem"
          ? js[4] = data[idx].TotalSuara
          : el.nama === "PBuruh"
          ? js[5] = data[idx].TotalSuara
          : el.nama === "gelora"
          ? js[6] = data[idx].TotalSuara
          : el.nama === "pks"
          ? js[7] = data[idx].TotalSuara
          : el.nama === "pkn"
          ? js[8] = data[idx].TotalSuara
          : el.nama === "hanura"
          ? js[9] = data[idx].TotalSuara
          : el.nama === "garuda"
          ? js[10] = data[idx].TotalSuara
          : el.nama === "pan"
          ? js[11] = data[idx].TotalSuara
          : el.nama === "pbb"
          ? js[12] = data[idx].TotalSuara
          : el.nama === "demokrat"
          ? js[13] = data[idx].TotalSuara
          : el.nama === "psi"
          ? js[14] = data[idx].TotalSuara
          : el.nama === "perindo"
          ? js[15] = data[idx].TotalSuara
          : el.nama === "ppp"
          ? js[16] = data[idx].TotalSuara
          : el.nama === "ummat"
          ? js[17] = data[idx].TotalSuara
          : js.push(0);
      });
      let rest = {
        result: {
          labels: this.partai,
          datasets: [
            {
              label: "perolehan suara",
              backgroundColor: this.bcPartai,
              data: js,
              datalabels: {
                color: "black",
                backgroundColor: "white",
                align: "end",
                anchor: "center",
              },
            },
          ],
        },
      };
      this.resultPartaiDprRiTps.push(rest);
    },

    setHasilCaleg(data) {
      data.forEach((el) => {
        let label = [];
        let js = [];
        el.CalegPan.forEach((e) => {
          label.push(e.nama);
        });
        el.CalegPan.forEach((e) => {
          js.push(e.jumlah_suara);
        });
        let rest = {
          result: {
            labels: label,
            datasets: [
              {
                label: "perolehan suara",
                backgroundColor: this.bcPartai,
                data: js,
                datalabels: {
                  color: "black",
                  backgroundColor: "whitesmoke",
                  align: "end",
                  anchor: "center",
                },
              },
            ],
          },
        };
        this.resultCalegDprRiTps.push(rest);
      });
      this.loading = false;
    },
    setHasilCalegKec(data) {
      let label = [];
      let js = [];
      data.forEach((el) => {
        label.push(el.nama);
        js.push(el.jumlah_suara);
      });
      let rest = {
        result: {
          labels: label,
          datasets: [
            {
              label: "perolehan suara",
              backgroundColor: this.bcPartai,
              data: js,
              datalabels: {
                color: "black",
                backgroundColor: "whitesmoke",
                align: "end",
                anchor: "center",
              },
            },
          ],
        },
      };
      this.resultCalegDprRiTps.push(rest);
      this.loading = false;
    },
  },

  mounted() {
    if (this.user.uid_wilayah !== null) {
      let query = {};
      query = {
        id: this.user.uid_wilayah,
      };
      this.getDataKota(query);
    }

    let payload = {
      layer: "dprri",
      param: {},
    };
    this.getDapil(payload).then((response) => {
      this.listDapilDprRiTps = response.data;
    });
    if (this.layer === "DPR_RI" && this.jenis === "TPS_DPR_RI") {
      if (this.dapil) {
        this.tabulasiDprRiTps();
      }
    }
  },
};
</script>