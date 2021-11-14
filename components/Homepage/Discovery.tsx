import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from './TabPanel'
import Newest from './Newest'
import { useState } from 'react'
import { Place } from '../../models/place'

interface Props {
  places_data: Place[]
}

const Discovery = ({ places_data }: Props) => {
  const [value, setValue] = useState('one')

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newValue: string
  ) => {
    setValue(newValue)
  }
  return (
    <>
      <Paper style={{ marginTop: 10 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab value="one" label="Mới nhất" />
          <Tab value="two" label="Gần tôi" />
          <Tab value="three" label="Đã lưu" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index="one">
        <Newest places={places_data} />
      </TabPanel>
      <TabPanel value={value} index="two">
        <Newest places={places_data} />
      </TabPanel>
      <TabPanel value={value} index="three">
        <Newest places={places_data} />
      </TabPanel>
    </>
  )
}

export default Discovery
