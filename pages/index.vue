<template>
<div>
  <Loader v-if="loading" />
  <section v-else>
    <h3 class="qu_title">
      Популярне:
    </h3>
    <div class="qu-grid">
      <HomeCard v-for="order in orders" :order="order" :key="order.id" />
      
    </div>
  </section>
</div>


</template>

<script lang="ts">
import { IOrder } from '@/types/constructor'
import { mapGetters } from 'vuex'
import HomeCard from '@/components/HomeCard.vue'
import Quantity from '../store/modules/quantity'
import { getModule } from 'vuex-module-decorators'
import Loader from '@/components/Loader.vue'
import noUser from '../middleware/auth_middleware'
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  middleware: [noUser],
  components: { Loader, HomeCard },
  computed: {
     ...mapGetters({
    orders: 'Quantity/orders'
  })
  },
})
export default class HomePage extends Vue {
  loading: boolean = true
  orders: IOrder[]

  async mounted() {
    await getModule(Quantity, this.$store).fetchOrders()
    this.loading = false
    console.log(this.orders)
  }
  head() {
    return { title: 'Home | VuePizza' }
  }
}
</script>

<style lang="scss" scoped>
.qu-grid {
  margin-top: 40px;
  grid-gap: 24px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fill, minmax(240px, 240px));
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
</style>
