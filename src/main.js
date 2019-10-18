import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import './assets/css/iconfont/iconfont.css';
import 'vant/lib/icon/local.css';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
