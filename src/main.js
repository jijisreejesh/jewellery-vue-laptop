import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routers/index'

import '@mdi/font/css/materialdesignicons.css';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
})

const app=createApp(App)
app.use(vuetify)
app.use(pinia)
app.use(router)
app.mount('#app')
 