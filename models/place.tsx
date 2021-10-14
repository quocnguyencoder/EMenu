export interface Address {
  ward: string
  street: string
  city: string
  province: string
}

export interface Menu {
  [id: number]: MenuItem
}

export interface MenuItem {
  description: string
  image: string
  name: string
  price: number
}

export interface Time {
  open: string
  close: string
}

export interface Coordinate {
  lat: number
  lng: number
}

export interface Discount {
  name: string
}

export interface Rating {
  1: number
  2: number
  3: number
  4: number
  5: number
}

export interface CategoryInfo {
  name: string
  items: number[]
}

export interface Category {
  [id: number]: CategoryInfo
}

export interface Place {
  id: string
  address: Address
  categories: Category
  review: string[]
  image: string
  name: string
  rating: number
  type: string
  menu: Menu
  time: Time
  location: Coordinate
  show: boolean
  phone: string
  createdDate: string
  activeDate: string
}

export interface Order {
  [id: number]: {
    name: string
    price: number
    quantity: number
  }
}

export interface Reviews {
  [userID: string]: {
    content: string
    date: Date
    media: string[]
    rating: number
  }
}
