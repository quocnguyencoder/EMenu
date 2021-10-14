import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import AddBoxIcon from '@material-ui/icons/AddBox'
import { Category, Menu, MenuItem } from '../../../models/place'
import { useState } from 'react'
import FilterByCategory from './FilterByCategory'
import AddItem from './AddItem'

interface Props {
  categories: Category
  menu: Menu
  placeID: string
}

export default function MenuManagement({ categories, menu, placeID }: Props) {
  const [value, setValue] = useState(0)
  const [adminMenu, setAdminMenu] = useState<Menu>(menu)
  const [adminCategories, setAdminCategories] = useState<Category>(categories)
  const updateMenu = (
    index: number,
    item: MenuItem,
    updateCategories: Category
  ) => {
    setAdminMenu({ ...adminMenu, [index]: { ...item } })
    setAdminCategories({ ...updateCategories })
  }

  return (
    <>
      <Box>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e: any, newValue: number) => {
            setValue(newValue)
          }}
        >
          <BottomNavigationAction
            label="Menu"
            icon={
              <RestaurantMenuIcon color={value === 0 ? 'error' : 'secondary'} />
            }
          />
          <BottomNavigationAction
            label="Add Item"
            icon={<AddBoxIcon color={value === 1 ? 'error' : 'secondary'} />}
          />
        </BottomNavigation>
      </Box>
      {value === 0 ? (
        <FilterByCategory
          categories={adminCategories}
          menu={adminMenu}
          placeID={placeID}
          updateMenu={updateMenu}
        />
      ) : (
        <AddItem
          categories={adminCategories}
          placeID={placeID}
          adminMenu={adminMenu}
          addToMenu={updateMenu}
        />
      )}
    </>
  )
}
