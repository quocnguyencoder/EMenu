import { Divider, Paper } from '@material-ui/core'
import { Review } from '@/models/place'
import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import ReviewHeader from './ReviewHeader'
import ReviewContent from './ReviewContent'
import ReviewImages from './ReviewImages'
import ReviewReactInfo from './ReviewReactInfo'
import ReviewButtons from './ReviewButtons'
import ReviewComment from './ReviewComment'
import CommentInput from './CommentInput'

interface Props {
  reviewID: string
}

const UserReview = ({ reviewID }: Props) => {
  const [userReview, setUserReview] = useState<Review>()
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    firebase
      .firestore()
      .collection('review')
      .doc(reviewID)
      .onSnapshot((snapshot) => {
        const data = snapshot.data() as Review
        setUserReview(data)
      })
  }, [])

  return userReview !== undefined ? (
    <>
      <Paper style={{ backgroundColor: '#fff', marginBottom: '20px' }}>
        <ReviewHeader userID={userReview.userID} date={userReview.date} />
        <ReviewContent
          rating={userReview.rating}
          subject={userReview.subject}
          content={userReview.content}
        />
        {userReview.files.length !== 0 && (
          <ReviewImages reviewID={reviewID} files={userReview.files} />
        )}
        <ReviewReactInfo
          likes={userReview.likes}
          comments={userReview.comments}
        />
        <Divider variant="middle" />
        <ReviewButtons
          userID={userReview.userID}
          reviewID={reviewID}
          likes={userReview.likes}
          setShowComments={setShowComments}
        />
        {showComments && (
          <>
            <CommentInput reviewID={reviewID} />
            {userReview.comments.reverse().map((comment, index) => (
              <ReviewComment
                key={`comment-${index}-review-${reviewID}`}
                comment={comment}
              />
            ))}
          </>
        )}
      </Paper>
    </>
  ) : (
    <> </>
  )
}

export default UserReview
