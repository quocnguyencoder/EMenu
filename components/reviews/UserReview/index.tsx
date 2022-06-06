import { Divider, Paper } from '@material-ui/core'
import React from 'react'
import { RatingInfo, Review } from '@/models/place'
import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import ReviewHeader from './ReviewHeader'
import ReviewContent from './ReviewContent'
import ReviewImages from './ReviewImages'
import ReviewReactInfo from './ReviewReactInfo'
import ReviewButtons from './ReviewButtons'
import ReviewComment from './ReviewComment'
import CommentInput from './CommentInput'
import { RatingList } from '@/models/place'

interface Props {
  reviewID: string
  setOpenDialog: (state: boolean) => void
  ratings: RatingList
  userID: string
  placeID: string
}

const UserReview = ({
  reviewID,
  setOpenDialog,
  ratings,
  userID,
  placeID,
}: Props) => {
  const [userReview, setUserReview] = useState<Review>()
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('review')
      .doc(reviewID)
      .onSnapshot((snapshot) => {
        const data = snapshot.data() as Review
        setUserReview(data)
      })
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])

  const getRatingObj = (userID: string, reviewID: string) => {
    const rating =
      ratings[`${userID}`] !== undefined
        ? ratings[`${userID}`].filter((info) => info.reviewID === reviewID)
        : ([{}] as RatingInfo[])
    return rating[0]
  }

  return userReview !== undefined ? (
    <Paper
      variant="outlined"
      style={{
        backgroundColor: '#fff',
        marginBottom: '20px',
      }}
    >
      <ReviewHeader
        userID={userReview.userID}
        date={userReview.date}
        ratingObj={getRatingObj(userID, reviewID)}
        reviewID={reviewID}
        placeID={placeID}
      />
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
  ) : (
    <> </>
  )
}

export default React.memo(UserReview)
