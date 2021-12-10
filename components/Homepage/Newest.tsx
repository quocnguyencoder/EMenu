import { Grid } from '@material-ui/core'
import PlaceCard from './PlaceCard'
import { Place } from '@/models/place'

interface Props {
  places: Place[]
}

const Newest = ({ places }: Props) => {
  return (
    <Grid container spacing={2}>
      {places.map((info) => (
        <Grid key={info.name} item md={3}>
          <PlaceCard info={info} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Newest
