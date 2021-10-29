<template>
  <div class="flex flex-col sheet">
    <div class="sheet-title">
      {{ title }}
    </div>

    <div class="sheet__content flex flex-col" :class="grid">
       <slot style="width: 100%"> </slot>
      <div class="flex">
      <label data-test="sheet-item" @click="param === item.value; $emit('echangeForm', item.value)" class="sheet-item" :key="item.text" v-for="item in items">
        <div class="flex items-center">
         <v-avatar size="42 " class="def" :class="{active: param === item.value}" >
         <img
           :src="item.image"
           alt="John"
          >
      </v-avatar>
        <div class="flex flex-col pl-2">
          <b>{{item.name}}</b>
          <span>{{item.description}}</span>
        </div>
        </div>
      </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { IPizza } from '@/types/constructor'
@Component({
  props: {
    title: String,
    isSize: {
      type: Boolean,
      default: false,
    },
    grid: {
      type: String,
      default: 'ddd'
    },
  }
})
export default class Sheet extends Vue {
  @Prop()
  items: IPizza[]
  @Prop()
  param: string
}
</script>

<style lang="scss" scoped>
 .sheet {
    margin: 0px 00px 0px 0px ;
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
    padding: 18px;
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
  .small-grid {
    grid-template-rows: 1;
    grid-template-columns: auto;
  }
  .grid {
    grid-template-rows: auto;
    grid-template-columns: 4;
  }
  .active {
    border-color: #41B619 !important;
  }
  .def {
    transition: all 0.2s ease;
    border-radius: 50%;
    border: 3px solid transparent;
    &:hover {
      border-color: #40b619c5;
    }
  }
</style>