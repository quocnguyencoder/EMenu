import firebase from 'firebase/app'
import 'firebase/firestore'

interface Props {
  userID: string
  subject: string
  content: string
  date: string
  files: string[]
  rating: number
}
const writeReviewOnFirebase = ({
  userID,
  subject,
  content,
  date,
  files,
  rating,
}: Props) => {
  const userReview = {
    userID: userID,
    subject: subject,
    content: content,
    date: date,
    files: files,
    rating: rating,
    likes: [] as string[],
    comments: [] as string[],
  }
  const docID =
    // Add a new document with a generated id.
    firebase
      .firestore()
      .collection('review')
      .add(userReview)
      .then(function (docRef) {
        //console.log('Document written with ID: ', docRef.id)
        return docRef.id
      })
      .catch(function () {
        //console.error('Error adding document: ', error)
        return ''
      })
  return docID
}

export default { writeReviewOnFirebase }
