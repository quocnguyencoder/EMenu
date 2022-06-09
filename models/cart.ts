export interface Cart {
  placeID: string
  items: CartItems
}

export interface CartItems {
  [itemID: number]: CartItem
}

export interface CartItem {
  quantity: number
}
