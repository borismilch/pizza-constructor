import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Prod, IAdditionsStore, IAdditionStore, IOrder } from '@/types/constructor'
import firebase from '~/plugins/firebase'
import 'firebase/firestore';

@Module({
  name: 'Quantity',
  stateFactory: true,
  namespaced: true,
})

class Quantity extends VuexModule {
  quantityItems: Prod[] = [] 
  controller: boolean = false
  additions: IAdditionsStore = {}
  reactiveHui: number = 0
  allOrders: IOrder[] = []

  @Mutation 
  setItems ( quantityItems: Prod[]) {
    this.quantityItems = quantityItems
  }

  @Mutation
  addItem (quantityItem: Prod) {
    this.quantityItems.push(quantityItem)
  }

  @Mutation
  changeQuantity () {
    this.controller = !this.controller
  }

  @Mutation
  addProduct (prod: Prod) {
    this.quantityItems.push(prod)
  }

  @Mutation
  changeProduct ([prod, idx]: [Prod, number]) {
    this.quantityItems[idx] = prod
  }

  @Mutation
  changeAdditionCount ([count, code, price]: [number, string, number]): void {
    this.additions[code] = { code, price, count }
    this.reactiveHui = Object.values(this.additions).reduce((acc, i) => acc + (i.price * i.count), 0)
  }

  @Mutation
  setAdditions (adds: IAdditionsStore) {
    this.additions = adds
  }

  @Mutation
  changeCount ([count, idx]: number[]) {
    this.quantityItems[idx].count = count
  }

  @Mutation
  clearOrder (n: number) {
    console.log(n)
    this.quantityItems = []
    this.additions = {}
  }
  @Mutation
  setOrders (orders: IOrder[]) {
    this.allOrders = orders
  }

  @Action({rawError: true, commit: 'clearOrder'})
  async addOrder (order:IOrder) {
    console.log('order')
    const db = firebase.firestore()
    await db.collection(`orders`).add(order)
    return 1
  }

  @Action({rawError: true, commit: 'setOrders'})
  async fetchOrders () {
    const db = firebase.firestore()
    let orders: any[] = []

    await db.collection(`orders`)
    .get().then(snap => snap.docs.forEach(doc => orders.push({...doc.data(), id: doc.id }) ))
    return orders
  }

  get filteredOrders(): IOrder[] {
    const uid = firebase.auth().currentUser?.uid
    return this.allOrders.filter(o => o.owner === uid)
  }

  get price(): number {
    return this.quantityItems.reduce((acc, i) => acc + (i.price * i.count), 0) + this.reactiveHui
  }

  get orders(): IOrder[] {
    return this.allOrders
  }

  get additionsObj (): IAdditionsStore  {
    return this.additions
  }

  get items(): Object[] {
    return this.quantityItems
  }

  get controll (): boolean {
    return this.controller
  }
}

export default Quantity
