import type { App } from 'vue'
import RecaptchaV3 from './components/RecaptchaV3.vue'
import useRecaptcha from './hooks/useRecaptcha'

const recaptchaPlugin = {
  install: (app: App) => {
    app.component('RecaptchaV3', RecaptchaV3)
  }
}

export default recaptchaPlugin
export { RecaptchaV3, useRecaptcha }
