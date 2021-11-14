import React from 'react'
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

interface Props {
  userID: string
  date: string
}

const ReviewHeader = ({ userID, date }: Props) => {
  const [userData, setUserData] = useState<User>()
  const router = useRouter()

  useEffect(() => {
    getService.default.getUserInfo(userID).then((data) => {
      setUserData(data)
    })
  }, [])

  const gotoUserDetail = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    router.push('#')
  }

  return userData !== undefined ? (
    <ListItem style={{ paddingBottom: 0 }} component="div">
      <ListItemAvatar>
        <Avatar
          src={userData.profilePic}
          alt={`${userData.name}'s avatar'`}
          style={{ width: '50px', height: '50px' }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Link
            href={'#'}
            color="inherit"
            variant="body1"
            onClick={(e) => gotoUserDetail(e)}
            style={{ fontWeight: 'bold' }}
          >
            {userData.name}
          </Link>
        }
        secondary={
          <Tooltip
            title={moment(date, 'DD MM YYYY, h:mm:ss a').format('LLL')}
            placement="bottom-start"
          >
            <Typography
              variant="body2"
              style={{ cursor: 'pointer' }}
              component={'span'}
            >
              {moment(date, 'DD MM YYYY, h:mm:ss a').fromNow()}
            </Typography>
          </Tooltip>
        }
      />
    </ListItem>
  ) : (
    <> </>
  )
}

export default ReviewHeader
