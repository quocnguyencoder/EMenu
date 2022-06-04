import { Paper, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import useUser from '@/firebase/useUser'

const AddReview = () => {
  const { user } = useUser()
  const isLoggedIn = user.id !== ''
  return (
    <Paper
      elevation={0}
      style={{
        minWidth: '19rem',
        height: '9rem',
        padding: '1.2rem 1rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '15%',
        backgroundColor: 'rgb(247, 247, 247)',
      }}
    >
      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
        {isLoggedIn ? user.name : 'Khách'}
      </Typography>

      <Rating
        defaultValue={0}
        name="rating input"
        precision={0.5}
        size="large"
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
      />
      <Typography variant="body2" color="secondary">
        Viết bài đánh giá
      </Typography>
    </Paper>
  )
}

export default AddReview
