import { Box, ListItem, ListItemText, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

interface Props {
  rating: number
  subject: string
  content: string
}

const ReviewContent = ({ rating, subject, content }: Props) => {
  return (
    <ListItem style={{ paddingTop: 0 }} component="div">
      <ListItemText
        primary={
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center">
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                {'Xếp hạng: '}
              </Typography>
              <Rating name="read-only" value={rating} readOnly />
            </Box>
            <Typography
              variant="body1"
              style={{
                fontWeight: 'bold',
                marginBottom: '2%',
              }}
            >
              {subject}
            </Typography>
          </Box>
        }
        secondary={
          <Typography variant="body2" style={{ textAlign: 'justify' }}>
            {content}
          </Typography>
        }
      />
    </ListItem>
  )
}

export default ReviewContent
