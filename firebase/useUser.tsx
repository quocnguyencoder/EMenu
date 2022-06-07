import { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '@/firebase/initFirebase'
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from './userCookies'
import { mapUserData } from './mapUserData'
import User from '@/models/user'
import router from 'next/router'

initFirebase()

const initialState: User = {
  id: '',
  email: '',
  token: '',
  name: '',
  profilePic: '',
  placeID: '',
  reviews: [],
  saved: [],
}

const useUser = () => {
  const [user, setUser] = useState<User>(initialState)

  const logout = async () => {
    firebase.auth().signOut()
    router.push('/')
  }
  let unsubscribe: () => void
  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebase.auth().onIdTokenChanged((user) => {
      if (user) {
        mapUserData(user)
        unsubscribe = firebase
          .firestore()
          .collection('user')
          .doc(user.uid)
          .onSnapshot((snapshot) => {
            const userID = user.uid
            const user_data = snapshot.data() as User
            user_data.id = userID
            user_data.token = user.refreshToken
            sessionStorage.setItem('userInfo', JSON.stringify(user_data))
            setUser(user_data)
            setUserCookie(user_data)
          })
        const userID = { userID: user.uid }
        sessionStorage.setItem('userID', JSON.stringify(userID))
      } else {
        unsubscribe && unsubscribe()
        removeUserCookie()
        setUser({ ...initialState })
        sessionStorage.clear()
      }
    })

    const userFromCookie = getUserFromCookie()

    if (!userFromCookie) {
      return
    }
    setUser(userFromCookie)

    return () => {
      cancelAuthListener()
    }
  }, [])

  return { user, logout }
}

export default useUser
