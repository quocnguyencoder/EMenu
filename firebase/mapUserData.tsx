import firebase from 'firebase/app'
import User from '../models/user'
import * as createService from './createDocument'

export const mapUserData = (user: firebase.User) => {
  const { uid, email, refreshToken, displayName, photoURL } = user
  firebase
    .firestore()
    .collection('user')
    .doc(uid)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        createService.default.createUserInfo(uid, email, displayName)
      }
    })

  return {
    id: uid,
    email: email != null ? email : '',
    token: refreshToken,
    name: displayName != null ? displayName : '',
    profilePic: photoURL != null ? photoURL : '',
    placeID: '',
    reviews: [],
  } as User
}
