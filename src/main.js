import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import YDUI from '@/components/YDUI';
Vue.use(YDUI)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

