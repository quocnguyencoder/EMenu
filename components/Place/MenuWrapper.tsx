import { useEffect, useState } from 'react'
import { Menu, Place } from '../../models/place'
import CategoriesNav from './CategoriesNav'
import SearchBar from './SearchBar'
import MainMenu from './MainMenu'
import { Box } from '@material-ui/core'
import nonAccentVietnamese from '../../functions/nonAccentVietnamese'

interface Props {
  place: Place
}

const MenuWrapper = ({ place }: Props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [filteredMenu, setFilteredMenu] = useState<Menu[]>(place.menu)
  const [filteredCategories, setFilteredCategories] = useState(place.category)

  const isEmptySearch = searchTerm === ''

  const resetStates = () => {
    setFilteredMenu(place.menu)
    setFilteredCategories(place.category)
  }
  //Cơm Tấm -> com tam
  const normalizeText = (text: string) =>
    nonAccentVietnamese(text).toLowerCase()

  const search = (text: string) => {
    const menu = place.menu.filter((m) =>
      normalizeText(m.name).includes(normalizeText(text))
    )

    let categories: string[] = []
    for (let i = 0; i < menu.length; i++) {
      for (let j = 0; j < menu[i].category.length; j++) {
        const category = place.category[menu[i].category[j]]
        if (!categories.includes(category)) {
          categories.push(category)
        }
      }
    }

    categories = place.category.filter((c) => categories.includes(c))

    setFilteredMenu(menu)
    setFilteredCategories(categories)
  }

  useEffect(() => {
    isEmptySearch ? resetStates() : search(searchTerm)
  }, [searchTerm])

  return (
    <>
      <CategoriesNav
        categories={filteredCategories}
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />
      <Box flex="1" maxWidth="75%" bgcolor="#fff">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <MainMenu
          categories={place.category}
          filteredCategories={filteredCategories}
          menu={filteredMenu}
        />
      </Box>
    </>
  )
}

export default MenuWrapper
