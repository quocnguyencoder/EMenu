import { Box, Paper, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'

const ReviewBlock = () => {
  return (
    <Paper
      variant="outlined"
      style={{
        minWidth: '19rem',
        height: '9rem',
        padding: '2rem 1rem',
        cursor: 'pointer',
      }}
    >
      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
        QuocN.
      </Typography>
      <Box display="flex" alignItems="center">
        <Rating defaultValue={5} name="user rating" size="small" readOnly />
        <Typography
          variant="body2"
          color="secondary"
          style={{ marginLeft: '2%' }}
        >
          9/5/22
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
      >{`Quán ngon, rẻ, chất lượng`}</Typography>
    </Paper>
  )
}

export default ReviewBlock
