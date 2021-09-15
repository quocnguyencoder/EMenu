import { Grid } from '@material-ui/core'
import NewestItem from './NewestItem'
import { Place } from '../../models/place'
import { useEffect, useState } from 'react'

interface Props {
  places_data: Place[]
}

const Newest = ({ places_data }: Props) => {
  const [places, setPlaces] = useState<Place[]>([])

  useEffect(() => {
    setPlaces(places_data)
  }, [places_data])

  const status = places === undefined ? 'isLoading' : 'ok'

  return (
    <Grid container spacing={2}>
      {status === 'ok' &&
        places.map((info) => (
          <Grid key={info.name} item md={3}>
            <NewestItem info={info} />
          </Grid>
        ))}
    </Grid>
  )
}

export default Newest
