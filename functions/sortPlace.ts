import { toAvgRating } from '@/helpers/toAvgRating'
import { Coordinate, Place } from '@/models/place'
import calcCrow from './distanceCalc'

const orderByDistance = (places: Place[], currentPosition: Coordinate) => {
  return [...places].sort(
    (a, b) =>
      calcCrow(
        a.location.lat,
        a.location.lng,
        currentPosition.lat,
        currentPosition.lng
      ) -
      calcCrow(
        b.location.lat,
        b.location.lng,
        currentPosition.lat,
        currentPosition.lng
      )
  )
}

const orderByRating = (places: Place[]) =>
  [...places]
    .sort((a, b) => {
      return Number(toAvgRating(a.rating)) - Number(toAvgRating(b.rating))
    })
    .reverse()

export { orderByDistance, orderByRating }
