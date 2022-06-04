import { Review } from '@/models/place'
import User from '@/models/user'
import { getReviewByID, getUserByID } from '@/services/getData'
import { Box, Paper, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

interface Props {
  reviewID: string
}

const ReviewBlock = ({ reviewID }: Props) => {
  const [reviewInfo, setReviewInfo] = useState<Review>()
  const [userInfo, setUserInfo] = useState<User>()

  useEffect(() => {
    try {
      getReviewByID(reviewID).then((reviewData) => {
        getUserByID(reviewData.userID).then((userData) => {
          setUserInfo(userData)
          setReviewInfo(reviewData)
        })
      })
    } catch (err) {
      console.error(err)
    }
  }, [])

  return reviewInfo && userInfo ? (
    <Paper
      variant="outlined"
      style={{
        minWidth: '19rem',
        maxWidth: '19rem',
        height: '9rem',
        padding: '2rem 1rem',
        cursor: 'pointer',
      }}
    >
      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
        {userInfo.name}
      </Typography>
      <Box display="flex" alignItems="center">
        <Rating
          value={reviewInfo.rating}
          precision={0.5}
          name="user rating"
          size="small"
          readOnly
        />
        <Typography
          variant="body2"
          color="secondary"
          style={{ marginLeft: '2%' }}
        >
          {moment(reviewInfo.date, 'DD MM YYYY, h:mm:ss a').format('l')}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {`${reviewInfo.content}`}
      </Typography>
    </Paper>
  ) : (
    <></>
  )
}

export default ReviewBlock
