import { Coordinate } from './place'

export interface Address {
  street: string
  ward: string
  city: string
  slug: string
  coordinate: Coordinate
}
