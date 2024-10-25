import type { App } from 'vue'
import RecaptchaV3 from './components/RecaptchaV3.vue'
import { RecaptchaPluginTypes } from './types/recaptchaPluginTypes'

const recaptchaPlugin = {
  install: (app: App, options: RecaptchaPluginTypes = {}) => {
    app.component('RecaptchaV3', RecaptchaV3)
    app.provide('recaptcha', {
      siteKey: options.siteKey,
      action: options.action
    })
  }
}

export { RecaptchaV3, recaptchaPlugin, type RecaptchaPluginTypes }
