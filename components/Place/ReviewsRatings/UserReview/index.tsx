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
import React from 'react'

interface Props {
  reviewID: string
  setOpenDialog: (state: boolean) => void
}

const UserReview = ({ reviewID, setOpenDialog }: Props) => {
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
          reviewID={reviewID}
          likes={userReview.likes}
          setShowComments={setShowComments}
          setOpenDialog={setOpenDialog}
        />
        {showComments && (
          <>
            {userReview.comments.map((comment, index) => (
              <ReviewComment
                key={`comment-${index}-review-${reviewID}`}
                comment={comment}
              />
            ))}
            <CommentInput reviewID={reviewID} setOpenDialog={setOpenDialog} />
          </>
        )}
      </Paper>
    </>
  ) : (
    <> </>
  )
}

export default React.memo(UserReview)
