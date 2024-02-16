import axios from 'axios'

export default {
    namespaced: true,

    state: {
        token: null,
        profile: null,
    },

    getters: {
        authenticated(state) {
            return state.token
        },
        profile(state) {
            return state.profile
        },
    },

    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_PROFILE(state, data) {
            state.profile = data
        },
    },

    actions: {
        async logIn({ dispatch }, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('login', credentials).then((response) => {
                    let token = response.data.JWTToken
                    let user = response.data.data
                    localStorage.setItem('xrfgthj', JSON.stringify(user))
                    resolve(response.data.data)
                    return dispatch('attempt', token)
                }).catch((error) => {
                    reject(error)
                })
            })
        },

        async attempt({ commit, state }, token) {
            if (token) {
                commit('SET_TOKEN', token)
            }

            if (!state.token) {
                return
            }
        },

        logOut({ commit }) {
            localStorage.removeItem('xrfgthj')
            localStorage.removeItem('token')
            commit('SET_TOKEN', null)
        },
    }
}