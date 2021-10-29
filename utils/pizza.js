import lightDougth from '../assets/img/dough-light.svg'
import potato from '../assets/img/potato.svg'
import fatDought from '../assets/img/dough-large.svg'
import diameter from '../assets/img/diameter.svg'

//ings
import ananas from '../assets/img/filling/ananas.svg'
import mush from '../assets/img/filling/mushrooms.svg'
import cheddar from '../assets/img/filling/cheddar.svg'
import bacon from '../assets/img/filling/bacon.svg'
import blueCheese from '../assets/img/filling/blue_cheese.svg'
import chile from '../assets/img/filling/chile.svg'
import ham from '../assets/img/filling/ham.svg'
import jalapeno from '../assets/img/filling/jalapeno.svg'
import mozzarella from '../assets/img/filling/mozzarella.svg'
import olives from '../assets/img/filling/olives.svg'
import onion from '../assets/img/filling/onion.svg'
import parmesan from '../assets/img/filling/parmesan.svg'
import salami from '../assets/img/filling/salami.svg'
import salmon from '../assets/img/filling/salmon.svg'
import tomatoes from '../assets/img/filling/tomatoes.svg'

import product from '../assets/img/product.svg'
import arrow from '@/assets/img/button-arrow.svg'

export const arrowLeft = arrow
export const Product =  product
export const Popups = [tomatoes, ananas]
export default {
  "dough": [
    {
      "id": 1,
      "name": "Тонкое",
      "image": lightDougth,
      "description": "Из твердых сортов пшеницы",
      "price": 300,
      "value": "light",
      "default": true
    },
    {
      "id": 2,
      "name": "Толстое",
      "image": fatDought,
      "description": "Из твердых сортов пшеницы",
      "price": 400,
      "value": "large"
    }
  ],
  "ingredients": [
    {
      "id": 1,
      "name": "Грибы",
      "image": mush,
      "price": 33,
      "value": "mushrooms"
    },
    {
      "id": 2,
      "name": "Чеддер",
      "image": cheddar,
      "price": 42,
      "value": "cheddar"
    },
    {
      "id": 3,
      "name": "Салями",
      "image": salami,
      "price": 42,
      "value": "salami"
    },
    {
      "id": 4,
      "name": "Ветчина",
      "image": ham,
      "price": 42,
      "value": "ham"
    },
    {
      "id": 5,
      "name": "Ананас",
      "image": ananas ,
      "price": 25,
      "value": "ananas"
    },
    {
      "id": 6,
      "name": "Бекон",
      "image": bacon ,
      "price": 42,
      "value": "bacon"
    },
    {
      "id": 7,
      "name": "Лук",
      "image": onion,
      "price": 21,
      "value": "onion"
    },
    {
      "id": 8,
      "name": "Чили",
      "image": chile,
      "price": 21,
      "value": "chile"
    },
    {
      "id": 9,
      "name": "Халапеньо",
      "image": jalapeno,
      "price": 25,
      "value": "jalapeno"
    },
    {
      "id": 10,
      "name": "Маслины",
      "image": olives,
      "price": 25,
      "value": "olives"
    },
    {
      "id": 11,
      "name": "Томаты",
      "image": tomatoes,
      "price": 35,
      "value": "tomatoes"
    },
    {
      "id": 12,
      "name": "Лосось",
      "image": salmon,
      "price": 50,
      "value": "salmon"
    },
    {
      "id": 13,
      "name": "Моцарелла",
      "image": mozzarella,
      "price": 35,
      "value": "mozzarella"
    },
    {
      "id": 14,
      "name": "Пармезан",
      "image": parmesan,
      "price": 35,
      "value": "parmesan"
    },
    {
      "id": 15,
      "name": "Блю чиз",
      "image": blueCheese,
      "price": 50,
      "value": "blue_cheese"
    }
  ],
  "sauces": [
    {
      "id": 1,
      "name": "Томатный",
      "price": 50,
      "value": "tomato",
      "default": true
    },
    {
      "id": 2,
      "name": "Сливочный",
      "price": 60,
      "value": "creamy",
      "default": false
    }
  ],
  
  sizes: [
    {
      "id": 1,
      "name": "23 см",
      "image": diameter,
      "multiplier": 1,
      "value": "small",
      "default": false
    },
    {
      "id": 2,
      "name": "32 см",
      "image": diameter,
      "multiplier": 2,
      "value": "normal",
      "default": true
    },
    {
      "id": 3,
      "name": "45 см",
      "image": diameter,
      "multiplier": 3,
      "value": "big",
      "default": false,
    }
  ]
}
