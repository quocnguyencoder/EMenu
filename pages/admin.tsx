import { Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import {
  Dashboards,
  Nav,
  ProfileRestaurant,
  MenuManagement,
} from '../components/AdminPage'
import TabPanel from '@/components/Homepage/TabPanel'
import Meta from '@/components/Meta'
import 'firebase/firestore'
import { Place, Menu, Category, MenuItem } from '@/models/place'
import { useRouter } from 'next/router'
import * as getService from '@/firebase/getDocument'
import * as ROUTES from '@/constants/routes'
import isEqual from 'lodash/isEqual'

export default function Admin() {
  const [value, setValue] = useState({ val: 'Dashboards', selected: 0 })
  const [place, setPlace] = useState<Place>()
  const [adminMenu, setAdminMenu] = useState<Menu>({})
  const [adminCategories, setAdminCategories] = useState<Category>({})
  const router = useRouter()

  const deleteMenuItem = (newMenu: Menu, category: Category) => {
    setAdminMenu({ ...newMenu })
    setAdminCategories({ ...category })
  }
  const updateMenu = (
    index: number,
    item: MenuItem,
    updateCategories: Category
  ) => {
    setAdminMenu({ ...adminMenu, [index]: { ...item } })
    setAdminCategories({ ...updateCategories })
  }

  useEffect(() => {
    const obj = JSON.parse(sessionStorage.getItem('userID') || '{}')
    if (isEqual(obj, {})) {
      router.push(ROUTES.LOGIN)
    } else {
      getService.default.getUserInfo(obj.userID).then((userData) => {
        if (userData.placeID === '') {
          router.push(ROUTES.HOME)
        } else {
          getService.default.getPlaceInfo(userData.placeID).then((data) => {
            setPlace(data)
            setAdminMenu(data.menu)
            setAdminCategories(data.categories)
          })
        }
      })
    }
  }, [])

  return place !== undefined ? (
    <>
      <Meta title="Admin page" />
      <Grid container>
        <Grid item xs={2}>
          <Nav setValue={setValue} selected={value.selected} />
        </Grid>
        <Grid item xs={10}>
          <TabPanel value={value.val} index="Tổng quan">
            <Dashboards />
          </TabPanel>
          <TabPanel value={value.val} index="Thông tin địa điểm">
            <ProfileRestaurant place={place} />
          </TabPanel>
          <TabPanel value={value.val} index="Quản lí nhân viên">
            {value.val}
          </TabPanel>
          <TabPanel value={value.val} index="Quản lí thực đơn">
            <MenuManagement
              adminCategories={adminCategories}
              adminMenu={adminMenu}
              placeID={place.id}
              deleteMenuItem={deleteMenuItem}
              updateMenu={updateMenu}
            />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  ) : (
    <></>
  )
}
