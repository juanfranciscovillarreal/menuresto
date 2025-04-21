import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import createRouter from './router';

// Vuetify
import 'vuetify/styles';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Components
const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();

createApp(App).use(vuetify).use(pinia).use(createRouter).mount('#app');