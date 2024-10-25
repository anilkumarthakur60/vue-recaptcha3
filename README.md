# Vue 3 reCAPTCHA V3 Plugin

This plugin provides a Vue 3 component and plugin for integrating Google reCAPTCHA V3. The plugin enables easy reCAPTCHA token generation, management, and configuration within a Vue 3 application.

## Features

- **Dynamic reCAPTCHA Token Generation**: Automatically generates and manages reCAPTCHA tokens.
- **Flexible Plugin Options**: Configure `siteKey` and `action` globally or per component.
- **Reusability**: Exposes methods (`loadRecaptcha`, `executeRecaptcha`, `initializeRecaptcha`) for fine-grained control over reCAPTCHA.

## Installation

1. **Install the Plugin**

   ```bash
   npm install @anilkumarthakur/vue3-recaptcha
   ```

2. **Set up reCAPTCHA in the main file**  
   Import and use the plugin in your main application file (e.g., `main.js` or `main.ts`):

   ```typescript
   import { createApp } from 'vue'
   import App from './App.vue'
   import { recaptchaPlugin } from '@anilkumarthakur/vue3-recaptcha'

   const app = createApp(App)

   app.use(recaptchaPlugin, {
     siteKey: 'your_site_key_here',
     action: 'homepage'
   })

   app.mount('#app')
   ```

3. **Add the `RecaptchaV3` Component to a View**

   Use the `RecaptchaV3` component within your Vue components to generate and manage reCAPTCHA tokens.

   ```html
   <template>
     <RecaptchaV3 v-model="recaptchaToken" />
   </template>

   <script setup lang="ts">
   import { ref } from 'vue'
   import { RecaptchaV3 } from '@anilkumarthakur/vue3-recaptcha'

   const recaptchaToken = ref<string>('')

   // Watch recaptchaToken for updates as tokens are generated
   </script>
   ```

## Plugin API

### Plugin Options

When installing the plugin, you can provide a configuration object:

| Option     | Type   | Description                                               |
|------------|--------|-----------------------------------------------------------|
| `siteKey`  | string | Your Google reCAPTCHA V3 site key.                         |
| `action`   | string | Action description for reCAPTCHA (e.g., `"homepage"`).     |

These options will be globally accessible to all `RecaptchaV3` instances in the application.

## Component API: `RecaptchaV3`

The `RecaptchaV3` component provides a wrapper for reCAPTCHA V3 and includes several exposed methods.

### Props

| Prop         | Type   | Description                                               |
|--------------|--------|-----------------------------------------------------------|
| `modelValue` | string | The reCAPTCHA token, generated and updated automatically. |
| `siteKey`    | string | (Optional) Override the globally defined `siteKey`.       |
| `action`     | string | (Optional) Override the globally defined `action`.        |

### Events

| Event                | Payload     | Description                       |
|----------------------|-------------|-----------------------------------|
| `update:modelValue`  | `string`    | Emits the generated reCAPTCHA token when it is updated. |

### Exposed Methods

The `RecaptchaV3` component exposes several methods for interacting with reCAPTCHA.

1. **`loadRecaptcha()`**: Loads the reCAPTCHA API script if not already loaded and initializes reCAPTCHA.
2. **`executeRecaptcha()`**: Executes the reCAPTCHA with the configured site key and action, returning a token.
3. **`initializeRecaptcha()`**: Initializes the reCAPTCHA instance if it's ready to generate a token.

Example usage in a Vue component:

```typescript
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RecaptchaV3 } from '@anilkumarthakur/vue3-recaptcha'

const recaptchaComponent = ref<InstanceType<typeof RecaptchaV3> | null>(null)
const recaptchaToken = ref<string>('')

const initializeRecaptcha = async () => {
  await recaptchaComponent.value?.loadRecaptcha()
}

onMounted(initializeRecaptcha)
</script>

<template>
  <RecaptchaV3 v-model="recaptchaToken" ref="recaptchaComponent" />
</template>
```

## TypeScript

The plugin and component include TypeScript types:

- **`RecaptchaPluginOptions`**: Type for plugin installation options (`siteKey` and `action`).
- **`RecaptchaComponentProps`**: Type for `RecaptchaV3` component props.

## Global Definitions

Add the following to your `global.d.ts` to enable TypeScript support for `grecaptcha` on `window`:

```typescript
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}
```
