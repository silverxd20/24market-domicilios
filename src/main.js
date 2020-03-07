import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

const vuetifyOptions = { }
Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
})

new Vue({
  router,
  store,
  vuetify: new Vuetify(vuetifyOptions),
  render: h => h(App)
}).$mount('#app')
