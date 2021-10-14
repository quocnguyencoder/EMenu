import { Grid } from '@material-ui/core'
import { useState } from 'react'
import {
  Dashboards,
  HeaderBar,
  Nav,
  ProfileRestaurant,
  MenuManagement,
} from '../components/AdminPage'

import TabPanel from '../components/Homepage/TabPanel'
import Meta from '../components/Meta'
import { GetServerSideProps } from 'next'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Place } from '../models/place'

interface Props {
  place: Place
}

export default function Admin({ place }: Props) {
  const [value, setValue] = useState('Dashboards')

  return (
    <>
      <Meta title="Admin page" />
      <Grid container>
        <Grid item xs={2}>
          <Nav setValue={setValue} />
        </Grid>
        <Grid item xs={10}>
          <HeaderBar />
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
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const place = await firebase
    .firestore()
    .collection('place')
    .doc('1sfXtIdNJOzFvD15kMLl')
    .get()
    .then((doc) => {
      const data = doc.data() as Place
      data.id = doc.id
      return data
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.log(error)
    })

  if (!place) {
    return {
      notFound: true,
    }
  }

  // Pass data to the page via props
  return { props: { place } }
}
