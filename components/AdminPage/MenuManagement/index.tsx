import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Tooltip,
  Fab,
} from '@material-ui/core'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import AddBoxIcon from '@material-ui/icons/AddBox'
import SettingsIcon from '@material-ui/icons/Settings'
import { Category, Menu, MenuItem } from '@/models/place'
import { useMemo, useState } from 'react'
import FilterByCategory from './FilterByCategory'
import AddItem from './AddItem'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Setting from './Setting'
import MenuItemList from './MenuItemList'

interface Props {
  adminCategories: Category
  adminMenu: Menu
  placeID: string
  updateMenu: (
    index: number,
    item: MenuItem,
    updateCategories: Category
  ) => void
  deleteMenuItem: (newMenu: Menu, categories: Category) => void
}

export default function MenuManagement({
  adminCategories,
  adminMenu,
  placeID,
  updateMenu,
  deleteMenuItem,
}: Props) {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [filter, setFilter] = useState<string>('All')
  const [settingOpen, setSettingOpen] = useState(false)

  const nameAscentList = useMemo(() => sortNameAscent(adminMenu), [adminMenu])
  const nameDescentList = useMemo(() => sortNameDescent(adminMenu), [adminMenu])
  const priceAscentList = useMemo(() => sortPriceAscent(adminMenu), [adminMenu])
  const priceDescentList = useMemo(
    () => sortPriceDescent(adminMenu),
    [adminMenu]
  )

  return (
    <>
      <Box>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e: any, newValue: number) => {
            setValue(newValue)
          }}
          style={{ backgroundColor: '#FAFAFA' }}
        >
          <BottomNavigationAction
            label="Thực đơn"
            icon={
              <RestaurantMenuIcon color={value === 0 ? 'error' : 'secondary'} />
            }
          />
          <BottomNavigationAction
            label="Thêm món ăn"
            icon={<AddBoxIcon color={value === 1 ? 'error' : 'secondary'} />}
          />
        </BottomNavigation>
      </Box>
      <Setting
        state={settingOpen}
        filter={filter}
        setState={setSettingOpen}
        setFilter={setFilter}
      />
      {value === 0 && (
        <Tooltip title="Setting">
          <Fab
            onClick={() => setSettingOpen(true)}
            color="secondary"
            className={classes.absolute}
          >
            <SettingsIcon />
          </Fab>
        </Tooltip>
      )}
      {value === 0 ? (
        filter === 'All' ? (
          <MenuItemList
            placeID={placeID}
            categories={adminCategories}
            menu={adminMenu}
            itemIDList={Object.keys(adminMenu).map(Number)}
            updateMenu={updateMenu}
            deleteMenuItem={deleteMenuItem}
          />
        ) : filter === 'Tên Tăng dần' ? (
          <MenuItemList
            placeID={placeID}
            categories={adminCategories}
            menu={adminMenu}
            itemIDList={nameAscentList}
            updateMenu={updateMenu}
            deleteMenuItem={deleteMenuItem}
          />
        ) : filter === 'Tên Giảm dần' ? (
          <MenuItemList
            placeID={placeID}
            categories={adminCategories}
            menu={adminMenu}
            itemIDList={nameDescentList}
            updateMenu={updateMenu}
            deleteMenuItem={deleteMenuItem}
          />
        ) : filter === 'Giá Tăng dần' ? (
          <MenuItemList
            placeID={placeID}
            categories={adminCategories}
            menu={adminMenu}
            itemIDList={priceAscentList}
            updateMenu={updateMenu}
            deleteMenuItem={deleteMenuItem}
          />
        ) : filter === 'Giá Giảm dần' ? (
          <MenuItemList
            placeID={placeID}
            categories={adminCategories}
            menu={adminMenu}
            itemIDList={priceDescentList}
            updateMenu={updateMenu}
            deleteMenuItem={deleteMenuItem}
          />
        ) : (
          <FilterByCategory
            categories={adminCategories}
            menu={adminMenu}
            placeID={placeID}
            updateMenu={updateMenu}
          />
        )
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    absolute: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  })
)

const sortNameAscent = (menu: Menu) => {
  const itemIDList = Object.keys(menu).map(Number)
  itemIDList.sort((a, b) => (menu[a].name > menu[b].name ? 1 : -1))
  return itemIDList
}

const sortNameDescent = (menu: Menu) => {
  const itemIDList = Object.keys(menu).map(Number)
  itemIDList.sort((a, b) => (menu[a].name > menu[b].name ? -1 : 1))
  return itemIDList
}

const sortPriceAscent = (menu: Menu) => {
  const itemIDList = Object.keys(menu).map(Number)
  itemIDList.sort((a, b) => menu[a].price - menu[b].price)
  return itemIDList
}

const sortPriceDescent = (menu: Menu) => {
  const itemIDList = Object.keys(menu).map(Number)
  itemIDList.sort((a, b) => menu[b].price - menu[a].price)
  return itemIDList
}
