import { Coordinate } from '@/models/place'
import { Typography } from '@material-ui/core'
import { calcCrow } from '@/functions/index'
import { useEffect, useState } from 'react'

interface Props {
  placeCoord: Coordinate
}

const PlaceDistance = ({ placeCoord }: Props) => {
  const [distance, setDistance] = useState<number>()
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const res = calcCrow(
        position.coords.latitude,
        position.coords.longitude,
        placeCoord.lat,
        placeCoord.lng
      )
      setDistance(res)
    })
  }, [])

  return (
    <>
      {distance !== undefined && (
        <Typography
          variant="subtitle2"
          style={{ color: 'gray' }}
        >{` • ${Math.floor(distance)}km`}</Typography>
      )}
    </>
  )
}

export default PlaceDistance
