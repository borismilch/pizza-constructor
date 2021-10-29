<template>
<div class="cart-form block my-3">
  <div class="flex-1 flex justify-between">
  <label class="cart-form__select">
    <span class="cart-form__label contact">Получение заказа:</span>
    <select name="test" v-model="form.getting" class="select">
      <option value="self">Заберу сам</option>
      <option value="newAddress">Новый адрес</option>
      <option value="home">Дом</option>
      </select>
  </label>
  <label class="input ml-4 input--big-label flex items-center" style="justify-content: flex-end">
    <span class="contact">Контактный телефон:</span>
    <input :readonly="readonly" type="text" v-model="form.telephone" name="tel" style="width: 180px" placeholder="+7 999-999-99-99">
    </label>
  </div>  
    <div class="cart-form__address flex-1 flex items-end gap-4 my-3">
      <span class="cart-form__label contact mb-2">Новый адрес:</span>

    <div class="cart-form__input">
      <label class="input">
        <span>Улица*</span>
      <input :readonly="readonly" type="text" v-model="form.street" name="street">
    </label>
     </div>

    <div class="cart-form__input cart-form__input--small">
      <label class="input">
        <span>Дом*</span>
      <input :readonly="readonly" type="text" v-model="form.house" name="house">
      </label>
      </div>
      <div class="cart-form__input cart-form__input--small">
      <label class="input">
      <span>Квартира</span>
      <input :readonly="readonly" type="text" v-model="form.houseroom" name="apartment">
      </label>
      </div>
      </div>
      </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'
import { IForm } from '@/types/constructor'

@Component({})
export default class Quantity extends Vue {
  @Prop({default: null})
  updateForm: IForm

  @Prop({default: false})
  readonly: boolean

  form: IForm = {
    getting: 'self',
    telephone: '',
    street: '',
    house: '',
    houseroom: ''
  }

  @Watch("form", { deep: true })
  onForm(): void { 
    this.$emit('changeForm', this.form)
  }
  mounted() {
    if(this.readonly) {
      this.form = this.updateForm
      console.log(this.form)
    }
  }
}

</script>

<style lang='scss' scoped>
.items-end {
  align-items: flex-end;
}
.cart-form {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.cart-form__select {
    display: flex;
    align-items: center;
    margin-right: auto;
}
.cart-form__label {
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 19px;
  white-space: nowrap;
}
.cart-form__select span {
  margin-right: 16px;
}
.select {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
  display: block;
  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;
  cursor: pointer;
  transition: 0.3s;
  color: #000000;
  border: 1px
  solid #B3ABBC;
  border-radius: 8px;
  outline: none;
  background-color: #F7F4F4;
  background-image: url('https://static-00.iconduck.com/assets.00/chevron-down-icon-512x295-bevh3bbj.png');
  background-size: 22px;
  background-repeat: no-repeat;
  background-position: right 8px center;
  font-family: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.input input {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 8px 16px;
  transition: 0.3s;
  color: #000000;
  border: 1px
  solid #B3ABBC;
  border-radius: 8px;
  outline: none;
  background-color: #ffffff;
  font-family: inherit;
}
.input span {
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 16px;
  display: block;
  margin-bottom: 4px;
}
.contact {
    font-size: 16px !important;
    font-weight: 700 !important;
    font-style: normal !important;
    line-height: 19px !important;
    margin-right: 16px !important;
    white-space: nowrap !important;
}
</style>