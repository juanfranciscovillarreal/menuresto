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
import { supabase } from './lib/supabase';

// Components
const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();

const { data } = supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session);

  if (event === 'INITIAL_SESSION') {
    // handle initial session
  } else if (event === 'SIGNED_IN') {
    // handle sign in event
  } else if (event === 'SIGNED_OUT') {
    // handle sign out event
  } else if (event === 'PASSWORD_RECOVERY') {
    // handle password recovery event
  } else if (event === 'TOKEN_REFRESHED') {
    // handle token refreshed event
  } else if (event === 'USER_UPDATED') {
    // handle user updated event
  }
});

// call unsubscribe to remove the callback
// data.subscription.unsubscribe();

createApp(App).use(vuetify).use(pinia).use(createRouter).mount('#app');