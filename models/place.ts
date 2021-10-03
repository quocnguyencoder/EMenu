export interface Address {
  ward: string
  street: string
  city: string
  province: string
}

export interface Menu {
  category: number[]
  description: string
  image: string
  name: string
  price: number
}

export interface Time {
  open: number
  close: number
}

export interface Coordinate {
  lat: number
  lng: number
}

export interface Discount {
  name: string
}

export interface Place {
  id: string
  address: Address
  category: string[]
  review: string[]
  image: string
  name: string
  rating: number
  type: string
  menu: Menu[]
  time: Time
  location: Coordinate
  show: boolean
}

export interface Order {
  [id: string]: {
    name: string
    price: number
    quantity: number
  }
}
