import { nonAccentVietnamese } from '@/functions/index'

// Khánh Hòa -> khanh-hoa
const normalizeText = (text: string) => {
  nonAccentVietnamese(text).toLowerCase().split(' ').join('-')
}

export const HOME = '/'
export const LOGIN = '/login'
export const ADMIN = '/admin'
export const PLACE_DETAIL = (province: string, placeID: string) =>
  `/${normalizeText(province)}/${placeID}`
export const LOCATION = (province: string) => `/${normalizeText(province)}`
