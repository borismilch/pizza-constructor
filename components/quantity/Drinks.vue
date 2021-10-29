<template>

<div class="addition">
  <div class="flex">
    <div style="margin-right: 15px">
      <img
      :src="addition.image"
      >
    </div>
    <span style="font-weight: 700" class="addition-title">{{addition.name }}  ({{addition.price}}₽)</span>
  </div>
  <div class="flex justify-between items-center flex-1 px-3" style="width: 100%">

    <div class="counter flex items-end mt-1" >
      <button class="counter__minus" :disabled="readonly" @click="count--"><v-icon>mdi-minus</v-icon></button>
      <input type="text" :readonly="readonly" style="height: 20px" v-model.number="count">
      <button class="counter__plus" :disabled="readonly" @click="count++"><v-icon>mdi-plus</v-icon></button>
    </div>
    <span class="price">{{count * addition.price}} ₽</span>

  </div>
</div>

</template>

<script lang='ts'>
import { mapGetters } from 'vuex'
import { IAddition, IAdditionsStore } from '@/types/constructor'
import Quantity from '@/store/modules/quantity'
import { getModule } from 'vuex-module-decorators'
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
@Component({
  computed: {
    ...mapGetters({
      additionsObj: 'Quantity/additionsObj'
    })
  },
})
export default class QuantityDrinks extends Vue {
  @Prop()
  addition: IAddition

  @Prop({default: 0})
  value: number

  @Prop({ default: false })
  readonly: boolean

  count: number = 0
  additionsObj: IAdditionsStore

  @Watch("count", { immediate: true })
  onChange(newV: any): void {
    if (!this.readonly) {
      if ( typeof newV !== "number") { this.count = 0 }
      else if (newV < 0) { this.count = 0 }
      getModule(Quantity, this.$store).changeAdditionCount([this.count, this.addition.code, this.addition.price])
    }
  }
  get ourObject(): any {
    return this.additionsObj[this.addition.code]
  }
  mounted(): void {
    console.log(this.value, this.readonly)
    this.count = this.value 
  }

}

</script>

<style lang='scss' scoped>
  .price {
    font-size: 16px;
    font-weight: 700;
    font-style: normal;
    line-height: 19px;
  }
  .addition {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex: 0 0 200px;
    margin-right: 15px;
    margin-bottom: 15px;
    padding: 15px 5px 15px 5px;

    border-radius: 8px;

    background-color: #ffffff;
    box-shadow: 0 4px 8px rgb(0 0 0 / 8%), 0 0 2px rgb(0 0 0 / 10%), 0 0 1px rgb(0 0 0 / 12%);
  }

  .counter {
    align-items: center;
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

</style>