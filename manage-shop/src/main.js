import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import VueTippy from 'vue-tippy'

import './assets/style/main.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import '/node_modules/primeflex/primeflex.css'
import 'tippy.js/dist/tippy.css'

const app = createApp(App)

app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.use(store)
app.use(router)

app.use(VueTippy, {
  directive: 'tippy',
  component: 'tippy',
  componentSingleton: 'tippy-singleton',
  defaultProps: {
    placement: 'auto-end',
    allowHTML: true,
    arrow: false
  }
})

app.mount('#app')
