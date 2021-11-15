import axios from 'axios'
import { useState, useEffect } from 'react'

interface Geocoding {
  formatted_address: string | null
  lat: number | null
  lng: number | null
  location_type: string | null
  place_id: string | null
}

const initialState: Geocoding = {
  formatted_address: null,
  lat: null,
  lng: null,
  location_type: null,
  place_id: null,
}

const useGeocoding = (address: string | null) => {
  const [place, setPlace] = useState<Geocoding>(initialState)
  useEffect(() => {
    axios
      .get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        },
      })

      .then((res: any) => {
        setPlace({
          formatted_address: res.data.results[0].formatted_address,
          lat: res.data.results[0].geometry.location.lat,
          lng: res.data.results[0].geometry.location.lng,
          location_type: res.data.results[0].location_type,
          place_id: res.data.results[0].place_id,
        })
      })
      // eslint-disable-next-line
      .catch()
  }, [])
  return place
}

export default useGeocoding
