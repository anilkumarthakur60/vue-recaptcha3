<template>
  <div></div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
const props = withDefaults(
  defineProps<{
    siteKey?: string
    action?: string
  }>(),
  {
    siteKey: '6LfQNKUaAAAAAHSVAVcs7kuzv2ZjLcR5nxssKrg5',
    action: 'homepage'
  }
)

const emit = defineEmits<{
  (e: 'verified', token: string): void
}>()

const recaptchaToken = ref<string>('')

const initializeRecaptcha = () => {
  return new Promise<string>((resolve, reject) => {
    window.grecaptcha.ready(() => {
      executeRecaptcha().then(resolve).catch(reject)
    })
  })
}

const executeRecaptcha = async () => {
  return window.grecaptcha
    .execute(props.siteKey, { action: props.action })
    .then((token: string) => {
      recaptchaToken.value = token
      if (token) {
        emit('verified', token) // Emit the token to the parent component
      }
      return token // Return the token
    })
}

const loadRecaptcha = async () => {
  return new Promise<string>((resolve, reject) => {
    if (!window.grecaptcha) {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${props.siteKey}`
      script.async = true
      script.defer = true
      script.onload = () => {
        initializeRecaptcha().then(resolve).catch(reject)
      }
      document.head.appendChild(script)
    } else {
      initializeRecaptcha().then(resolve).catch(reject)
    }
  })
}

defineExpose({ loadRecaptcha })
</script>

<style>
.grecaptcha-badge {
  display: none !important;
}
</style>
