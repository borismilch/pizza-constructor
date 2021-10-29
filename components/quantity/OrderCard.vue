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
     <h2 class="pizza-titl-small">Замовлено:</h2>
      <h4 class="pizza-titl-xs">{{date(new Date(order.createdAt))}}</h4>
   </div>
  </div>
    <div class="pizza-item__price">
      <b>{{order.price}} ₽</b>
    </div>
    <v-btn
      rounded
      color="success"
      dark
      style="align-self: center"
      @click="$router.push(`/quantity/${order.id}`)"
    >
      Дивитись
    </v-btn>

  </div>

</template>

<script lang='ts'>
import date from '@/utils/filter'
import { IOrder } from '@/types/constructor'
import { Product } from '../../utils/pizza'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class QuantitPizza extends Vue {
  @Prop()
  order: IOrder
  @Prop()
  id: string

  date: (val: string, format: string) => string = date
  Product: string = Product
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
  .pizza-titl-xs {

  }
</style>