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
  discount: number
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
  order: string[]
  tags: string[]
}

export interface Bill {
  billID: string
  items: Order[]
  note: string
  datetime: string
  payment: string
  placeID: string
  status: string
  userID: string
  total: number
  deliveryTo: string
  phone: string
}

export interface BillDetail extends Bill {
  buyerName: string
}

export interface Order {
  [id: number]: {
    name: string
    price: number
    quantity: number
    discount: number
    image: string
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
