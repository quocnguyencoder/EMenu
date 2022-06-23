import { Incredient, MenuItemIncredients } from '@/models/incredient'
import incredientsJson from '@/assets/incredients.json'

const totalCalo = (incredients: MenuItemIncredients) => {
  let total = 0
  Object.keys(incredients)
    .map(Number)
    .map((id) => {
      total += (incredients[id].weight * findIncredient(id).calo) / 100
    })
  return total.toFixed(1)
}

const totalCarb = (incredients: MenuItemIncredients) => {
  let total = 0
  Object.keys(incredients)
    .map(Number)
    .map((id) => {
      total += (incredients[id].weight * findIncredient(id).carb) / 100
    })
  return total.toFixed(1)
}

const totalFat = (incredients: MenuItemIncredients) => {
  let total = 0
  Object.keys(incredients)
    .map(Number)
    .map((id) => {
      total += (incredients[id].weight * findIncredient(id).fat) / 100
    })
  return total.toFixed(1)
}

const totalSFat = (incredients: MenuItemIncredients) => {
  let total = 0
  Object.keys(incredients)
    .map(Number)
    .map((id) => {
      total += (incredients[id].weight * findIncredient(id).sFat) / 100
    })
  return total.toFixed(1)
}

const totalProtein = (incredients: MenuItemIncredients) => {
  let total = 0
  Object.keys(incredients)
    .map(Number)
    .map((id) => {
      total += (incredients[id].weight * findIncredient(id).protein) / 100
    })
  return total.toFixed(1)
}

const totalFiber = (incredients: MenuItemIncredients) => {
  let total = 0
  Object.keys(incredients)
    .map(Number)
    .map((id) => {
      total += (incredients[id].weight * findIncredient(id).fiber) / 100
    })
  return total.toFixed(1)
}

const findIncredient = (id: number) => {
  const incredientsInfo = incredientsJson as Incredient[]
  return (
    incredientsInfo.find((incredient) => incredient.id === id) ||
    incredientsInfo[0]
  )
}

export { totalCalo, totalCarb, totalFat, totalSFat, totalProtein, totalFiber }
