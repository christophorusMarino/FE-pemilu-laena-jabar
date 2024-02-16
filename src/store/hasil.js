import axios from "axios";
import { resolveQueryParams } from '@/utils/helper'

export default {
    namespaced: true,

    state: {},

    getters: {},

    mutations: {},

    actions: {
        getHasilSuara(_, param) {
            let role = JSON.parse(localStorage.getItem("xrfgthj")).role;
            return new Promise((resolve, reject) => {
                axios.get(`suara?${resolveQueryParams(param)}`, {
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
        postHasilSuara(_, data) {
            let role = JSON.parse(localStorage.getItem("xrfgthj")).role;
            return new Promise((resolve, reject) => {
                axios.post('suara', data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
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

        getHasilSuaraKecamatan(_, param) {
            let role = JSON.parse(localStorage.getItem("xrfgthj")).role;
            return new Promise((resolve, reject) => {
                axios.get(`suarakecamatan?${resolveQueryParams(param)}`, {
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
        postHasilSuaraKecamatan(_, data) {
            let role = JSON.parse(localStorage.getItem("xrfgthj")).role;
            return new Promise((resolve, reject) => {
                axios.post('suarakecamatan', data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
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
    }
}