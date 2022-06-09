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

const getLocationBySlug = async (slug: string) => {
  const location = await firebase
    .firestore()
    .collection('location')
    .doc(slug)
    .get()
    .then((snapshot) => {
      const data = snapshot.data() as Location
      data.slug = snapshot.id
      return data
    })

  return location
}

export { getAllLocations, getLocationBySlug }
