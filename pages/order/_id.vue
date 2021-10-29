<template>
 <main style="padding-top:20px">
    <Loader v-if="loading" />
  <div class="qu_container" v-else>
    <div style="margin-bottom: 20px">
    <div>
      <h2 class="qu_title">Корзина</h2>
    </div>
    <div class="pizza-list" v-if="(current.pizzas || []).length">
      <PizzaCard v-for="(pizza, idx) in current.pizzas" :idx="idx" :key="pizza.id" :pizza="pizza" />
    </div>
    <div class="else-sheet" v-else>
      <p style="margin: 1rem 0px">В корзині немає жодного товару</p>
    </div>

    </div>
     <div class="flex">
    <Addition 
      :addition="add" :key="add.code" 
      :value="(current.additions[idx].count)" 
      v-for="(add, idx) in additions"
    />
    </div> 
    <QForm @changeForm ="updateForm($event)"/>
    <div class="footer-wrapper">
      <Footer @addOrder="addOrder" :order="true" :myPrice="current.price" />
    </div>
  </div>
  
  </main> 
</template>

<script lang="ts">

import Footer  from '@/components/quantity/Footer.vue'
import Loader from '@/components/Loader.vue'
import QForm from '@/components/quantity/Form.vue'
import Addition from '@/components/quantity/Drinks.vue'
import additions from '@/utils/additions'
import { Prod,  IAddition, IForm, IAdditionsStore,IOrder } from '../../types/constructor'
import { U } from '@/types/types'
import { getModule } from 'vuex-module-decorators'
import { mapGetters } from 'vuex'
import Quantity from '@/store/modules/quantity'
import PizzaCard from '@/components/quantity/PizzaCard.vue'
import noUser from '../../middleware/auth_middleware'
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  middleware: [noUser],
  components: { PizzaCard, Addition, QForm, Loader, Footer },
  computed: {
    ...mapGetters({
      orders: 'Quantity/orders',
      user: 'Auth/user',
      price: 'Quantity/price'
    })
  },
 
})
export default class PageQuantity extends Vue {
  orders: IOrder[]
  additions: IAddition[] = additions
  user: U
  price: number
  form: IForm = {
    getting: 'self',
    telephone: '',
    street: '',
    house: '',
    houseroom: ''
  }
  loading: boolean = true

  updateForm (e:IForm) {
    this.form = e
  }

  mounted(): void {
    this.loading = false 
    let adds:IAdditionsStore  = {}
    this.current!.additions
    .forEach(a => {
      adds[a.code] = a
    });
    getModule(Quantity, this.$store).setAdditions(adds)
    console.log(adds)
    getModule(Quantity, this.$store).setItems(this.current!.pizzas)
  }
  head() {
    return { title: 'Order | VuePizza' }
  }

  get current(): IOrder | undefined {
    return this.orders.find(o => o!.id === this.$route.params.id)
  }
  async addOrder () {
     const additions = getModule(Quantity, this.$store).additionsObj
    const order: IOrder = {
      additions: Object.keys(additions).map(key => ({...additions[key], name: key})),
      ...this.form,
      pizzas: this.current!.pizzas,
      owner: this.user.id,
      price: this.price,
      createdAt: Date.now(),
      raiting: Math.floor(Math.random() * 5)
    }
    await getModule(Quantity, this.$store).addOrder(order)
    this.$nuxt.$emit('message', 'ordered')
    this.loading = true
    await getModule(Quantity, this.$store).fetchOrders()
    this.$router.push('/history')
  }
}
</script>

<style>
.footer-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.flex {
  display: flex;
}
.else-sheet {
  padding: 20px 30px;
  padding-top: 15px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgb(0 0 0 / 8%), 0 0 2px rgb(0 0 0 / 10%), 0 0 1px rgb(0 0 0 / 12%);

}
.qu_title {
  font-size: 36px;
  font-weight: 700;
  font-style: normal;
  line-height: 42px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  width: 100%;
  color: #000000;
}
.qu_container {
  max-width: 770px;
  width: 100vw;
  margin: 0 auto;

}
.pizza-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  padding: 15px 0px;
  padding-top: 15px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgb(0 0 0 / 4%), 0 0 2px rgb(0 0 0 / 6%), 0 0 1px rgb(0 0 0 / 4%);

}
</style>