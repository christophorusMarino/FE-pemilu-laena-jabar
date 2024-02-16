import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMeta from 'vue-meta'
import axios from 'axios'

require('@/store/subscriber')

Vue.config.productionTip = false
Vue.use(VueMeta)
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})