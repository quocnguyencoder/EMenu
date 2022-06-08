import firebase from 'firebase/app'

const addToSaved = async (userID: string, placeID: string) => {
  await firebase
    .firestore()
    .collection('user')
    .doc(userID)
    .update({
      saved: firebase.firestore.FieldValue.arrayUnion(placeID),
    })
}

const removeFromSaved = async (userID: string, placeID: string) => {
  await firebase
    .firestore()
    .collection('user')
    .doc(userID)
    .update({
      saved: firebase.firestore.FieldValue.arrayRemove(placeID),
    })
}

export { addToSaved, removeFromSaved }
