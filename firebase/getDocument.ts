import firebase from 'firebase/app'
import User from '@/models/user'
import { Place } from '@/models/place'

const getCollection = async (collection: string) => {
  const querySnapshot = await firebase.firestore().collection(collection).get()
  return querySnapshot
}

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

const getAllReviewsOfPlace = async (placeID: string) => {
  const reviewsData = await firebase
    .firestore()
    .collection('place')
    .doc(placeID)
    .get()
    .then((placeInfo) => {
      const reviews = placeInfo.data() as Place
      return reviews.reviews
    })
  return reviewsData
}

const getNewImage = async (placeID: string, name: string) => {
  const url = await firebase
    .storage()
    .ref(`/place_pictures/${placeID}/`)
    .child(name)
    .getDownloadURL()
    .then((res) => {
      return res as string
    })
  return url
}

export default {
  getCollection,
  getUserInfo,
  getPlaceInfo,
  getAllReviewsOfPlace,
  getNewImage,
}
