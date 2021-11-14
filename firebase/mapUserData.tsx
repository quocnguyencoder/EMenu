import firebase from 'firebase/app'
import User from '../models/user'

export const mapUserData = (user: firebase.User) => {
  const { uid, email, refreshToken, displayName, photoURL } = user
  firebase
    .firestore()
    .collection('user')
    .doc(uid)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        firebase
          .firestore()
          .collection('user')
          .doc(uid)
          .set({
            email: email,
            name: displayName,
            profilePic: photoURL,
            placeID: '',
            reviews: [] as string[],
          })
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
