import firebase from 'firebase/app'
import User from '@/models/user'

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

export default { getUserInfo }
