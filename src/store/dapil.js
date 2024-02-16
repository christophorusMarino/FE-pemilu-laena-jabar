import axios from "axios";
import { resolveQueryParams } from '@/utils/helper'

export default {
    namespaced: true,

    state: {
        dapilDprRi: [],
        dapilDprdProv: [],
        dapilDprdKota: [],
    },

    getters: {
        dapilDprRi(state) {
            return state.dapilDprRi
        },
        dapilDprdProv(state) {
            return state.dapilDprdProv
        },
        dapilDprdKota(state) {
            return state.dapilDprdKota
        }
    },

    mutations: {
        SET_DAPIL_DPR_RI(state, dapilDprRi) {
            state.dapilDprRi = dapilDprRi
        },
        SET_DAPIL_DPRD_PROV(state, dapilDprdProv) {
            state.dapilDprdProv = dapilDprdProv
        },
        SET_DAPIL_DPRD_KOTA(state, dapilDprdKota) {
            state.dapilDprdKota = dapilDprdKota
        },
    },

    actions: {
        async getDapilByParam(_, { layer, param }) {
            let role = JSON.parse(localStorage.getItem("xrfgthj")).role;
            return new Promise((resolve, reject) => {
                axios.get(`dapil/layer/${layer}?${resolveQueryParams(param)}`, {
                    headers: {
                        "role": role
                    },
                })
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        async getDapilDprRi({ commit }, param) {
            let role = JSON.parse(localStorage.getItem("xrfgthj")).role;
            try {
                await axios.get(`caleg/layer/dprri?${resolveQueryParams(param)}`, {
                    headers: {
                        "role": role,
                    }
                })
                    .then((response) => {
                        commit('SET_DAPIL_DPR_RI', response.data.data)
                    })
                    .catch(() => {
                        commit('SET_DAPIL_DPR_RI', [])
                    })
            } catch (e) {
                commit('SET_DAPIL_DPR_RI', [])
            }
        },
        async getDapilDprdProv({ commit }, param) {
            let role = JSON.parse(localStorage.getItem("xrfgthj")).role;
            try {
                await axios.get(`caleg/layer/dprdprov?${resolveQueryParams(param)}`, {
                    headers: {
                        "role": role,
                    }
                })
                    .then((response) => {
                        commit('SET_DAPIL_DPRD_PROV', response.data.data)
                    })
                    .catch(() => {
                        commit('SET_DAPIL_DPRD_PROV', [])
                    })
            } catch (e) {
                commit('SET_DAPIL_DPRD_PROV', [])
            }
        },
        async getDapilDprdKota({ commit }, param) {
            let role = JSON.parse(localStorage.getItem("xrfgthj")).role;
            try {
                await axios.get(`caleg/layer/dprdkab?${resolveQueryParams(param)}`, {
                    headers: {
                        "role": role,
                    }
                })
                    .then((response) => {
                        commit('SET_DAPIL_DPRD_KOTA', response.data.data)
                    })
                    .catch(() => {
                        commit('SET_DAPIL_DPRD_KOTA', [])
                    })
            } catch (e) {
                commit('SET_DAPIL_DPRD_KOTA', [])
            }
        }
    }
}