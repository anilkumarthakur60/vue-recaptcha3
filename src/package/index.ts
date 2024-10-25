import type { App } from 'vue'
import RecaptchaV3 from './components/RecaptchaV3.vue'
import useRecaptcha from '../hooks/useRecaptcha'

interface RecaptchaOptions {
  siteKey?: string
  action?: string
}

const recaptchaPlugin = {
  install: (app: App, options: RecaptchaOptions = {}) => {
    app.component('RecaptchaV3', RecaptchaV3)
    app.provide('recaptcha', {
      siteKey: options.siteKey,
      action: options.action
    })
  }
}

export default recaptchaPlugin
export { RecaptchaV3, useRecaptcha, recaptchaPlugin, type RecaptchaOptions }
