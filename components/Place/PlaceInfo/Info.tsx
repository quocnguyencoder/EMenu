import { Place } from '@/models/place'
import { Box, Typography } from '@material-ui/core'
import PlaceRating from './PlaceRating'
import Navs from './Navs'
import PriceRange from './PriceRange'
import OpenTime from './OpenTime'

interface Props {
  place: Place
}

export default function Info({ place }: Props) {
  return (
    <Box maxWidth="60%">
      <Navs
        province={place.address.province}
        placeName={place.name}
        placeID={place.id}
      />

      <Typography>{place.type}</Typography>
      <Typography variant="h4">{place.name}</Typography>
      <Typography variant="body2">
        {`${place.address.street}, P.${place.address.ward},  ${place.address.city}, ${place.address.province}`}
      </Typography>

      <PlaceRating ratings={place.rating} />

      <OpenTime time={place.time} />

      <PriceRange menu={place.menu} />
    </Box>
  )
}
