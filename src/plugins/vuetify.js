/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Dates
// import DateFnsAdapter from '@date-io/date-fns'
// import enUS from 'date-fns/locale/en-US'
// import svSE from 'date-fns/locale/sv'

// Translations provided by Vuetify

import es from '@/locales/es'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    // defaultTheme: 'dark',
  },
  locale: {
    locale: 'es',
    messages: { es },
  },
})
