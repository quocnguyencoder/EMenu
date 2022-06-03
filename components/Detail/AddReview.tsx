import { Paper, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder'

const AddReview = () => {
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
        QuocN.
      </Typography>

      <Rating
        defaultValue={0}
        name="rating input"
        size="large"
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
      />
      <Typography variant="body2" color="secondary">
        Viết đánh giá
      </Typography>
    </Paper>
  )
}

export default AddReview
