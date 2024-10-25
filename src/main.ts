import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import recaptchaPlugin from './package'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(recaptchaPlugin, {
  siteKey: '6LfQNKUaAAAAAHSVAVcs7kuzv2ZjLcR5nxssKrg5'
})

app.mount('#app')
