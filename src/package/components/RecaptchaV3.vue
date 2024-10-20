<template>
  <div></div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import useRecaptcha from '../hooks/useRecaptcha'

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
  (e: 'update:token', token: string): void
}>()

const { loadRecaptcha } = useRecaptcha(props.siteKey, props.action)

loadRecaptcha().then((token) => {
  if (token) {
    emit('update:token', token)
  }
})

defineExpose({ loadRecaptcha })
</script>
<style>
.grecaptcha-badge {
  display: none !important;
}
</style>
