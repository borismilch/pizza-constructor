export interface IPizza {
  id: Number,
  name: String,
  description?: String,
  image?: String,
  price?: number,
  value: String,
  default?: Boolean,
  multiplier?: number
}

export interface IIngredient {
  id: number,
  name: string,
  image: string,
  price: number,
  value: string
}

export interface IForm {
  getting: string 
  telephone: string 
  street: string 
  house: string 
  houseroom: string 
}

export interface IQuantityPrice {
  quantity: number,
}

export interface IPizzas {
  [key: string] : IPizza[]
}

export interface IIIngredient2 extends IIngredient {
  rotation: number
}

export interface IIIngredients2 {
  [key: string] : IIIngredient2[] 
}

export interface Prod {
  title: string,
  dought: string,
  sauce: string,
  size: string,
  price: number,
  allIngs: IIIngredient2[] 
  ingredients: IIIngredients2,
  count: number
}
export interface IOrder extends IForm {
  owner: string
  additions: IAdditionStore[]
  pizzas: Prod[],
  price: number,
  createdAt: number
  id?: string,
  raiting: number,
}
export interface IAddition {
  name: string
  price: number
  image: string
  code: string
  id: number
}

export interface IAdditionStore {
  count: number
  price: number
  code: string
}
export interface IAdditionsStore {
  [key: string]: IAdditionStore
}