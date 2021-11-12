import firebase from 'firebase/app'
import 'firebase/firestore'

const updatePlaceReview = (reviewID: string, placeID: string) => {
  const placeRef = firebase.firestore().collection('place').doc(placeID)

  placeRef.update({
    reviews: firebase.firestore.FieldValue.arrayUnion(reviewID),
  })
}

const updateUserReview = (reviewID: string, userID: string) => {
  const userRef = firebase.firestore().collection('user').doc(userID)

  userRef.update({
    reviews: firebase.firestore.FieldValue.arrayUnion(reviewID),
  })
}

const updatePlaceRating = (
  placeID: string,
  userID: string,
  reviewID: string,
  rating: number,
  date: string
) => {
  const placeRef = firebase.firestore().collection('place').doc(placeID)

  placeRef.update({
    [`rating.${userID}`]: firebase.firestore.FieldValue.arrayUnion({
      reviewID: reviewID,
      rating: rating,
      date: date,
    }),
  })
}

export default { updatePlaceReview, updateUserReview, updatePlaceRating }
