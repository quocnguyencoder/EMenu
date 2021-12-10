import firebase from 'firebase/app'
import * as createService from './createDocument'

export const mapUserData = (user: firebase.User) => {
  const { uid, email, displayName, photoURL } = user
  firebase
    .firestore()
    .collection('user')
    .doc(uid)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        createService.default.createUserInfo(uid, email, displayName, photoURL)
      }
    })
}
