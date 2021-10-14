import GoogleMaps from '../googlemap/GoogleMaps'
import { Coordinate, Address } from '../../models/place'

interface Props {
  address: Address
  location: Coordinate
}

export default function Maps({ location, address }: Props) {
  return (
    <GoogleMaps
      lat={location.lat}
      lng={location.lng}
      formatted_address={`${address.street}, ${address.city}, ${address.province}`}
    />
  )
}
