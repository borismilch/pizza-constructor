<template>
  <v-card
    class="mx-auto card-hover flex flex-col justify-between"
    style="min-width: 240px !important"
  >
    <v-img
     :src="Product"
      height="170px"
      contain
    ></v-img>

    <v-card-title>
      {{order.pizzas[0].title}}
    </v-card-title>

    <v-card-subtitle style="overflow: hidden; text-overflow: ellipsis;  white-space: nowrap;">
      {{Array.from(new Set(order.pizzas[0].allIngs.map(o => o.name)).keys()).join(', ')}}
    </v-card-subtitle>

    <v-card-actions>
      <template>
      <v-btn data-test="btn" color="success" @click="addOrderToCart(order)" block>
        Дивитись
      </v-btn>
    </template>
    </v-card-actions>

  </v-card>
</template>

<script lang="ts">
import { Product } from '@/utils/pizza'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { IOrder } from '@/types/constructor'

@Component({})
export default class HomeCard extends Vue {
  @Prop()
  order: IOrder

  Product: string[] = Product

  addOrderToCart (order: IOrder):void {
    this.$router.push(`/order/${order.id}`)
  }
}

</script>

<style lang="scss">
  .hower-card {

  }
</style>
