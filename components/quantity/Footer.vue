<template>
  <section class="flex justify-between quattity_footer">
    <div class="flex items-center">
      <router-link
        to="/" v-if="order" tag="button" class="footer_back d-flex button-flex items-center">
        <img :src="arrowLeft" style="display: inline" alt="">
      На головну
      </router-link>
      <router-link 
      to="/constructor" v-else-if="!view && !order" tag="button" class="footer_back d-flex button-flex items-center">
        <img :src="arrowLeft" style="display: inline" alt="">
       {{ items.length? 'Хочу еще одну' : 'Створити піццу'}} 
       </router-link>

       <router-link
        to="/history" v-else-if="view" tag="button" class="footer_back d-flex button-flex items-center">
        <img :src="arrowLeft" style="display: inline" alt="">
       Інші замовлення
       </router-link>

      <p class="footer__text">
        Перейти к конструктору <br> чтоб собрать ещё одну пиццу
      </p>
    </div>
    <div class="flex items-center">
      <div class="footer__price">
        <b>Ітого: {{view? myPrice : total}} ₽</b>
      </div>
      <button v-if="!view" class="footer__btn" :disabled="!items.length || (total === 0)" @click="placeOrder">Оформить заказ</button>

      <router-link tag="button" to="/constructor" v-else class="footer__btn">Замовити ще!</router-link> 
      <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="flex justify-between">
          <div>
            <v-img :src="Popups[1]" width="48" height="48" alt="" />
          </div>
          
          <button @click="$emit('addOrder')" style="font-size: 54px; font-weight: 400">&times;</button>
        </v-card-title>

        <v-card-text class="text-center ">
          <h3 class="h2">Спасибо за заказ</h3>

          <p class="popup_p">Мы начали готовить Ваш заказ,<br> скоро привезём его вам ;)</p>
          <div class="flex justify-center">
            <button class="footer__btn" @click="$emit('addOrder')">Оформить заказ</button>
          </div>
        
        </v-card-text>

        <v-img :src="Popups[0]" style="margin-left: auto; transform: translate(-20px, -20px)" width="48" height="48" alt="" />
      </v-card>
    </v-dialog>
    </div>
  </section>
</template>

<script lang='ts'>
import { Popups } from '@/utils/pizza'
import { arrowLeft } from '@/utils/pizza'
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { Prod } from '@/types/constructor'
@Component({
  computed: {
    ...mapGetters({
      total: 'Quantity/price',
      items: 'Quantity/items',
    })
  },
})
export default class QuantityFooter extends Vue {
  @Prop()
  myPrice: number

  @Prop({ default:false })
  view: boolean

  @Prop({ default:false })
  order: boolean

  total: number
  dialog: boolean = false
  items: Prod[]
  arrowLeft: string = arrowLeft
  Popups: string[] = Popups

  placeOrder () {
    this.dialog = true
  }
  @Watch("dialog", { immediate: true })
   onControll(newVal: boolean, oldVal: boolean): void { 
    if (newVal === false && oldVal === true) {
      this.$emit('addOrder')
    }
  }

}

</script>

<style lang='scss' scoped>
.h2 {
  display: block;
  font-size: 1.7em;
  font-weight: bold;
  color: #000 !important;
}
.d-flex {
  display: flex !important;
}
.button-flex {
  justify-content: center;
  gap: 10px;
}
 .quattity_footer {
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 25px 2.12%;
  background-color: rgba(65, 182, 25, 0.1);
 }
  .popup_p{
    margin-top: 24px;
    margin-bottom: 24px;
    text-align: center;
  }
 .footer__text {
    font-size: 11px;
    font-weight: 300;
    font-style: normal;
    line-height: 13px;
    color: rgba(0, 0, 0, 0.5);
}
.footer__price {
  font-size: 24px;
  font-weight: 700;
  font-style: normal;
  line-height: 28px;
  margin-right: 12px;
  margin-left: auto;
}
.footer__btn {
  margin-left: 12px;
  padding: 16px 49px;
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  line-height: 21px;
  font-family: inherit;
  display: block;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.3s;
  z-index: 10;
  text-align: center;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: 0 16px 24px rgb(0 0 0 / 6%), 0 2px 6px rgb(0 0 0 / 4%), 0 0 1px rgb(0 0 0 / 4%);
  background-color: #41B619;
  &:disabled {
    background-color: #8CB97C;
    color: rgba(255, 255, 255, 0.2);
    cursor: default;
  }
  &:not(:disabled) {
    &:hover {
    background-color: #48D618;
  }
  }
}
.footer_back {
  padding-top: 16px !important;
  padding-bottom: 16px !important;

  background-color: transparent;
  border: 1px solid #41B619 !important;
  color: #000000;
  box-shadow: none;

  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  line-height: 21px;
  font-family: inherit;
  display: block;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  border: none;
  border-radius: 8px;
  outline: none;
  width: 220px;
  margin: 0px 15px 0px 0px;
  &:hover {
    color: #48D618;
  }
}
</style>