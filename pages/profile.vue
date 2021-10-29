<template>
 <main style="padding-top:20px">
    <Loader v-if="loading" />
  <div class="qu_container" v-else>
    <div style="margin-bottom: 20px">
    <div class="flex justify-center">
      <div class="relative">
      <v-avatar
        class="relative"
        @click="dialog = true"
        size="256"
      > 
      <img
        :src="img"
        alt="John"
      >
        <v-overlay
         
          :absolute="true"
          class="cursor-pointer opacity-0 duration-200 avatar-overlay"
        >
        <v-icon style="font-size: 40px">mdi-pencil</v-icon>
        </v-overlay>
      </v-avatar>
      </div>
    </div>
     <div class="profile_text">
        <h2 @click="dialog = true">{{user.name}}</h2>
        <span @click="dialog = true">{{user.email}}</span>
     </div>
     <div class="flex justify-between items-center">
      <h2 class="profile-h2 my-3">Нещодавні замовлення:</h2>
       <v-btn
          v-if="orders.length > slicedOrders.length"
          rounded
          color="success"
          dark
        >
        Ще: +{{orders.length - slicedOrders.length}}
      </v-btn>
     </div>
      <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="flex justify-between">
          <div>
            <v-img :src="Popups[1]" width="48" height="48" alt="" />
          </div>
          
          <button style="font-size: 54px; font-weight: 400" @click="dialog = false">&times;</button>
        </v-card-title>


        <v-card-text class="text-center flex">
        <v-avatar
            class="relative"
            size="164"
          > 
          <img
            :src="img"
            alt="John"
          >
          <v-overlay
            :absolute="true"
            class="cursor-pointer opacity-0 duration-200 avatar-overlay"
          >
          <input @change="changeImage" type="file" class="opacity-0  cursor-pointer" style="width: 169px; height: 169px">
          <v-icon style="font-size: 20px;">mdi-pencil</v-icon>
        </v-overlay>

      </v-avatar>
          <div class="flex flex-col justify-center items-center">
            <v-text-field
              placeholder="Name"
              v-model="name"
              style="transform: translateY(20px)"
            ></v-text-field>

          <button class="footer__btn" @click="changeProfile" :disabled="hold">Редагувати</button>
          
        </div>
        </v-card-text>

        <v-img :src="Popups[0]" style="margin-left: auto; transform: translate(-20px, -20px)" width="48" height="48" alt="" />
      </v-card>
    </v-dialog> 
    <div v-if="!orders.length" class="else-sheet">
      <p style="margin: 1rem 0px">Немає жодного Замовлення</p>
    </div>

    <div v-else>
      <div style="margin-bottom: 20px" v-for="order in slicedOrders" :key="order.createdAt" class="else-sheet">
      <OrderCard  :order="order"/>
    </div>

    </div>
  </div>
  </div>
  </main> 
</template>

<script lang="ts">
import { Popups } from '@/utils/pizza'
import OrderCard from '@/components/quantity/OrderCard.vue'
import Loader from '@/components/Loader.vue'
import { U } from '@/types/types'
import additions from '@/utils/additions'
import { IAddition, IOrder } from '@/types/constructor'
import { getModule } from 'vuex-module-decorators'
import { mapGetters } from 'vuex'
import Quantity from '@/store/modules/quantity'
import Auth from '@/store/modules/auth'

import noUser from '@/middleware/auth_middleware'
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  middleware: [noUser],
  components: { Loader, OrderCard },
  computed: {
    ...mapGetters({
      orders: 'Quantity/orders',
      user: "Auth/user"
    })
  },
 
})
export default class PageQuantity extends Vue {
  orders: IOrder[]
  Popups: string[] = Popups
  dialog: boolean = false
  additions: IAddition[] = additions
  user: U
  hold: boolean = false
  img: any = ''
  name: string = ''
  loading: boolean = true

  mounted(): void {
    this.loading = false 
    this.name = this.user.name
    this.img = this.user.img
   
  }
  get slicedOrders(): IOrder[] {
    return this.orders.slice(0, 2)
  }

  changeImage (e: any) {
    const reader = new FileReader()
    const file = e.target.files[0]
    reader.readAsDataURL(file);
    reader.onloadend = () => { console.log(reader.result); this.img = reader.result }
  }

  async changeProfile() {
    this.hold = true
    try {
      await getModule(Auth, this.$store).changeUserProfile([this.img, this.name])
      this.dialog = false
      this.$nuxt.$emit('message', 'account_updated')
    } catch { this.hold = false }
   
   
  }
}
</script>

<style lang="scss" scoped>
.footer__btn {
  margin-left: 12px;
  padding: 12px 34px;
  font-size: 16px;
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
.profile_text {
  text-align: center;
  margin: 15px 0px;
  & h2 {
    font-size: 24px;
    font-weight: 700;
    font-style: normal;
    line-height: 42px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    color: #000000;
    &:hover {
      text-decoration: underline;
    }
  }
  & span {
    cursor: pointer;
      &:hover {
      text-decoration: underline;
    }
  }
}
.profile-h2 {
  font-size: 24px;
  font-weight: 700;
  font-style: normal;
  line-height: 42px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  color: #000000;
}
.footer-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.flex {
  display: flex;
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
.avatar-overlay {
  &:hover {
    opacity: 1 !important;
  }
}
</style>