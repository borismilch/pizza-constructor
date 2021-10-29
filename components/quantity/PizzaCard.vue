<template>
  <div class="pizza-item flex items-center">
    <div style="align-self: center">
    <img
      :src="Product"
      width="56"
      height="56"
    >
    </div>
    <div class="flex-1 flex">
     <div class="flex flex-col" style="margin-left: 15px; max-width: 150px">
     <h2 class="pizza-titl-small">{{pizza.title}}</h2>
      <ul class="product-list"> 
        <li style="white-space: nowrap;">{{pizza.size === 'small' ? '23 сантиметра' : pizza.size === 'normal' ? '32 сантиметра' : '45 сантиметрів' }}, {{pizza.dough === 'light' ? 'на тонкому тісті' : 'на товстому тісті'}}</li>
        <li>Соус: {{pizza.sauce === 'tomato' ? 'із породічок' : 'із мастьов'}}</li>
        <li class="hidden-dots">Начинка: {{Array.from(new Set(pizza.allIngs.map(ng => ng.name)).values()).join(', ') }}</li>
      </ul>
   </div>
  </div>
    <div class="counter flex items-end mt-1" >
      <button class="counter__minus" :disabled="readonly" @click="count--"><v-icon>mdi-minus</v-icon></button>
      <input type="text" :readonly="readonly" style="height: 20px" v-model.number="count">
      <button class="counter__plus" :disabled="readonly" @click="count++"><v-icon>mdi-plus</v-icon></button>
    </div>
    <div class="pizza-item__price">
      <b>{{pizza.price * count}} ₽</b>
    </div>
    <router-link v-if="!readonly" :to="`/constructor?update=${idx}`" class="pizza-link">Змінити</router-link>
  </div>

</template>

<script lang='ts'>

import Quantity from '@/store/modules/quantity'
import { getModule } from 'vuex-module-decorators'
import { Prod } from '@/types/constructor'
import pizza, { Product } from '../../utils/pizza'
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

@Component({})
export default class QuantitPizza extends Vue {
  @Prop()
  pizza: Prod
  @Prop()
  idx: number

  @Prop({})
  readonly: boolean

  count: number = 1
  Product: string = Product

  @Watch("count", { immediate: true })
  onChange(newV: any): void {
    if (!this.readonly) {
      if ( typeof newV !== "number") { this.count = 0 }
      else if (newV < 0) { this.count = 0 }
      getModule(Quantity, this.$store).changeCount([this.count, this.idx])
    }
  }
}

</script>

<style lang='scss' scoped>
  .hidden-dots {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pizza-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    border-bottom: 1px
    solid rgba(65, 182, 25, 0.1);

    &__price {
      min-width: 100px;
      margin-right: 36px;
      margin-left: 10px;
      text-align: right;
    }

  }
    .counter {
    flex: 0 0 auto;
    &__plus {
      background-color: #FF842B;
      position: relative;
      display: block;
      width: 16px;
      height: 16px;
      color: #fff !important;
      margin: 0;
      fill: #fff;
      padding: 0;
      cursor: pointer;
      transition: 0.3s;
      border: none;
      border-radius: 50%;
      outline: none;
      &:disabled{
        opacity: 0.5;
      }
      & i {
        font-size: 16px !important;
        transform: translateY(-6px);
      }
    }

    &__minus {
      background-color: #F2EEF5;
      position: relative;
      display: block;
      width: 16px;
      height: 16px;
      margin: 0;
      padding: 0;
      cursor: pointer;
      transition: 0.3s;
      border: none;
      border-radius: 50%;
      outline: none;
      &:disabled{
        opacity: 0.5;
      }
        & i {
        font-size: 16px !important;
          transform: translateY(-6px);
      }
    }

    & input {
      font-size: 14px;
      font-weight: 400;
      font-style: normal;
      line-height: 16px;
      box-sizing: border-box;
      width: 22px;
      margin: 0;
      padding: 0 3px;
      text-align: center;
      color: #000000;
      border: none;
      border-radius: 10px;
      outline: none;
      background-color: transparent;
      &:disabled{
        opacity: 0.5;
      }
    }
  }
  .pizza-titl-small {
    font-size: 18px;
    font-weight: 700;
    font-style: normal;
    line-height: 21px;
    margin-top: 0;
    margin-bottom: 10px;
  }
  .product-list {
    list-style-type: none;
    font-size: 11px;
    font-weight: 300;
    font-style: normal;
    line-height: 13px;
  }
  .pizza-link {
    font-size: 11px;
    font-weight: 300;
    font-style: normal;
    line-height: 13px;
    cursor: pointer;
    transition: 0.3s;
    border: none;
    outline: none;
    background-color: transparent;
    &:hover {
      color: #41B619;
      text-decoration: underline;
    }
  }
</style>