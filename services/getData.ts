import firebase from 'firebase/app'
import { Place, Review } from '@/models/place'
import User from '@/models/user'

const getAllPlaces = async () => {
  const querySnapshot = await firebase.firestore().collection('place').get()

  const places_data = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Place
    data.id = doc.id
    return data
  })

  return places_data
}

const getPlaceDetail = async (placeID: string) => {
  const place_data = await firebase
    .firestore()
    .collection('place')
    .doc(placeID)
    .get()
    .then((snapshot) => {
      return snapshot.data() as Place
    })

  place_data.id = placeID
  return place_data
}

const getReviewByID = async (reviewID: string) => {
  const data = await firebase
    .firestore()
    .collection('review')
    .doc(reviewID)
    .get()
    .then((snapshot) => {
      return snapshot.data() as Review
    })
  return data
}

const getUserByID = async (userID: string) => {
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

export { getAllPlaces, getPlaceDetail, getReviewByID, getUserByID }
