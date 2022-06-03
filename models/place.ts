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

export interface CategoryInfo {
  name: string
  items: number[]
}

export interface Category {
  [id: number]: CategoryInfo
}

export interface RatingInfo {
  reviewID: string
  rating: number
  date: string
}
export interface RatingList {
  [userID: string]: RatingInfo[]
}

export interface Place {
  id: string
  address: Address
  categories: Category
  reviews: string[]
  image: string
  name: string
  rating: RatingList
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

export interface Comment {
  userID: string
  content: string
  date: string
}

export interface Review {
  id: string
  userID: string
  subject: string
  content: string
  date: string
  files: string[]
  rating: number
  likes: string[]
  comments: Comment[]
}
