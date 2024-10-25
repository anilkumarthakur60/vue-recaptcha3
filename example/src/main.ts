import { createApp } from 'vue'
import App from './App.vue'
import { recaptchaPlugin, } from '@anilkumarthakur/vue3-recaptcha'

const app = createApp(App)

app.use(recaptchaPlugin,{
    siteKey: '6LfQNKUaAAAAAHSVAVcs7kuzv2ZjLcR5nxssKrg5',
    siteAction:'login',
})

app.mount('#app')
