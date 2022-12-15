const data = require('../inventory.json')
const { inventory } = data
console.log(inventory)

class Basket {
  constructor(capacity = 10) {
    this.items = []
    this.capacity = capacity
    this.totalPrice = 0
    this.bagelMenu = [
      {
        bagelName: 'onion',
        price: 1.5
      },
      {
        bagelName: 'plain',
        price: 0.99
      },
      {
        bagelName: 'peanut',
        price: 1.5
      },
      {
        bagelName: 'butter',
        price: 1.5
      }
    ]
  }

  add(sku) {
    if (this.items.length >= this.capacity) {
      return false
    }
    const found = this.items.find((bagel) => bagel.sku === sku)
    if (found) {
      found.quantity += 1
      return found
    }

    const bagelToAdd = inventory.find((bagel) => bagel.sku === sku)
    const copiedBagel = { ...bagelToAdd, quantity: 1 }
    this.items.push(copiedBagel)
    return copiedBagel
  }

  // removeItem(sku) {
  //   this.items.forEach((item) => {
  //     if (item.sku === sku) {
  //       this.items.splice(this.items.indexOf(item), 1)
  //     }
  //   })
  //   return this.items
  // }

  removeBagel(sku) {
    this.items = this.items.filter((bagel) => bagel.sku !== sku)
    return this.items
  }

  calculateTotalPrice() {
    this.items.forEach((item) => {
      this.totalPrice += Number((item.price * item.quantity * 100) / 100)
    })
    return this.totalPrice.toFixed(2).toString()
  }

  bagelPrice(bagelName) {
    for (let i = 0; i < this.bagelMenu.length; i++) {
      if (bagelName === this.bagelMenu[i].bagelName) {
        return this.bagelMenu[i].price
      }
    }
    return 'That item does not exist'
  }
}
module.exports = { Basket }
