import firebase from 'firebase/app'
import { Location } from '@/models/location'

const getAllLocations = async () => {
  const locationData = await firebase
    .firestore()
    .collection('location')
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data() as Location
        data.slug = doc.id
        return data
      })
    })
  return locationData
}

export { getAllLocations }
