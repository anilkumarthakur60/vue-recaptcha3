<template>
  <div></div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue'
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
  window.grecaptcha.ready(() => {
    executeRecaptcha()
  })
}

const executeRecaptcha = () => {
  window.grecaptcha.execute(props.siteKey, { action: props.action }).then((token: string) => {
    recaptchaToken.value = token
    if (token) {
      emit('verified', token) // Emit the token to the parent component
    }
  })
}

const loadRecaptcha = () => {
  if (!window.grecaptcha) {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${props.siteKey}`
    script.async = true
    script.defer = true
    script.onload = initializeRecaptcha
    document.head.appendChild(script)
  } else {
    initializeRecaptcha()
  }
}

defineExpose({ loadRecaptcha })

onMounted(() => {
  loadRecaptcha()
})
</script>

<style>
/* .grecaptcha-badge {
  display: none !important;
} */
</style>
