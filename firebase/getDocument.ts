import firebase from 'firebase/app'
import User from '@/models/user'
import { Place } from '@/models/place'

const getUserInfo = async (userID: string) => {
  const userData = await firebase
    .firestore()
    .collection('user')
    .doc(userID)
    .get()
    .then((snapshot) => {
      return snapshot.data() as User
    })
  return userData
}

const getPlaceInfo = async (placeID: string) => {
  const placeData = await firebase
    .firestore()
    .collection('place')
    .doc(placeID)
    .get()
    .then((snapshot) => {
      const data = snapshot.data() as Place
      data.id = snapshot.id
      return data
    })
  return placeData
}

export default { getUserInfo, getPlaceInfo }
