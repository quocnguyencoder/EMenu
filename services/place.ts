import firebase from 'firebase/app'
import { Place } from '@/models/place'

const getPlacesByIDList = async (ids: string[]) => {
  const places = await firebase
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

  return places
}

export { getPlacesByIDList }
