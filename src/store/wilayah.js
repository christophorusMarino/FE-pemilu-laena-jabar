import { resolveQueryParams } from "@/utils/helper";
import axios from "axios";

export default {
    namespaced: true,

    state: {
        kota: [],
        kecamatan: [],
        desa: [],
        tps: [],
    },
    getters: {
        kota(state) {
            return state.kota
        },
        kecamatan(state) {
            return state.kecamatan
        },
        desa(state) {
            return state.desa
        },
        tps(state) {
            return state.tps
        },
    },
    mutations: {
        SET_KOTA(state, kota) {
            state.kota = kota
        },
        SET_KECAMATAN(state, kecamatan) {
            state.kecamatan = kecamatan
        },
        SET_DESA(state, desa) {
            state.desa = desa
        },
        SET_TPS(state, tps) {
            state.tps = tps
        },
    },
    actions: {
        async getKota({ commit }, param) {
            try {
                await axios.get(`wilayah/kabupatenkota?${resolveQueryParams(param)}`, {
                    headers: {
                        "role": JSON.parse(localStorage.getItem("xrfgthj")).role,
                    }
                })
                    .then((response) => {
                        commit('SET_KOTA', response.data.data)
                    })
                    .catch(() => {
                        commit('SET_KOTA', [])
                    })
            } catch (e) {
                commit('SET_KOTA', [])
            }
        },
        async getKecamatan({ commit }, param) {
            try {
                await axios.get(`wilayah/kecamatan?${resolveQueryParams(param)}`, {
                    headers: {
                        "role": JSON.parse(localStorage.getItem("xrfgthj")).role,
                    }
                })
                    .then((response) => {
                        commit('SET_KECAMATAN', response.data.data)
                    })
                    .catch(() => {
                        commit('SET_KECAMATAN', [])
                    })
            } catch (e) {
                commit('SET_KECAMATAN', [])
            }
        },
        async getDesa({ commit }, param) {
            try {
                await axios.get(`wilayah/kelurahan?${resolveQueryParams(param)}`, {
                    headers: {
                        "role": JSON.parse(localStorage.getItem("xrfgthj")).role,
                    }
                })
                    .then((response) => {
                        commit('SET_DESA', response.data.data)
                    })
                    .catch(() => {
                        commit('SET_DESA', [])
                    })
            } catch (e) {
                commit('SET_DESA', [])
            }
        },
        async getTps({ commit }, param) {
            try {
                await axios.get(`tps?${resolveQueryParams(param)}`, {
                    headers: {
                        "role": JSON.parse(localStorage.getItem("xrfgthj")).role,
                    }
                })
                    .then((response) => {
                        commit('SET_TPS', response.data.data)
                    })
                    .catch(() => {
                        commit('SET_TPS', [])
                    })
            } catch (e) {
                commit('SET_TPS', [])
            }
        }
    },
}