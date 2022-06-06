import {
  Avatar,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@material-ui/core'
import moment from 'moment'
import * as getService from '@/firebase/getDocument'
import User from '@/models/user'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Comment } from '@/models/place'

interface Props {
  comment: Comment
}

const ReviewComment = ({ comment }: Props) => {
  const [userData, setUserData] = useState<User>()
  const router = useRouter()

  useEffect(() => {
    getService.default.getUserInfo(comment.userID).then((data) => {
      setUserData(data)
    })
  }, [])

  const gotoUserDetail = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    router.push('/')
  }

  return userData !== undefined ? (
    <ListItem
      component="div"
      style={{ backgroundColor: '#f9f9f9', height: '50px' }}
    >
      <ListItemAvatar>
        <Avatar src={userData.profilePic} alt={`${userData.name}'s avatar'`} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body2">
            <Link
              style={{
                fontWeight: 'bold',
                color: 'black',
                marginRight: '1%',
              }}
              onClick={(e) => gotoUserDetail(e)}
            >
              {userData.name}
            </Link>
            {comment.content}
          </Typography>
        }
        secondary={
          <Tooltip
            title={moment(comment.date, 'DD MM YYYY, h:mm:ss a').format('LLL')}
            placement="bottom-start"
          >
            <Typography
              variant="body2"
              style={{ cursor: 'pointer' }}
              component={'span'}
            >
              {moment(comment.date, 'DD MM YYYY, h:mm:ss a').fromNow()}
            </Typography>
          </Tooltip>
        }
      />
    </ListItem>
  ) : (
    <> </>
  )
}

export default ReviewComment
