import { Menu } from '@/models/place'

const toAvgPrice = (menu: Menu) => {
  const ids = Object.keys(menu).map(Number)
  const totalPrice = ids.reduce((acc, itemID) => acc + menu[itemID].price, 0)
  return `${Math.round(totalPrice / ids.length / 1000)}`.length
}

const toAvgPriceNum = (menu: Menu) => {
  const ids = Object.keys(menu).map(Number)
  const totalPrice = ids.reduce((acc, itemID) => acc + menu[itemID].price, 0)
  return totalPrice / ids.length
}

export { toAvgPrice, toAvgPriceNum }
