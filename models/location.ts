import { Coordinate } from './place'

export interface Location {
  slug: string
  name: string
  coordinate: Coordinate
  places: string[]
}
