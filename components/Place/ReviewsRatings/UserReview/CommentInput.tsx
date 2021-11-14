import { useState } from 'react'
import {
  Avatar,
  InputBase,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core'
import useUser from '@/firebase/useUser'
import moment from 'moment'
import * as updateService from '@/firebase/updateDocument'

interface Props {
  reviewID: string
}

const CommentInput = ({ reviewID }: Props) => {
  const [input, setInput] = useState('')
  const { user } = useUser()

  const handleChange = (value: string) => {
    setInput(value)
  }

  const handleUploadComment = (key: string, shiftKey: boolean) => {
    if (key === 'Enter' && !shiftKey) {
      updateService.default.updateReviewComment(
        reviewID,
        user.id,
        moment().format('DD MM YYYY, h:mm:ss a'),
        input
      )
      setInput('')
    }
  }

  return (
    <ListItem style={{ backgroundColor: '#f9f9f9' }}>
      <ListItemAvatar>
        <Avatar src={user.profilePic} alt="User ava" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <InputBase
            placeholder="Bình luận"
            value={input}
            multiline
            minRows={1}
            maxRows={3}
            onChange={(e) => handleChange(e.target.value)}
            onKeyUp={(e) => handleUploadComment(e.key, e.shiftKey)}
            style={{
              backgroundColor: '#fff',
              border: '1.3px ridge #e7e7e7',
              padding: '9px',
              width: '100%',
            }}
          />
        }
      />
    </ListItem>
  )
}

export default CommentInput
