import { shallowMount } from '@vue/test-utils'
import RecaptchaV3 from '../package/components/RecaptchaV3.vue'

describe('RecaptchaV3.vue', () => {
  let grecaptchaMock

  beforeEach(() => {
    // Mock grecaptcha globally before each test
    grecaptchaMock = {
      ready: jest.fn((callback) => callback()),
      execute: jest.fn(() => Promise.resolve('fake-token'))
    }
    global.window.grecaptcha = grecaptchaMock
  })

  afterEach(() => {
    // Clear mock after each test
    jest.clearAllMocks()
  })

  it('should use default props when none are provided', () => {
    const wrapper = shallowMount(RecaptchaV3)

    expect(wrapper.props().siteKey).toBe(undefined)
    expect(wrapper.props().action).toBe(undefined)
    expect(wrapper.props().modelValue).toBe('')
  })

  it('should update the token and emit update:modelValue event', async () => {
    const wrapper = shallowMount(RecaptchaV3, {
      props: {
        siteKey: 'test-site-key',
        action: 'homepage',
        modelValue: ''
      }
    })

    // Simulate token generation
    await wrapper.vm.executeRecaptcha()

    expect(grecaptchaMock.execute).toHaveBeenCalledWith('test-site-key', { action: 'homepage' })
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['fake-token'])
  })

  it('should handle errors when recaptcha is not loaded', async () => {
    // Remove grecaptcha from the global scope to simulate it not being loaded
    global.window.grecaptcha = {} as typeof global.window.grecaptcha

    const wrapper = shallowMount(RecaptchaV3, {
      props: {
        siteKey: 'test-site-key',
        action: 'homepage'
      }
    })

    // Try initializing Recaptcha when grecaptcha is not loaded
    await expect(wrapper.vm.initializeRecaptcha()).rejects.toThrow('Recaptcha is not loaded')
  })

  it('should inject the script if recaptcha is not available', async () => {
    global.window.grecaptcha = {} as typeof global.window.grecaptcha

    const wrapper = shallowMount(RecaptchaV3, {
      props: {
        siteKey: 'test-site-key',
        action: 'homepage'
      }
    })

    const createElementSpy = jest.spyOn(document, 'createElement').mockImplementation((tagName) => {
      const element = document.createElement(tagName)
      if (tagName === 'script') {
        // Simulate script tag's onload event
        setTimeout(() => {
          element.onload && element.onload(null as any)
        }, 0)
      }
      return element
    })
    const appendChildSpy = jest.spyOn(document.head, 'appendChild').mockImplementation((el) => el)

    await wrapper.vm.loadRecaptcha()

    expect(createElementSpy).toHaveBeenCalledWith('script')
    expect(appendChildSpy).toHaveBeenCalled()
    expect((appendChildSpy.mock.calls[0][0] as HTMLScriptElement).src).toContain(
      'https://www.google.com/recaptcha/api.js?render=test-site-key'
    )

    // Restore original implementations
    createElementSpy.mockRestore()
    appendChildSpy.mockRestore()
  })

  it('should not inject the script multiple times', async () => {
    global.window.grecaptcha = {} as typeof global.window.grecaptcha

    const wrapper = shallowMount(RecaptchaV3, {
      props: {
        siteKey: 'test-site-key',
        action: 'homepage'
      }
    })

    const createElementSpy = jest.spyOn(document, 'createElement')
    const appendChildSpy = jest.spyOn(document.head, 'appendChild').mockImplementation((el) => el)

    // First load
    await wrapper.vm.loadRecaptcha()

    // Call loadRecaptcha again
    await wrapper.vm.loadRecaptcha()

    // Ensure createElement and appendChild were only called once
    expect(createElementSpy).toHaveBeenCalledTimes(1)
    expect(appendChildSpy).toHaveBeenCalledTimes(1)

    // Restore original implementations
    createElementSpy.mockRestore()
    appendChildSpy.mockRestore()
  })

  it('should correctly detect if recaptcha is loaded', () => {
    const wrapper = shallowMount(RecaptchaV3)

    expect(wrapper.vm.isRecaptchaLoaded()).toBe(true)

    // Simulate recaptcha not being loaded
    global.window.grecaptcha = {} as typeof global.window.grecaptcha
    expect(wrapper.vm.isRecaptchaLoaded()).toBe(false)
  })

  it('should emit token update when recaptchaToken changes', async () => {
    const wrapper = shallowMount(RecaptchaV3, {
      props: {
        modelValue: ''
      }
    })

    // Simulate setting a token
    const token = 'new-token'
    wrapper.vm.recaptchaToken = token
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([token])
  })
})
