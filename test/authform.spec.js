import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Login  from '../pages/signin.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue()

describe ('SignIn.vue', () => {
  let localVue
  let vuetify
  let router

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter)
    vuetify = new Vuetify()
    router = new VueRouter()
  });

  it ('shoud describe form', async () => {
    const $route = {
      path: '/'
    }
    const wrapper = mount(Login, { localVue, vuetify, router, mocks: { $route } });

    const validate = jest.fn()
    const submitHandler = jest.fn()

    wrapper.setMethods({ validate, submitHandler })

    const form = wrapper.find('[data-test="auth-form"]')
    const email = wrapper.find('[data-test="email"]')
    const password = wrapper.find('[data-test="password"]')
    const button = wrapper.find('[data-test="submit-btn"]')

    email.element.value = 'ddd@gnail.com'
    email.trigger('input')

    password.element.value = 'ddd@gnail.com'
    password.trigger('input')

    button.trigger('click')

    form.trigger('submit')

    expect(email.element.value).toEqual('ddd@gnail.com')
    expect(password.element.value).toEqual('ddd@gnail.com')
    expect(wrapper.vm.validate).toHaveBeenCalled()
    expect(wrapper.vm.submitHandler).toHaveBeenCalled()
    expect(wrapper.vm.$route.path).toEqual('/')
  })

})