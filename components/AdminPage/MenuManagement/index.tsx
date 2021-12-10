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
import ViewListIcon from '@material-ui/icons/ViewList'
import { Place } from '@/models/place'
import { useState } from 'react'
import FilterByCategory from './FilterByCategory'
import AddItem from './AddItem'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Setting from './Setting'
import MenuItemList from './MenuItemList'
import CategoryManagement from './CategoryManagement'

interface Props {
  placeInfo: Place
}

export default function MenuManagement({ placeInfo }: Props) {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [filter, setFilter] = useState<string>('All')
  const [settingOpen, setSettingOpen] = useState(false)

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
          <BottomNavigationAction
            label="Quản lý loại"
            icon={<ViewListIcon color={value === 2 ? 'error' : 'secondary'} />}
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
        filter === 'Category' ? (
          <FilterByCategory
            categories={placeInfo.categories}
            menu={placeInfo.menu}
            placeID={placeInfo.id}
          />
        ) : (
          <MenuItemList placeInfo={placeInfo} filter={filter} />
        )
      ) : value === 1 ? (
        <AddItem
          categories={placeInfo.categories}
          menu={placeInfo.menu}
          placeID={placeInfo.id}
        />
      ) : (
        <CategoryManagement
          categories={placeInfo.categories}
          placeID={placeInfo.id}
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
