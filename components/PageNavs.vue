<template>
  <div class="z-50">
      <v-navigation-drawer
      class="z-10"
      v-model="drawer"
      v-if="!empty"
      fixed
      app
      mobile-breakpoint="2000"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <header
    >
    <div :class="{'wrap': empty}">

      <img @click.stop="drawer = !drawer" :class="{'m-auto': empty}"  :src="main['Logo']" style="width: 90px; height: 40px; cursor: pointer" />
    </div> 
      <v-spacer />

      <div class="flex justify-end" v-if="!empty">
      <router-link 
      class="header-quantity"
      
      to="/quantity">
        {{price}} грн
      </router-link>

    <AvatarProfile />
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import AvatarProfile from './avatar.vue'
import { main } from '../utils/images'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  props: {
   empty: Boolean
  },
   components: {
    AvatarProfile
  },
  computed: {
    ...mapGetters({
      price: 'Quantity/price'
    })
  }
})
export default class PageNavs extends Vue {
  public price: number;
  data() { return {
    main,
    drawer: false,
    items: [
      {
        icon: 'mdi-home',
        title: 'Home',
        to: '/'
      },
      {
        icon: 'mdi-history',
        title: 'Історія заказів',
        to: '/history'
      },
      {
        icon: 'mdi-pizza',
        title: 'Створити піццу',
        to: '/constructor'
      }
    ],
  }}

}
</script>

<style lang="scss" scoped>
  header {
    color: #fff !important;
    z-index: 2;
    display: flex;
    height: 62px;
    align-items: center;
    padding: 0 2.12% !important;
    background-color: #41B619 !important;
    box-shadow: 0 4px 8px rgb(0 0 0 / 4%), 0 0 2px rgb(0 0 0 / 6%), 0 0 1px rgb(0 0 0 / 4%) !important;
  }
  .header-quantity {
    text-decoration: none !important;
    font-size: 16px;
    font-weight: 700;
    font-style: normal;
    line-height: 19px;
    display: block;
    padding-top: 21px;
    padding-right: 15px;
    padding-bottom: 21px;
    padding-left: 58px;
    transition: 0.3s;
    color: #ffffff;
    background-color: #41B619;
    background-image: url('../assets/img/cart.svg');
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 29px 27px;
  }
  .header-link {
    justify-content: center;
    align-items: center;
    display: flex;
    padding-top: 14px;
    padding-right: 20px;
    padding-bottom: 14px;
    padding-left: 20px;
    transition: 0.3s;
    background-color: #41B619;
  }
  .header-link, .header-quantity {
    &:hover {
      background-color: #48D618;
    }
  }
.m-auto {
  margin: 0px auto;
}
.wrap {
  align-self: center;
  position: relative;
  display: flex;
  flex: 1 1 100%;
}
</style>