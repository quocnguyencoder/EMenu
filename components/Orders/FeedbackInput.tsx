import { uploadFeedback } from '@/services/bill'
import { Box, Button, Divider, TextField, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'
import ErrorDialog from '../common/ErrorDialog'

interface Feedback {
  [value: string]: {
    label: string
    placeholder: string
  }
}

interface Props {
  billID: string
  setFeedback: (feedback: { content: string; rating: number }) => void
}

const FeedbackInput = ({ billID, setFeedback }: Props) => {
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
  const [value, setValue] = React.useState<number | null>(0)
  const [hover, setHover] = React.useState(0)
  const [content, setContent] = React.useState('')
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false)

  const handleUploadFeedback = () => {
    if (value === 0 || value === null || content === '') {
      setOpenErrorDialog(true)
    } else {
      uploadFeedback(billID, value, content).then(() =>
        setFeedback({ content: content, rating: value })
      )
    }
  }

  return (
    <>
      <Divider />
      <Box p={2}>
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          Đánh giá đơn hàng
        </Typography>
      </Box>
      <Box
        padding="0 2rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        style={{ gap: '0.4rem' }}
      >
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          {value !== null
            ? labels[hover !== -1 ? hover : value].label
            : 'Vui lòng đánh giá'}
        </Typography>

        <Rating
          size="large"
          name="user-feedback"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover)
          }}
        />
        <TextField
          style={{ width: '100%', marginBottom: '1rem', maxWidth: '30rem' }}
          id="outlined-basic"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          variant="outlined"
          minRows={2}
          placeholder={
            value !== null
              ? labels[hover !== -1 ? hover : value].placeholder
              : 'Chia sẻ về đơn hàng'
          }
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUploadFeedback()}
          style={{
            color: '#FFFFFF',
            width: '100%',
            maxWidth: '30rem',
            height: '3.3rem',
            marginBottom: '1rem',
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          Gửi đánh giá
        </Button>
      </Box>
      <ErrorDialog
        open={openErrorDialog}
        title="Gửi đánh giá thất bại"
        content="Vui lòng đánh giá và nhập nhận xét"
        handleClose={() => setOpenErrorDialog(false)}
      />
    </>
  )
}

export default FeedbackInput
