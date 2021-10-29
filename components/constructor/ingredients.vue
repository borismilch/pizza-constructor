<template>
  <div class="flex flex-col sheet">
    <div class="sheet-title">
      {{ title }}
    </div>

    <div class="sheet__content flex flex-col">
       <slot style="width: 100%"> </slot>
    <div class="gr">
      <slot name="content"></slot>
    </div>
  </div>
  </div>  
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { IIngredient } from '@/types/constructor'
@Component({
  props: {
    title: String,
  }
})
export default class Ingredients extends Vue {
  @Prop()
  items: IIngredient[]
  
}
</script>

<style lang="scss" scoped>
 .sheet {
    margin: 0px 20px 0px 0px ;
    padding-top: 15px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgb(0 0 0 / 4%), 0 0 2px rgb(0 0 0 / 6%), 0 0 1px rgb(0 0 0 / 4%);
 }
  .sheet-title {
    font-size: 18px;
    font-weight: 700;
    font-style: normal;
    line-height: 21px;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    color: #000000;

    padding-right: 18px;
    padding-left: 18px;
  }
  .sheet__content {
    margin-top: 8px;
    padding: 18px 18px 0px 18px; 
    border-top: 1px
    solid rgba(65, 182, 25, 0.1);

  }
  .sheet-item {
    position: relative;
    margin-right: 4%;
    display: flex;
    align-items: center;
    cursor: pointer;
    & b {
      font-size: 16px;
      font-weight: 400;
      font-style: normal;
      line-height: 19px;
    }
    & span {
      font-size: 11px;
      
      font-weight: 300;
      font-style: normal;
      line-height: 13px;
      display: block;
    }
  }
  .gr {
    display: grid;
    grid-template-columns: repeat(4, 121px) !important;
    grid-template-rows: repeat(4, 67px) !important;;
  }
  .gr-item {
    width: 100px;
    min-height: 40px;
    margin-right: 17px;
    margin-bottom: 15px;

  }
</style>