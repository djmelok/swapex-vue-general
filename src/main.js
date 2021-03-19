import Vue from 'vue';
import VueMeta from 'vue-meta'
import VueResource from 'vue-resource';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import store from './store/index.js';

// import App from './pages/login.vue';
// import App from './pages/signin.vue';
// import App from './pages/signup.vue';
// import App from './pages/referral.vue';
import App from './pages/index.vue';
// import App from './pages/change-pin.vue';
// import App from './pages/coin.vue';
// import App from './pages/buy.vue';
// import App from './pages/transfer.vue';
// import App from './pages/provider.vue';
// import App from './pages/pre-check.vue';
// import App from './pages/cards.vue';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueToast);
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
  tagIDKeyName: 'viewport',
})

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
