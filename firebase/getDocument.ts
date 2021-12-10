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

const getAllPlaces = async () => {
  const querySnapshot = await firebase.firestore().collection('place').get()

  const places_data = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Place
    data.id = doc.id
    return data
  })

  return places_data
}

export default { getAllPlaces, getUserInfo, getPlaceInfo }
