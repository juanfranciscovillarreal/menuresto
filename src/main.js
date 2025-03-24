/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { supabase } from './lib/supabase'

const { data } = supabase.auth.onAuthStateChange((event, session) => {
    // console.log(event, session)
  
    if (event === 'INITIAL_SESSION') {
        console.log('Initial session event');
    } else if (event === 'SIGNED_IN') {
        console.log('Sign in event');
    } else if (event === 'SIGNED_OUT') {
      console.log('Sign out event');
    } else if (event === 'PASSWORD_RECOVERY') {
      console.log('Password recovery event');
    } else if (event === 'TOKEN_REFRESHED') {
      console.log('Token refreshed event');
    } else if (event === 'USER_UPDATED') {
      console.log('User updated event');
    }
  })
  
  // call unsubscribe to remove the callback
//   data.subscription.unsubscribe()

const app = createApp(App)

app.config.globalProperties.$filters = {
    toPesos(value) {
        return Intl.NumberFormat('es-AR', {currency: 'ars', style: 'currency'}).format(value);
    }
}

registerPlugins(app)

app.mount('#app')
