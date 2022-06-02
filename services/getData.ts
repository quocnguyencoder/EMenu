import firebase from 'firebase/app'
import { Place } from '@/models/place'

const getAllPlaces = async () => {
  const querySnapshot = await firebase.firestore().collection('place').get()

  const places_data = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Place
    data.id = doc.id
    return data
  })

  return places_data
}

export { getAllPlaces }
