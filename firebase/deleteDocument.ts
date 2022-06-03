import { Place, RatingInfo } from '@/models/place'
import firebase from 'firebase/app'

const deleteUserReview = (
  reviewID: string,
  placeID: string,
  userID: string,
  ratingObj: RatingInfo
) => {
  const placeRef = firebase.firestore().collection('place').doc(placeID)
  const userRef = firebase.firestore().collection('user').doc(userID)
  firebase
    .firestore()
    .collection('review')
    .doc(reviewID)
    .delete()
    .then(() =>
      placeRef
        .update({
          [`rating.${userID}`]:
            firebase.firestore.FieldValue.arrayRemove(ratingObj),
          reviews: firebase.firestore.FieldValue.arrayRemove(reviewID),
        })
        .then(() =>
          userRef
            .update({
              reviews: firebase.firestore.FieldValue.arrayRemove(reviewID),
            })
            .then(() => {
              placeRef.get().then((snapshot) => {
                const data = snapshot.data() as Place
                if (data.rating[`${userID}`].length === 0) {
                  placeRef.update({
                    [`rating.${userID}`]:
                      firebase.firestore.FieldValue.delete(),
                  })
                }
              })
            })
        )
    )
}

const deleteUserOrder = (placeID: string, billID: string) => {
  firebase
    .firestore()
    .collection('bill')
    .doc(billID)
    .delete()
    .then(() => {
      firebase
        .firestore()
        .collection('place')
        .doc(placeID)
        .update({ order: firebase.firestore.FieldValue.arrayRemove(billID) })
    })
}

export default { deleteUserReview, deleteUserOrder }
