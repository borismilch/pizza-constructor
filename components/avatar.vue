<template>
<div style="width:150px">
<div class="flex duration-200 rounded items-center user" style="width: 150px; padding: 14px" @click="dropdown = !dropdown">
  <div class="flex flex-col text-right p-4 user-credentials">
    <span>{{name}}</span>
    <a>{{email}}</a>
  </div>
  <v-avatar
    color="primary"
    size="33"
  >
    <img
      :src="img"
      alt="John"
    >
  </v-avatar>
</div>

<div
    class="relative z-50"
    style="width: 220px; transform: translate(-30%, 0px)"
  >
    <ul
      v-if="dropdown"
      @click="dropdown = false"
      class="absolute p-1 user-dropdown w-full rounded mt-1 font-bold z-50"
    >
      <router-link tag="li" to="/profile" class="dropdown-li z-50" @click="$emit('remove')">Профіль</router-link>
      <li @click="logout" class="dropdown-li z-50">
        Вийти
      </li>
    </ul>
  </div>

</div>

</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { U } from '../types/types'
import { getModule } from 'vuex-module-decorators'
import { Component, Vue } from 'nuxt-property-decorator'
import Auth from '../store/modules/auth'
@Component({
  computed: {
    ...mapGetters({
      user: 'Auth/user'
    })
  }
})
export default class AvatarProfile extends Vue {
  public user: U
  name: string = ''
  email: string = ''
  img: string = ''
  dropdown: Boolean = false

  mounted() {
    this.updateData()
  }
  updateData() {
    const user: any = getModule(Auth, this.$store).currentUser
    this.name = user.name 
    this.email = user.email
    this.img = user.img
  }

  logout() {
    getModule(Auth, this.$store).logOut()
    this.$router.push('signin?message=leave')
  }
}
</script>

<style lang="scss" scoped>
  .v-application ul {
  padding: 0.5rem !important;
}
.self-end {
  margin-left: auto;
}
.user-credentials {
  margin-right: 4px;
  & span{
    font-size: 13px;
    color: #fff;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  & a {
    font-size: 11px;
    color: #fff;
    opacity: 0.6;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
.user {

  background: transparent;
  &:hover {
    background: #48D618;
  }
}
.user-dropdown {
  background: #48D618;
}
.dropdown-li {
  color: #fff;
  z-index: 2;
  opacity: 0.8;
  &:hover {
    background: #43e20e;
  }
}
</style>