import axios from "axios";
import { resolveQueryParams } from '@/utils/helper'

export default {
    namespaced: true,

    state: {},

    getters: {},

    mutations: {},

    actions: {
        getDataTabulasi(_, param) {
            let role = JSON.parse(localStorage.getItem("xrfgthj")).role;
            return new Promise((resolve, reject) => {
                axios.get(`hasil?${resolveQueryParams(param)}`, {
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

        getHasilTps(_, { dapil, param }) {
            let role = JSON.parse(localStorage.getItem("xrfgthj")).role;
            return new Promise((resolve, reject) => {
                axios.get(`tps/dapil/${dapil}?${resolveQueryParams(param)}`, {
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

        getHasilTpsPerDapil(_, dapil) {
            let role = JSON.parse(localStorage.getItem("xrfgthj")).role;
            return new Promise((resolve, reject) => {
                axios.get(`tps/datadapil/${dapil}`, {
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
        }
    }
}