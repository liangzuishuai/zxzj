import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 原element css
import './element-variables.scss'
import moment from 'moment'
import "babel-polyfill";
import Es6Promise from "es6-promise";

require("es6-promise").polyfill();
Es6Promise.polyfill();

Vue.prototype.$moment = moment

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$store = store;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
