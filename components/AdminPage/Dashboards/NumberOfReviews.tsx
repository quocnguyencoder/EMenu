import { Box, Paper, Typography } from '@material-ui/core'
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined'

interface Props {
  ratings: string[]
}

const NumberOfReviews = ({ ratings }: Props) => {
  return (
    <Box flex="1" m="1%">
      <Paper style={{ padding: '5%' }}>
        <Typography variant="subtitle2">Số bài đánh giá</Typography>
        <Box display="flex">
          <Typography
            variant="h6"
            style={{ fontWeight: 600, alignSelf: 'center', width: '100%' }}
          >
            {`${ratings.length}`}
          </Typography>
          <CommentOutlinedIcon style={{ color: '#00BFFF' }} />
        </Box>
      </Paper>
    </Box>
  )
}

export default NumberOfReviews
