import { Grid } from '@material-ui/core'
import NewestItem from './NewestItem'
import { Place } from '../../models/place'

interface Props {
  places: Place[]
}

const Newest = ({ places }: Props) => {
  return (
    <Grid container spacing={2}>
      {places.map((info) => (
        <Grid key={info.name} item md={3}>
          <NewestItem info={info} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Newest
