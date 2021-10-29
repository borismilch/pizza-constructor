<template>
   <div class="content">
      <Loader v-if="loading" />
     <div class="constructor__container" v-else> 
       <h3 class="constructor__title mb-4">Конструктор пиццы </h3>
        <div style="flex: 0 0 59%; margin-right: 20px">
          <Sheet :param="dough" @echangeForm="dough = $event" :title="'Вибрати тісто'" :items="getWhatNeed('dough')" />
        </div>

        <div style="flex: 1 1 0">
          <Sheet :param="size" @echangeForm ="size = $event" :title="'Вибрати розмір'" :items="getWhatNeed('sizes')" />
        </div>
        <div style="flex: 0 0 59%; padding-top: 15px" class="constructor-ings">
          <Ingredients :title="'Вибрати інградієнти'" :items="getWhatNeed('sizes')" >
            <template>
            <div class="flex flex-col ss">
            <div class="sauce">
              <p>Основний соуc:</p>
              <v-radio-group
                style="margin: 0px !important"
                v-model="sauce"
                row
              >
                <v-radio
                  color="green"
                  label="Породічки"
                  value="tomato"
                ></v-radio>

                <v-radio
                  color="green"
                  label="Сливки"
                  value="creamy"
                ></v-radio>

              </v-radio-group>
              
            </div>
             <small>Начинка:</small>
            </div>
              </template>
            <template v-slot:content>
              <Ing @changeValue ="addIng($event)" :startCount="updatedCounts[idx] || 0" v-for="(ing, idx) in getWhatNeed('ingredients')" :key="ing.id" :ing="ing" />
            </template>
          </Ingredients>
        </div>
        <div style="flex: 1 1 0%; padding-top: 15px">
         <input type="text" v-model="title" class="pizza-input" style="z-index:20" placeholder="Введіть назву вашої піцци">
          <div class="pizza">
            <v-img width="315" height="315" style="margin: 25px auto 0px auto" :src="nowPizzaIs">

            </v-img>

            <div class="inger" v-for="(ing, idx) in allIngs" :key="idx" :style="{ background: `url(${bigFillings[ing.value]})`, transform: `rotate(${ing.rotation}deg)`, 'z-index': idx }">

            </div>
          </div>
          <div class="res">
            <p>Итого: {{fullPrice}} ₽</p>
            <button @click="addToCart" :disabled="!isBlank">{{"update" in $route.query ? "Змінити" : "Готуйте"}}!</button>
          </div>
        </div>
     </div>

   </div>
  
</template>

<script lang="ts">
import Loader from '@/components/Loader.vue'
import { mapGetters } from 'vuex'
import Quantity from '../store/modules/quantity'
import { getModule } from 'vuex-module-decorators'
import bigFillings from '../utils/filling-big'
import foundations from '../utils/variants'
import Ing from '../components/constructor/ing.vue'
import Ingredients from '../components/constructor/ingredients.vue'
import Sheet from '../components/constructor/sheet.vue'
import noUser from '../middleware/auth_middleware'
import { IPizza, IPizzas, IIIngredients2, IIIngredient2, Prod } from '../types/constructor'
import pizza from '../utils/pizza.js'
import { Component, Vue } from 'nuxt-property-decorator'
import { IFoundations } from '~/types/types'

@Component({
  middleware: [noUser],
  components: { Sheet, Ingredients, Ing, Loader },
  computed: {
    ...mapGetters({
      items: 'Quantity/items'
    })
  },
})
export default class Constructor extends Vue {
  items: Prod[]
  loading: Boolean = true
  updatedCounts: number[] = []
  pizza: IPizzas = pizza
  dough: string = 'light'
  sauce: string = 'tomato'
  size: string = 'normal'
  title: string = ''
  bigFillings: IFoundations = bigFillings
  foundations: IFoundations = foundations
  ingredients: IIIngredients2 = {}
  allIngs: IIIngredient2[] = []
  getWhatNeed (key: string): IPizza[] {
    return this.pizza[key]
  }

  addIng (e: any) {
    this.ingredients[e[0]] = e[1]
    this.allIngs = Object.values(this.ingredients).flat()
  }
  get nowPizzaIs (): string  {
    return  this.foundations[`${this.sauce}-${this.dough}`]
  }
  get isBlank (): boolean {
    return !!(this.title && this.allIngs.length)
  }
  get fullPrice (): number {
    const priceD: IPizza | undefined = this.getWhatNeed('dough').find(d => d.value === this.dough)!
    const saus: IPizza | undefined = this.getWhatNeed('sauces').find(s => s.value === this.sauce)!
    return (
      priceD.price! + saus.price! 
      + this.allIngs.reduce((acc, i: IIIngredient2): number => acc + i.price, 0)
    ) * 
    (this.getWhatNeed('sizes').find(s => s.value === this.size)?.multiplier || 1)
    
  }
  mounted() {
    this.ingredients = {}
    if ("update" in this.$route.query && typeof +this.$route.query.update === "number") {
      const prod = this.items[+this.$route.query.update]
      this.dough = prod.dought
      this.sauce = prod.sauce
      this.size = prod.size
      this.title = prod.title
      this.ingredients = prod.ingredients
      this.allIngs = prod.allIngs
      this.updatedCounts = this.getWhatNeed('ingredients')
      .map(val => prod.allIngs.filter(a => a.value === val.value).length)
      console.log(this.updatedCounts)
    }
    this.loading = false
  }
  head() {
    return { title: 'Constructor | VuePizza' }
  }

  async addToCart (): Promise<void> {
    const pizza = {
      id: Math.random(),
      title: this.title,
      dought: this.dough,
      sauce: this.sauce,
      size: this.size,
      ingredients: this.ingredients,
      price: this.fullPrice,
      allIngs: this.allIngs,
      count: 1
    }

    "update" in this.$route.query ? this.cartUpdate(pizza, +this.$route.query.update) : this.cartAdd(pizza)
    this.clear()
  }
  cartAdd (pizza: any) {
    getModule(Quantity, this.$store).changeQuantity()
    this.$nuxt.$emit('message', 'added_to_cart')
    getModule(Quantity, this.$store).addProduct(pizza)
  }
  cartUpdate (pizza: any, idx: number) {
    getModule(Quantity, this.$store).changeQuantity()
    getModule(Quantity, this.$store).changeProduct([pizza, idx])
    this.$nuxt.$emit('message', 'chenged_in_cart')
    this.$router.push('/quantity')
  }
  clear (): void {
    this.sauce = 'tomato'
    this.dough = 'light'
    this.ingredients = {}
    this.allIngs = []
    this.title = ''
    this.size = 'normal'
  }

}
</script>


<style lang="scss" scoped>
  .res {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    & button {
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
    & p {
      font-size: 24px;
      font-weight: 700;
      font-style: normal;
      line-height: 28px;
      margin: 0;
    }
  }
  .constructor__container {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 963px;
    margin: 0 auto;
    padding-right: 2.12%;
    padding-bottom: 30px;
    padding-left: 2.12%;
  }
  .content {
    padding: 6px 0px 0px 0px;
  }
  .constructor__title {
    font-size: 36px;
    font-weight: 700;
    font-style: normal;
    line-height: 42px;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    color: #000000;
  }
  .constructor-ings {
    margin-top: 15px;
    margin-right: auto;
    margin-bottom: 15px;
  }
  .sauce {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    & p {
      margin-top: 5px;
      font-size: 16px;
      font-weight: 400;
      font-style: normal;
      line-height: 19px;
      margin-right: 16px;

    }
  }
  .ss {
    & small {
      margin: 0px 0px 16px 0px;
      font-size: 16px;
      font-weight: 400;
      font-style: normal;
      line-height: 19px;
    }
  }
  .gri {
    grid-gap: 8px;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  } 
  .pizza-input {
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
    border: 1px solid #B3ABBC;
    border-radius: 8px;
    outline: none;
    background-color: #ffffff;
    font-family: inherit;
    &:focus {
      border-color: #41B619;
    }
  }
  .pizza {
    position: relative;
    display: block;
    box-sizing: border-box;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
  .inger {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: 85% !important;
  }
</style>