import { ref } from 'vue'

export default function useHome() {
  const recaptchaToken = ref<string>('')
  return {
    recaptchaToken
  }
}
