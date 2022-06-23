export interface Incredient {
  id: number
  name: string
  carb: number
  fat: number
  sFat: number
  protein: number
  calo: number
  fiber: number
}

export interface MenuItemIncredients {
  [id: number]: {
    weight: number
  }
}
