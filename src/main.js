import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vuetify'
import 'element-ui/lib/theme-chalk/index.css'
import {Tooltip} from 'element-ui'
Vue.config.productionTip = false

Vue.use(Tooltip)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
