import { useEffect, useState } from 'react'
import { Place, Order } from '../../models/place'
import CategoriesNav from './CategoriesNav'
import SearchBar from './SearchBar'
import MainMenu from './MainMenu'
import OrdersForm from './OrdersForm'
import { Paper } from '@material-ui/core'
import nonAccentVietnamese from '../../functions/nonAccentVietnamese'

interface Props {
  place: Place
}

const MenuWrapper = ({ place }: Props) => {
  const menuItemIDArr = Object.keys(place.menu).map(Number)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [filteredMenu, setFilteredMenu] = useState<number[]>(menuItemIDArr)
  const [ordersList, setOrdersList] = useState<Order>({})

  const isEmptySearch = searchTerm === ''

  const resetStates = () => {
    setFilteredMenu(menuItemIDArr)
  }

  // strip accent and convert text lowercase
  //Cơm Tấm -> com tam
  const normalizeText = (text: string) =>
    nonAccentVietnamese(text).toLowerCase()

  const search = (text: string) => {
    // filter id of menu item which has name matches search text
    // => [] if nothing matches ,else [1,2,3,..]
    const resultMenu = menuItemIDArr.reduce<number[]>((result, itemID) => {
      if (
        normalizeText(place.menu[itemID].name).includes(normalizeText(text))
      ) {
        result.push(itemID)
        return result
      }
      return result
    }, [])

    setFilteredMenu(resultMenu)
  }

  useEffect(() => {
    isEmptySearch ? resetStates() : search(searchTerm.trim())
  }, [searchTerm])

  // add item into ordersList if it's not already in
  // else +1 to item quantity
  const addToOrders = (itemID: number) => {
    const isAlreadyInOrders = Object.prototype.hasOwnProperty.call(
      ordersList,
      itemID
    )

    isAlreadyInOrders
      ? setOrdersList({
          ...ordersList,
          [itemID]: {
            ...ordersList[itemID],
            quantity: (ordersList[itemID].quantity += 1),
          },
        })
      : setOrdersList({
          ...ordersList,
          [itemID]: {
            name: place.menu[itemID].name,
            price: place.menu[itemID].price,
            quantity: 1,
          },
        })
  }

  // remove item from ordersList if it'quantity is decreased to 0
  // else -1 from item quantity
  const removeFromOrders = (itemID: number) => {
    const isRemove = ordersList[itemID].quantity === 1

    const removeOrder = (obj: Order, prop: number) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [prop]: omit, ...res } = obj
      return res
    }

    isRemove
      ? setOrdersList(removeOrder(ordersList, itemID))
      : setOrdersList({
          ...ordersList,
          [itemID]: {
            name: place.menu[itemID].name,
            price: place.menu[itemID].price,
            quantity: (ordersList[itemID].quantity -= 1),
          },
        })
  }

  const clearOrders = () => {
    setOrdersList({})
  }

  return (
    <>
      <CategoriesNav
        categories={place.categories}
        filteredMenu={filteredMenu}
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />
      <Paper style={{ flex: 1, backgroundColor: '#fff' }}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <MainMenu
          categories={place.categories}
          menu={place.menu}
          filteredMenu={filteredMenu}
          setSelected={setSelectedCategory}
          addToOrders={addToOrders}
        />
      </Paper>
      <OrdersForm
        addToOrders={addToOrders}
        removeFromOrders={removeFromOrders}
        clearOrders={clearOrders}
        ordersList={ordersList}
      />
    </>
  )
}

export default MenuWrapper
