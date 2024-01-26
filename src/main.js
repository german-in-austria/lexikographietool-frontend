
import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from "./router";
import store from './store'
import axios from 'axios'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import de from "./assets/locals/de.json"
import VueI18n from "vue-i18n";
import VueHtmlToPaper from "vue-html-to-paper";
import ipaDirectives from './directives/ipa.js'
import VueMeta from "vue-meta";Vue.use(VueMeta)
Vue.directive('rt-ipa', ipaDirectives)


require('@/store/subscriber')
const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css"
  ]
};

Vue.use(VueHtmlToPaper, options);
Vue.use(PerfectScrollbar)
Vue.use(VueI18n)
// axios.defaults.baseURL = '/api/'
axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT

const i18n = new VueI18n({
  locale: 'de', // set locale
  messages:{
    de:de,
  }

})

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    render: h => h(App),
    vuetify,
    router,
    store,i18n,
  }).$mount('#app')   
  
})
