<template>
<div>
<Loader v-if="loading" />

<div v-else>
  <div class="signin-head mb-7" >
    <h3>
      Sign up
    </h3>
    <span>
       Вже зареєстрований? 
      <router-link 
      to="/signin" tag="a">
        Ввійди!
      </router-link>
    </span>
  </div>

  <v-form
    @submit.prevent="submitHandler"
    ref="form"
    data-test="reg-form"
    v-model="valid"
    lazy-validation
  >
   <v-text-field
      outlined
      filled
      :counter="15"
      v-model="name"
      :rules="nameRules"
      placeholder="Name"
      data-test="name"
      required
    ></v-text-field>

   <v-text-field
      outlined
      filled
      data-test="email"
      v-model="email"
      :rules="emailRules"
      placeholder="E-mail"
      required
    ></v-text-field>

    <v-text-field
      outlined
      data-test="password"
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

      <v-text-field
      outlined
      filled
      data-test="password2"
      v-model="password2"
      :counter="20"
      :rules="passwordRules"
      placeholder="Password"
      required
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show2 ? 'text' : 'password'"
      @click:append="show2 = !show2"
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Agree private policy"
      required
    ></v-checkbox>

    <v-btn
      type="submit"
      data-test="submit-btn"
      :disabled="!valid || hold"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Register
    </v-btn>

  </v-form>

</div>  
</div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import { getModule } from 'vuex-module-decorators'
import Auth from '../store/modules/auth'
  export default {
    components: {
      Loader
    },
    layout: 'empty',
    data: () => ({
      valid: true,
      loading: true,
      hold: false,
      show1: false,
      show2: false,
      name: '',
      nameRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 3) || 'Name must be more than 3 characters',
        v => (v && v.length <= 15) || 'Name must be less than 15 characters',
      ],
      password: '',
      password2:'',
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
      checkbox: false,
    }),
    head() {
      return { title: 'Register | VuePizza' }
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      async submitHandler () {
        this.hold = true
        const formData = { email: this.email, password: this.password, name: this.name, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPN5f-WH3w4E7DN2bvSw1sincf2r0_qzu1dg&usqp=CAU" }
        if (this.password !== this.password2) {
          this.$emit('message', 'not_same_passwords'); 
          this.hold = false
          
        }
        else if (this.$refs.form.validate()) {
          try {
            await (getModule(Auth, this.$store)).register(formData)
            this.$router.push('/?message=registered')
          } catch (e) { this.$emit('message', e.code); this.hold = false }
        } else this.hold = false
      }
    },
    mounted() {
      this.loading = false
    },

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