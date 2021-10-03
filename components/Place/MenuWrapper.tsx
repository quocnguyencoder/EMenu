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
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [filteredMenu, setFilteredMenu] = useState<number[]>(() =>
    Array.from(Array(place.menu.length).keys())
  )
  const [filteredCategories, setFilteredCategories] = useState(place.category)
  const [ordersList, setOrdersList] = useState<Order>({})

  const isEmptySearch = searchTerm === ''

  const resetStates = () => {
    setFilteredMenu(Array.from(Array(place.menu.length).keys()))
    setFilteredCategories(place.category)
  }

  // strip accent and convert text lowercase
  //Cơm Tấm -> com tam
  const normalizeText = (text: string) =>
    nonAccentVietnamese(text).toLowerCase()

  const search = (text: string) => {
    // filter index of menu item which has name match search text
    // => [] if nothing matches ,else [1,2,3,..]
    const resultMenu = place.menu.reduce<number[]>((result, item, index) => {
      if (normalizeText(item.name).includes(normalizeText(text))) {
        result.push(index)
        return result
      }
      return result
    }, [])

    // get all categories index in filtered menu
    // => [] if filteredMenu is empty,else [1,2,3,...]
    const categoriesList: number[] = []
    if (resultMenu.length > 0) {
      for (let i = 0; i < resultMenu.length; i++) {
        const menuItem = place.menu[resultMenu[i]]
        for (let j = 0; j < menuItem.category.length; j++) {
          const category = menuItem.category[j]
          if (!categoriesList.includes(category)) {
            categoriesList.push(category)
          }
        }
      }
    }

    // convert category index to category name
    // => [categoryName1,categoryName2, categoryName3 ]
    const categories: string[] = place.category.filter((c, index) =>
      categoriesList.includes(index)
    )

    setFilteredMenu(resultMenu)
    setFilteredCategories(categories)
  }

  // add item into ordersList if it's not already in
  // else +1 to item quantity
  const addToOrders = (id: string) => {
    const isAlreadyInOrders = Object.prototype.hasOwnProperty.call(
      ordersList,
      id
    )

    isAlreadyInOrders
      ? setOrdersList({
          ...ordersList,
          [id]: {
            ...ordersList[id],
            quantity: (ordersList[id].quantity += 1),
          },
        })
      : setOrdersList({
          ...ordersList,
          [id]: {
            name: place.menu[+id].name,
            price: place.menu[+id].price,
            quantity: 1,
          },
        })
  }

  // remove item from ordersList if it'quantity is decreased to 0
  // else -1 from item quantity
  const removeFromOrders = (id: string) => {
    const isRemove = ordersList[id].quantity === 1

    const removeOrder = (obj: Order, prop: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [prop]: omit, ...res } = obj
      return res
    }

    isRemove
      ? setOrdersList(removeOrder(ordersList, id))
      : setOrdersList({
          ...ordersList,
          [id]: {
            name: place.menu[+id].name,
            price: place.menu[+id].price,
            quantity: (ordersList[id].quantity -= 1),
          },
        })
  }

  const clearOrders = () => {
    setOrdersList({})
  }

  useEffect(() => {
    isEmptySearch ? resetStates() : search(searchTerm.trim())
  }, [searchTerm])

  return (
    <>
      <CategoriesNav
        categories={place.category}
        filteredCategories={filteredCategories}
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />
      <Paper style={{ flex: 1, maxWidth: '75%', backgroundColor: '#fff' }}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <MainMenu
          categories={place.category}
          filteredCategories={filteredCategories}
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
