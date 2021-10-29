<template>
  <div class="flex relative">
    <v-img width="32" height="32" :src="ing.image" style="position: absolute" />
    <div class="flex flex-col" style="padding-left: 35px">
      <span>{{ing.name}}</span>
      <div class="counter flex items-end mt-1">
        <div class="counter__minus" @click="count--"><v-icon>mdi-minus</v-icon></div>
        <input type="text" style="height: 20px" v-model.number="count">
        <div class="counter__plus" @click="count++"><v-icon>mdi-plus</v-icon></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>

import { mapGetters } from 'vuex'
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { IIngredient, IIIngredient2 } from '@/types/constructor'
@Component({
  computed: {
    ...mapGetters({
      controll: 'Quantity/controll'
    })
  },
})

export default class Ing extends Vue {
  @Prop()
  ing: IIngredient

  @Prop()
  startCount: number

  count: number = 0
  controll: boolean

  @Watch("count", { immediate: true })
  onChange(newV: any): void {
    if ( typeof newV !== "number") { this.count = 0 }
    else if (newV > 3) { this.count = 3 }
    else if (newV < 0) { this.count = 0 }
    this.$emit('changeValue', [this.ing.value, this.ings.slice(0, this.count)])
  }
   get ings (): IIIngredient2[] {
     return [{...this.ing}, {...this.ing}, {...this.ing}].map((ng: IIngredient, idx: number): IIIngredient2 => {
      return { ...ng, rotation: 45 * idx }
     })
   }
  @Watch("controll", { immediate: true })
  onControll(): void { this.count = 0 }
  mounted() {
    if (this.startCount) {
      this.count = this.startCount 
    }
   
  }
}

</script>

<style lang='scss' scoped>
  .counter {
    &__plus {
      background-color: #41B619;
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
</style>