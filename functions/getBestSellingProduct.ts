import { Bill } from '@/models/place'

interface BestSelling {
  key: number
  name: string
  price: number
  quantity: number
  discount: number
  image: string
  total: number
}

const getBestSellingProduct = (orderList: Bill[]) => {
  if (orderList.length > 0) {
    const items = orderList
      .map((order) => order.items.map((item) => item))
      .flat()

    const keys = items.map((item) => Object.keys(item).map(Number)[0])
    const uniqueKeys = Array.from(new Set(keys))

    const bestSellingList = uniqueKeys
      .reduce((preObject, curr) => {
        const itemsWithSameKey = items.filter(
          (item) => Object.keys(item).map(Number)[0] === curr
        )
        const quantity = itemsWithSameKey.reduce(
          (pre, item) => pre + item[curr].quantity,
          0
        )
        const total =
          (itemsWithSameKey[0][curr].price -
            itemsWithSameKey[0][curr].discount) *
          quantity

        return [
          ...preObject,
          {
            key: curr,
            name: itemsWithSameKey[0][curr].name,
            price: itemsWithSameKey[0][curr].price,
            quantity: quantity,
            image: itemsWithSameKey[0][curr].image,
            discount: itemsWithSameKey[0][curr].discount,
            total: total,
          },
        ]
      }, [] as BestSelling[])
      .sort(
        (curr, next) => next.quantity - curr.quantity || next.total - curr.total
      )
    return bestSellingList
  }
  return []
}

export default getBestSellingProduct
