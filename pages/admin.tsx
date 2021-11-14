import { Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import {
  Dashboards,
  Nav,
  ProfileRestaurant,
  MenuManagement,
} from '../components/AdminPage'
import TabPanel from '../components/Homepage/TabPanel'
import Meta from '../components/Meta'
import 'firebase/firestore'
import { Place } from '../models/place'
import { useRouter } from 'next/router'
import * as getService from '@/firebase/getDocument'
import * as ROUTES from '@/constants/routes'
import isEqual from 'lodash/isEqual'

export default function Admin() {
  const [value, setValue] = useState('Dashboards')
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
          getService.default
            .getPlaceInfo(userData.placeID)
            .then((data) => setPlace(data))
        }
      })
    }
  }, [])

  return place !== undefined ? (
    <>
      <Meta title="Admin page" />
      <Grid container>
        <Grid item xs={2}>
          <Nav setValue={setValue} />
        </Grid>
        <Grid item xs={10}>
          <TabPanel value={value} index="Dashboards">
            <Dashboards />
          </TabPanel>
          <TabPanel value={value} index="Profile">
            <ProfileRestaurant place={place} />
          </TabPanel>
          <TabPanel value={value} index="Staff management">
            {value}
          </TabPanel>
          <TabPanel value={value} index="Menu management">
            <MenuManagement
              categories={place.categories}
              menu={place.menu}
              placeID={place.id}
            />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  ) : (
    <></>
  )
}
