import { nonAccentVietnamese } from '@/functions/index'

// Khánh Hòa -> khanh-hoa
const normalizeText = (text: string) =>
  nonAccentVietnamese(text).toLowerCase().split(' ').join('-')

export const HOME = '/'
export const LOGIN = '/login'
export const ADMIN = '/admin'
export const NOTIFY = '/notify'
export const EMenuAdmin = '/e-menu/admin'
export const EMenuLogin = '/e-menu/login'
export const PLACE_DETAIL = (placeID: string) => `/detail/${placeID}`
export const LOCATION = (province: string) => `/${normalizeText(province)}`
export const USER_PROFILE = '/user/profile'
export const EXPLORE_LOCATION = (locationID: string) => `/explore/${locationID}`
export const PLACE_REVIEWS = (placeID: string) => `/reviews/${placeID}`
export const REGISTER_PLACE = '/user/register-place'
export const SAVED_PLACES = '/user/saved'
export const USER_ORDERS = '/user/orders'
export const CHECKOUT = '/checkout'
