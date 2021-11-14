import { Box, IconButton, ListItem, Typography } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import * as updateService from '@/firebase/updateDocument'
import useUser from '@/firebase/useUser'

interface Props {
  reviewID: string
  likes: string[]
  setShowComments: (state: boolean) => void
}

const ReviewButtons = ({ reviewID, likes, setShowComments }: Props) => {
  const { user } = useUser()
  const isAlreadyLiked = likes.includes(user.id)
  const handleClick = (status: string) => {
    user.id !== '' &&
      updateService.default.updateReviewLikes(reviewID, user.id, status)
  }

  return (
    <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
      <Box display="flex">
        {isAlreadyLiked ? (
          <IconButton
            onClick={() => handleClick('unlike')}
            style={{ color: 'orange' }}
          >
            <ThumbUpIcon />
            <Typography variant="body2">{'Hữu ích'}</Typography>
          </IconButton>
        ) : (
          <IconButton onClick={() => handleClick('like')}>
            <ThumbUpOutlinedIcon />
            <Typography variant="body2">{'Hữu ích'}</Typography>
          </IconButton>
        )}

        <IconButton onClick={() => setShowComments(true)}>
          <ChatBubbleOutlineIcon />
          <Typography variant="body2">{'Bình luận'}</Typography>
        </IconButton>
      </Box>
    </ListItem>
  )
}

export default ReviewButtons
