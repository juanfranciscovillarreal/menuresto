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

const app = createApp(App)

app.config.globalProperties.$filters = {
    toPesos(value) {
        return Intl.NumberFormat('es-AR', {currency: 'ars', style: 'currency'}).format(value);
    }
}

registerPlugins(app)

app.mount('#app')
