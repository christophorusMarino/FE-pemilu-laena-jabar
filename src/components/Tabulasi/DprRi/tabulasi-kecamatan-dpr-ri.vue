<template>
  <div class="ma-5">
    <v-row no-gutters>
      <v-col cols="4"></v-col>
      <v-col cols="3">
        <v-autocomplete
          v-model="dapil"
          label="pilih dapil"
          dense
          outlined
          :items="listDapilDprRiKec"
          item-text="nama"
          item-value="nama"
          @change="tabulasiDprRiKec"
        ></v-autocomplete>
      </v-col>
      <v-col cols="1">
        <v-card-title class="py-0 justify-center" v-if="dapil">
          <v-icon x-large @click="() => tabulasiDprRiKec()">
            mdi-refresh-circle
          </v-icon>
        </v-card-title>
      </v-col>
      <v-col cols="4"></v-col>
    </v-row>
    <v-row no-gutters v-if="!loading">
      <v-col cols="12" v-for="(data, idx) in dataHasilDprRiKec" :key="idx">
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
                Suara Masuk : {{ fromKecDprRi.tps_input_suara }} /
                {{ fromKecDprRi.jumlah_tps }} TPS (
                {{
                  (
                    (fromKecDprRi.tps_input_suara / fromKecDprRi.jumlah_tps) *
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
                    :data="resultPartaiDprRiKec[idx].result"
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
                    :data="resultCalegDprRiKec[idx].result"
                    :chart-id="chartId"
                    :dataset-id-key="datasetIdKey"
                    :width="width"
                    :height="height"
                  />
                </v-card-text>
              </v-col>
              <v-col cols="12">
                <v-card-title
                  class="py-0 justify-center font-weight-bold black--text text-subtitle-2"
                >
                  - PEROLEHAN KURSI PARPOL -
                </v-card-title>
                <v-card-text class="ma-0 px-2">
                  <v-row no-gutters>
                    <v-col
                      cols="2"
                      v-for="(val, key, index) in dataHasilDprRiKec[idx].kursi"
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
import { mapActions } from "vuex";
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
    listDapilDprRiKec: [],
    dataHasilDprRiKec: [],
    dataHasilCalegDprRiKec: [],
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
    resultPartaiDprRiKec: [],
    resultCalegDprRiKec: [],
    fromKecDprRi: [],
  }),

  watch: {
    layer() {
      if (this.layer === "DPR_RI" && this.jenis === "KECAMATAN_DPR_RI") {
        if (this.dapil) {
          this.resultPartaiDprRiKec = [];
          this.resultCalegDprRiKec = [];
          this.tabulasiDprRiKec();
        }
      }
    },
    jenis() {
      if (this.layer === "DPR_RI" && this.jenis === "KECAMATAN_DPR_RI") {
        if (this.dapil) {
          this.resultPartaiDprRiKec = [];
          this.resultCalegDprRiKec = [];
          this.tabulasiDprRiKec();
        }
      }
    },
  },

  methods: {
    ...mapActions({
      getTabulasi: "tabulasi/getDataTabulasi",
      getSuara: "tabulasi/getHasilTpsPerDapil",
      getDapil: "dapil/getDapilByParam",
    }),
    async tabulasiDprRiKec() {
      this.resultPartaiDprRiKec = [];
      this.resultCalegDprRiKec = [];
      this.loading = true;
      let layer = "DPR RI";
      let jenis = "kecamatan";
      let param = {
        layer: layer,
        jenis: jenis,
        dapil: this.dapil,
      };
      await this.getTabulasi(param)
        .then((response) => {
          this.dataHasilDprRiKec = response.hasilFinal;
          this.setDataHasilPartai(response.hasilFinal);
          this.setHasilCaleg(response.hasilFinal);
        })
        .catch((e) => {
          this.textSnackbar = "FETCH DATA DAPIL ERROR";
          this.colorSnackbar = "error";
          this.alertSnackbar = true;
        });

      let uid_dapil = this.listDapilDprRiKec.find(
        (el) => el.nama === this.dapil
      ).uid;
      this.getSuara(uid_dapil).then((response) => {
        this.fromKecDprRi = response.data;
      });
    },
    setDataHasilPartai(data) {
      console.log(data);
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
        this.resultPartaiDprRiKec.push(rest);
      });
      this.loading = false;
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
        this.resultCalegDprRiKec.push(rest);
      });
      this.loading = false;
    },
  },

  mounted() {
    let payload = {
      layer: "dprri",
      param: {},
    };
    this.getDapil(payload).then((response) => {
      this.listDapilDprRiKec = response.data;
    });
    if (this.layer === "DPR_RI" && this.jenis === "KECAMATAN_DPR_RI") {
      if (this.dapil) {
        this.tabulasiDprRiKec();
      }
    }
  },
};
</script>