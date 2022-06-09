import { useState } from 'react'
import {
  Avatar,
  IconButton,
  InputBase,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core'
import useUser from '@/firebase/useUser'
import moment from 'moment'
import * as updateService from '@/firebase/updateDocument'
import SendIcon from '@material-ui/icons/Send'
import { useStyles } from '@/styles/reviews'

interface Props {
  reviewID: string
  setDialogTitle: (title: string) => void
  setDialogContent: (content: string) => void
  setOpenErrorDialog: (status: boolean) => void
  setOpenDialog: (state: boolean) => void
}

const CommentInput = ({
  reviewID,
  setOpenDialog,
  setDialogTitle,
  setDialogContent,
  setOpenErrorDialog,
}: Props) => {
  const [input, setInput] = useState('')
  const { user } = useUser()
  const classes = useStyles()

  const handleChange = (value: string) => {
    setInput(value)
  }

  const isBadComment = async (value: string) => {
    const res = await fetch(`/api/v1/detoxify`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ text: value }),
    }).then(async (data) => {
      //console.log(await data.json())
      const isBad = await data.json()
      return isBad as boolean
    })

    return res
  }

  const handleUploadComment = async () => {
    if (user.id === '') {
      //show login required dialog
      setOpenDialog(true)
      return
    }
    //empty comment
    if (input === '') {
      setDialogTitle('Bình luận không hợp lệ')
      setDialogContent('Vui lòng nhập bình luận có nội dung')
      setOpenErrorDialog(true)
      return
    }

    const isBad = await isBadComment(input)
    if (isBad) {
      setDialogTitle('Phát hiện bình luận vi phạm')
      setDialogContent(
        'Vui lòng đăng tải bình luận có nội dung phù hợp với tiêu chuẩn cộng đồng!'
      )
      setOpenErrorDialog(true)
      setInput('')
      return
    }

    updateService.default.updateReviewComment(
      reviewID,
      user.id,
      moment().format('DD MM YYYY, h:mm:ss a'),
      input
    )
    setInput('')
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
            endAdornment={
              <IconButton
                style={{ padding: 0 }}
                onClick={() => handleUploadComment()}
                className={classes.userReviewButton}
              >
                <SendIcon />
              </IconButton>
            }
            onChange={(e) => handleChange(e.target.value)}
            style={{
              backgroundColor: '#fff',
              border: '1.3px ridge #e7e7e7',
              padding: '9px',
              width: '100%',
              borderRadius: '10px',
            }}
          />
        }
      />
    </ListItem>
  )
}

export default CommentInput
