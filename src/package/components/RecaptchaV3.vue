<template>
  <div></div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { RecaptchaOptions } from '..';
const props = withDefaults(defineProps<{
  siteKey?: string
  action?: string
  modelValue?: string
}>(), {
})

const recaptchaToken = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value || '')
})
const emit = defineEmits<{
  (e: 'update:modelValue', token: string): void
}>()

function initializeRecaptcha() {
  return new Promise<string>((resolve, reject) => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        executeRecaptcha().then(resolve).catch(reject)
      })
    } else {
      reject(new Error('Recaptcha is not loaded'))
    }
  })
}

async function executeRecaptcha() {
  return window.grecaptcha
    .execute(props.siteKey ?? recaptcha?.siteKey ?? '', { action: props.action ?? recaptcha?.action ?? '' })
    .then((token: string) => {
      recaptchaToken.value = token
      return token
    })
}

async function loadRecaptcha() {
  return new Promise<string>((resolve, reject) => {
    if (!window.grecaptcha) {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${props.siteKey || (recaptcha ? recaptcha.siteKey : '')}`
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


function isRecaptchaLoaded() {
  return !!window.grecaptcha
}
defineExpose({
  loadRecaptcha,
  executeRecaptcha,
  initializeRecaptcha,
  recaptchaToken,
  isRecaptchaLoaded
})

const recaptcha = inject<RecaptchaOptions>('recaptcha')
console.log(recaptcha)




</script>
<style>
.grecaptcha-badges {
  display: none !important;
}
</style>
