<template>
<div>
  <Loader v-if="loading" />

  <div v-else>
  <div class="signin-head mb-7">
    <h3>
      Sign in
    </h3>
    <span>
       Не зареєстрований? 
      <router-link 
      to="/register" tag="a">
        Зареєструйся!
      </router-link>
    </span>
  </div>

  <v-form
    data-test="auth-form"
    @submit.prevent="submitHandler"
    ref="form"
    v-model="valid"
    lazy-validation
  >
   <v-text-field
     data-test="email"
      outlined
      filled
      v-model="email"
      :rules="emailRules"
      placeholder="E-mail"
      required
    ></v-text-field>

    <v-text-field
     data-test="password"
      outlined
      filled
      v-model="password"
      :counter="20"
      :rules="passwordRules"
      placeholder="Password"
      required
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-btn
      data-test="submit-btn"
      type="submit"
      :disabled="!valid || hold"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Sign In
    </v-btn>

  </v-form>

  </div> 
</div> 
</template>

<script>
import { getModule } from 'vuex-module-decorators'
import Auth from '../store/modules/auth'
import Loader from '@/components/Loader.vue'
  export default {

    layout: 'empty',
    data: () => ({
      loading: true,
      show1: false,
      hold: false,
      valid: true,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 7) || 'Password must be more than 7 characters',
        v => (v && v.length <= 20) || 'Password must be less than 20 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }),
    head() {
      return { title: 'Login | VuePizza' }
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      async submitHandler () {
        this.hold = true
        const formData = { email: this.email, password: this.password }
        if (this.$refs.form.validate()) {
          try {
            await getModule(Auth, this.$store).logIn(formData)
            this.$router.push('/?message=loggedIn')
          }
          catch(e) { this.$emit('message', e.code); this.hold = false; console.log(e) }
        } 
        else this.hold = false
      }
    },
    components: {
      Loader
    },
    mounted() {
      this.loading = false
    }

  }
</script>

<style lang="scss" scoped>
  form {
    width: 100vw;
    max-width: 400px;
  }
  .signin-head {

    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 8px;
    & h3{
      font-size: 32px;
      font-family: DD-TTNorms, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      font-weight: 700;
      line-height: 40px;
      letter-spacing: -0.04ch;
      text-transform: none;
      color: rgb(25, 25, 25);
      margin: 0px;
      padding: 0px;
      display: block;
      font-variant-ligatures: no-common-ligatures;
    }
    & span {
      font-size: 16px;
      font-family: DD-TTNorms, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0ch;
      text-transform: none;
      color: rgb(118, 118, 118);
      margin: 0px;
      padding: 0px;
      display: block;
      font-variant-ligatures: no-common-ligatures;
      & a {
        transition: 0.15s;
        color: #48D618 !important;
        &:hover {
          color: #41B619 !important;
        }
        
      }
    }
  }
</style>