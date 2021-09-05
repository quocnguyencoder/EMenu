import GoogleMaps from '../googlemap/GoogleMaps'

interface Props {
  formatted_address: string | null
  coordinates: {
    lat: number | null
    lng: number | null
  }
}
const place: Props = {
  formatted_address: 'Ha Noi',
  coordinates: {
    lat: 21.027763,
    lng: 105.83416,
  },
}
export default function Maps() {
  return (
    <GoogleMaps
      lat={place.coordinates.lat}
      lng={place.coordinates.lng}
      formatted_address={place.formatted_address}
    />
  )
}
