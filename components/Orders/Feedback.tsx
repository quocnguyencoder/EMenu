import { Box, Divider, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'

interface Feedback {
  [value: string]: {
    label: string
    placeholder: string
  }
}

interface Props {
  feedback: { content: string; rating: number }
}

const FeedbackInput = ({ feedback }: Props) => {
  const labels: Feedback = {
    0: { label: 'Vui lòng đánh giá', placeholder: 'Chia sẻ về đơn hàng' },
    1: {
      label: 'Rất không hài lòng',
      placeholder: 'Vấn đề bạn gặp là gì?',
    },
    2: {
      label: 'Không hài lòng',
      placeholder: 'Vấn đề bạn gặp là gì?',
    },
    3: {
      label: 'Bình thường',
      placeholder: 'Vấn đề bạn gặp là gì?',
    },
    4: {
      label: 'Hài lòng',
      placeholder: 'Vấn đề bạn gặp là gì?',
    },
    5: {
      label: 'Rất hài lòng',
      placeholder: 'Vì sao bạn thích đơn hàng này?',
    },
  }

  return (
    <>
      <Divider />
      <Box p={2}>
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          Chi tiết đánh giá đơn hàng
        </Typography>
      </Box>
      <Box
        padding="2rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        style={{ gap: '0.4rem' }}
      >
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          {labels[feedback.rating].label}
        </Typography>

        <Rating
          size="large"
          name="user-feedback"
          value={feedback.rating}
          readOnly
        />
        <Typography variant="body1">{feedback.content}</Typography>
      </Box>
    </>
  )
}

export default FeedbackInput
