// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App'
import router from './router'
import VueResource from 'vue-resource'
import { dateHelper,toLocale } from './filters'
import VueAweSwiper from 'vue-awesome-swiper'
import store from './store'
// import {publicMethod} from './public/dataInfo'
import 'bootstrap/css/bootstrap.min.css'
import 'bootstrap/js/bootstrap.min.js'
Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(VueAweSwiper);

require('swiper/dist/css/swiper.css')
import {swiper,swiperSlide} from 'vue-awesome-swiper'
Vue.filter('dateHelper',dateHelper);
Vue.filter('toLocale',toLocale);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App ,swiper,swiperSlide}
})

