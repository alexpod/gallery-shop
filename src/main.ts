import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import App from './App.vue';
import { useProductsStore } from './store/products';
import './styles/main.scss';

Vue.use(PiniaVuePlugin);

const pinia = createPinia();

new Vue({
  pinia,
  render: (h) => h(App),
  created() {
    useProductsStore(this.$pinia).initFromStorage();
  },
}).$mount('#app');
