import firebase from 'firebase/app'
import { Place } from '@/models/place'

const getPlacesByIDList = async (ids: string[]) => {
  const places =
    ids.length < 10
      ? await firebase
          .firestore()
          .collection('place')
          .where(firebase.firestore.FieldPath.documentId(), 'in', ids)
          .get()
          .then((snapshot) => {
            return snapshot.docs.map((doc) => {
              const data = doc.data() as Place
              data.id = doc.id
              return data
            })
          })
      : await firebase
          .firestore()
          .collection('place')
          .get()
          .then((snapshot) => {
            return snapshot.docs.map((doc) => {
              const data = doc.data() as Place
              data.id = doc.id
              return data
            })
          })

  return places
}

const getAllPlaceID = async () => {
  const querySnapshot = await firebase.firestore().collection('place').get()

  const places_data = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Place
    data.id = doc.id
    return data
  })

  return places_data.map((place) => place.id)
}

export { getPlacesByIDList, getAllPlaceID }
