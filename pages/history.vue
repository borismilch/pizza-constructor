<template>
<div>
   <Loader v-if="loading" />
 <div v-else>
    <div class="sidebar">
      <div class="sidebar_content">
        <span class="layout_link">Замовлення</span>
        <span class="layout_link">Профіль</span>
      </div>
    </div>
  <section style="padding-left: 10px">
    <h3 class="qu_title">
      Ваші замовлення:
    </h3>
    <div>
    <div v-if="!orders.length" class="else-sheet">
      <p style="margin: 1rem 0px">Немає жодного Замовлення</p>
    </div>
    <div v-else>
      <div style="margin-bottom: 20px" v-for="order in orders" :key="order.createdAt" class="else-sheet">
      <OrderCard  :order="order"/>
    </div>
    </div>
    
   
  </div>
  </section>
  </div>
</div>
 
</template>

<script lang="ts">
import { IOrder } from '@/types/constructor'
import OrderCard from '@/components/quantity/OrderCard.vue'
import Loader from '@/components/Loader.vue'
import noUser from '../middleware/auth_middleware'
import { mapGetters } from 'vuex'
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  middleware: [noUser],
  components: { Loader, OrderCard },
  computed: {
    ...mapGetters({
      orders: 'Quantity/filteredOrders'
    })
  },
})
export default class Quantity extends Vue {
  orders: IOrder[]
  loading: boolean = true
  mounted() {
   this.loading = false 
  }
  head() {
    return { title: 'Orders | VuePizza' }
  }
}

</script>


<style lang="scss">
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
.sidebar {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 180px;
  height: 100%;
  background-color: rgba(65, 182, 25, 0.05);
  display: flex;
  flex-direction: column;
}
.layout_link {
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  line-height: 16px;
  display: block;
  padding: 8px 14px;
  transition: 0.3s;
  color: #000000;
  &:hover {
    background-color: rgba(65, 182, 25, 0.1);
  }
  
}
.sidebar_content {
  display: flex;
  flex-direction: column;
  margin-top: 80px;
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
