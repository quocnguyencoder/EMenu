import { Grid } from '@material-ui/core'
import { useState } from 'react'
import {
  Dashboards,
  HeaderBar,
  Nav,
  Menu,
  ProfileRestaurant,
  Maps,
} from '../components/AdminPage'
import TabPanel from '../components/Homepage/TabPanel'
import Meta from '../components/Meta'

export default function Admin() {
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
          <TabPanel value={value} index="Profile Restaurant">
            <ProfileRestaurant />
          </TabPanel>
          <TabPanel value={value} index="Staff management">
            {value}
          </TabPanel>
          <TabPanel value={value} index="Maps">
            <Maps />
          </TabPanel>
          <TabPanel value={value} index="Menu management">
            <Menu />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  )
}
