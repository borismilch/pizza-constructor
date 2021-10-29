import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Sheet  from '@/components/constructor/sheet.vue'
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
    const wrapper = mount(Sheet, { localVue, vuetify, router });
    let items = wrapper.findAll('[data-test="sheet-item"]')
    console.log(items.length)
    expect(items.length).toEqual(0)
    await wrapper.setProps({ items: [
      {
        "id": 1,
        "name": "Тонкое",
        "image": '../lightDougth',
        "description": "Из твердых сортов пшеницы",
        "price": 300,
        "value": "light",
        "default": true
      },
      {
        "id": 2,
        "name": "Толстое",
        "image": '../images/sds',
        "description": "Из твердых сортов пшеницы",
        "price": 400,
        "value": "large"
      }
    ], })

    items = wrapper.findAll('[data-test="sheet-item"]')
    expect(items.length).toEqual(2)
    items.at(0).trigger('click')

    items.at(1).trigger('click')
    expect(wrapper.emitted().echangeForm.length).toEqual(2)
  })

})