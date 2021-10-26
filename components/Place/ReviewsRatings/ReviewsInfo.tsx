import {
  Box,
  ButtonBase,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'

interface Props {
  handleOpenModal: () => void
}
const ReviewsInfo = ({ handleOpenModal }: Props) => {
  return (
    <Box width="32%">
      <Paper
        style={{
          backgroundColor: '#fff',
          alignSelf: 'flex-start',
          position: 'sticky',
          top: 70,
          display: 'flex',
          flexDirection: 'column',
          padding: '2%',
        }}
      >
        <ListItemText
          primary={
            <Typography variant="h6">{'Xếp hạng địa điểm này'}</Typography>
          }
          secondary={'Cho người khác biết suy nghĩ của bạn'}
        />
        <Rating
          name="rating"
          style={{
            fontSize: 'clamp(16px, 3vw, 32px)',
            gap: '3%',
            marginTop: '3%',
          }}
        />
        <ButtonBase
          onClick={() => handleOpenModal()}
          style={{ width: '40%', marginTop: '5%', color: '#D14B28' }}
        >
          <Typography variant="body2">{'Viết bài đánh giá'}</Typography>
        </ButtonBase>
      </Paper>
    </Box>
  )
}

export default ReviewsInfo
