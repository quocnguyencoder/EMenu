import { nonAccentVietnamese } from '@/functions/index'

// Khánh Hòa -> khanh-hoa
const normalizeText = (text: string) =>
  nonAccentVietnamese(text).toLowerCase().split(' ').join('-')

export const HOME = '/'
export const LOGIN = '/login'
export const ADMIN = '/admin'
export const EMenuAdmin = '/e-menu/admin'
export const EMenuLogin = '/e-menu/login'
export const PLACE_DETAIL = (placeID: string) => `/detail/${placeID}`
export const LOCATION = (province: string) => `/${normalizeText(province)}`
export const USER_PROFILE = '/user/profile'
export const EXPLORE_LOCATION = (locationID: string) => `/explore/${locationID}`
