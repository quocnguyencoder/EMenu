import React from 'react'
import {
  Box,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import { Comment } from '@/models/place'

interface Props {
  likes: string[]
  comments: Comment[]
}

const ReviewReactInfo = ({ likes, comments }: Props) => {
  return (
    <ListItem component="div" style={{ paddingBottom: 0 }}>
      <>
        <ListItemText
          primary={
            <Box display="flex">
              <ThumbUpAltIcon
                style={{
                  backgroundColor: 'orange',
                  borderRadius: '20px',
                  color: '#fff',
                  marginRight: '3px',
                  fontSize: '19px',
                }}
              />
              <Typography variant="subtitle2">{`${likes.length}`}</Typography>
            </Box>
          }
        />
        <ListItemSecondaryAction>
          <ListItemText
            primary={
              <Typography variant="subtitle2" style={{ paddingTop: '10px' }}>
                {`${comments.length} Bình luận`}
              </Typography>
            }
          />
        </ListItemSecondaryAction>
      </>
    </ListItem>
  )
}

export default ReviewReactInfo
