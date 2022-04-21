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
import * as Sentry from "@sentry/vue";
// import { BrowserTracing } from "@sentry/tracing";
import { Integrations } from "@sentry/tracing";

require("es6-promise").polyfill();
Es6Promise.polyfill();

Vue.prototype.$moment = moment

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$store = store;

// Sentry.init({
//     Vue,
//     dsn: "https://3d60eb3d54194bbb9144a83e58458e61@sentry.citics.com/25",
//     // dsn: "http://3d60eb3d54194bbb9144a83e58458e61@10.23.161.9:9000/25",
//   //   dsn:"https://3d60eb3d54194bbb9144a83e58458e61:6b513083df0d4e11a0955e39d05e86ae@sentry.citics.com/25",
//     release:"v1.0.1",
//     integrations: [
//       new BrowserTracing({
//         routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//         tracingOrigins: ["localhost", "my-site-url.com", /^\//],
//       }),
//     ],
//     tracesSampleRate: 1.0,
// });

Sentry.init({
        Vue,
        dsn: 'https://3d60eb3d54194bbb9144a83e58458e61@sentry.citics.com/25',
        integrations: [
            new Integrations.BrowserTracing({
              routingInstrumentation: Sentry.vueRouterInstrumentation(router),
              tracingOrigins: ['localhost', 'my-site-url.com', /^\//]
            })
          ],
      })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

