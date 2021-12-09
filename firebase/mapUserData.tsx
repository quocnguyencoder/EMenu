import firebase from 'firebase/app'

export const mapUserData = (user: firebase.User) => {
  const { uid, email, displayName, photoURL } = user
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
            profilePic: photoURL != null ? photoURL : '',
            placeID: '',
            reviews: [] as string[],
          })
      }
    })
}
