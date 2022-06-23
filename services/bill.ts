import firebase from 'firebase/app'
import { Bill } from '@/models/place'

const getGetAllUserOrders = async (userID: string) => {
  const orders = await firebase
    .firestore()
    .collection('bill')
    .where('userID', '==', userID)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data() as Bill
        data.billID = doc.id
        return data
      })
    })

  return orders
}

const uploadFeedback = async (
  billID: string,
  rating: number,
  content: string
) => {
  firebase
    .firestore()
    .collection('bill')
    .doc(billID)
    .update({ [`feedback.content`]: content, [`feedback.rating`]: rating })
}

export { getGetAllUserOrders, uploadFeedback }
