const { Basket } = require('../src/basket.js')

describe('Basket', () => {
  let basket
  beforeEach(() => {
    basket = new Basket()
  })

  it("adds a bagel if Bagel doesn't already exist in the basket", () => {
    const bagel = basket.add('BGLO')
    expect(bagel).toEqual({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 1
    })
  })

  it('should return false if basket is at capacity', () => {
    const myBasket = new Basket(2)
    myBasket.add('BGLO')
    myBasket.add('BGLP')
    const result = myBasket.add('BGLE')
    expect(result).toBeFalse()
  })

  it('should update the quantity on found bagels', () => {
    basket.add('BGLO')
    const bagel = basket.add('BGLO')
    expect(bagel).toEqual({
      sku: 'BGLO',
      price: '0.49',
      name: 'Bagel',
      variant: 'Onion',
      quantity: 2
    })

    expect(basket.items).toEqual([
      {
        sku: 'BGLO',
        price: '0.49',
        name: 'Bagel',
        variant: 'Onion',
        quantity: 2
      }
    ])
  })

  it('The price of the bagel is returned', () => {
    // setup
    const basket = new Basket()
    const expectedPrice = 1.5
    // execute
    const price = basket.bagelPrice('onion')
    // verify
    expect(price).toEqual(expectedPrice)
  })
})

// describe('removeitem', () => {
//   let basket
//   beforeEach(() => {
//     basket = new Basket(10)
//   })
//   it('should remove only the selected item', () => {
//     const result = basket.removeItem('BGLP')
//     expect(basket).toBeInstanceOf(Basket)
//     expect(result).not.toEqual([
//       {
//         sku: 'BGLP',
//         price: '0.39',
//         name: 'Bagel',
//         variant: 'Plain',
//         quantity: 1
//       }
//     ])
//   })
// })

it('remove a bagel from the basket', () => {
  // set up
  const basket = new Basket()
  const expected = []
  // execute
  const result = basket.removeBagel('BGLP')
  // verify
  expect(result).toEqual(expected)
})

// it(" can not remove that does not exist in the")

describe('Basket Total Price', () => {
  let basket
  beforeEach(() => {
    basket = new Basket(5)
  })
  it('should return the correct ammount as a string', () => {
    basket.add('BGLP')
    basket.add('BGLP')
    basket.add('BGSE')
    const result = basket.calculateTotalPrice()

    expect(basket).toBeInstanceOf(Basket)
    expect(result).toBe('3.77')
  })

  it('should not return the ammount as a number', () => {
    basket.add('BGLP')
    basket.add('BGLP')
    basket.add('BGSE')
    const result = basket.calculateTotalPrice()

    expect(basket).toBeInstanceOf(Basket)
    expect(result).not.toBe(3.77)
  })

  it('should return the ammount with only 2 decimals', () => {
    basket.add('BGLP')
    basket.add('BGLP')
    basket.add('BGSE')
    const result = basket.calculateTotalPrice()

    expect(basket).toBeInstanceOf(Basket)
    expect(result).not.toBe('3.770')
  })
})
