import { Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import {
  Dashboards,
  Nav,
  ProfileRestaurant,
  MenuManagement,
  OrderManagement,
} from '../components/AdminPage'
import TabPanel from '@/components/Homepage/TabPanel'
import 'firebase/firestore'
import { Place } from '@/models/place'
import { useRouter } from 'next/router'
import * as getService from '@/firebase/getDocument'
import * as ROUTES from '@/constants/routes'
import isEqual from 'lodash/isEqual'
import firebase from 'firebase/app'
import { NextSeo } from 'next-seo'

export default function Admin() {
  const [value, setValue] = useState({ val: 'Tổng quan', selected: 0 })
  const [place, setPlace] = useState<Place>()
  const router = useRouter()
  useEffect(() => {
    const obj = JSON.parse(sessionStorage.getItem('userID') || '{}')
    if (isEqual(obj, {})) {
      router.push(ROUTES.LOGIN)
    } else {
      getService.default.getUserInfo(obj.userID).then((userData) => {
        if (userData.placeID === '') {
          router.push(ROUTES.HOME)
        } else {
          firebase
            .firestore()
            .collection('place')
            .doc(userData.placeID)
            .onSnapshot((snapshot) => {
              const place_data = snapshot.data() as Place
              place_data.id = userData.placeID
              setPlace(place_data)
            })
        }
      })
    }
  }, [])

  return place !== undefined ? (
    <>
      <NextSeo
        title={`Quản lý - ${place.name}`}
        description={`Trang quản lý địa điểm - ${place.name}`}
      />
      <Grid container>
        <Grid item xs={2}>
          <Nav setValue={setValue} selected={value.selected} />
        </Grid>
        <Grid item xs={10}>
          <TabPanel value={value.val} index="Tổng quan">
            <Dashboards place={place} />
          </TabPanel>
          <TabPanel value={value.val} index="Thông tin địa điểm">
            <ProfileRestaurant place={place} />
          </TabPanel>
          <TabPanel value={value.val} index="Quản lí thực đơn">
            <MenuManagement placeInfo={place} />
          </TabPanel>
          <TabPanel value={value.val} index="Quản lí đơn hàng">
            <OrderManagement place={place} />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  ) : (
    <></>
  )
}
