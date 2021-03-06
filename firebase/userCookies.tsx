import cookies from 'js-cookie'
import User from '../models/user'

export const getUserFromCookie = () => {
  const cookie = cookies.get('auth')

  if (!cookie) {
    return
  }

  try {
    return JSON.parse(JSON.stringify(cookie))
  } catch {
    //console.log("cookie");
  }
  return JSON.parse(cookie)
}

export const setUserCookie = (user: User) => {
  cookies.set('auth', user, {
    // firebase id tokens expire in one hour
    // set cookie expiry to match
    expires: 1 / 24,
  })
}

export const removeUserCookie = () => cookies.remove('auth')
