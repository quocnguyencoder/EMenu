import React from 'react'
import {
  Avatar,
  Box,
  ClickAwayListener,
  IconButton,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Paper,
  Popper,
  Tooltip,
  Typography,
} from '@material-ui/core'
import moment from 'moment'
import * as getService from '@/firebase/getDocument'
import User from '@/models/user'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { MoreVert } from '@material-ui/icons'
import useUser from '@/firebase/useUser'
import * as deleteService from '@/firebase/deleteDocument'
import { RatingInfo } from '@/models/place'

interface Props {
  userID: string
  date: string
  ratingObj: RatingInfo
  reviewID: string
  placeID: string
}

const ReviewHeader = ({
  userID,
  date,
  ratingObj,
  reviewID,
  placeID,
}: Props) => {
  const [userData, setUserData] = useState<User>()
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    getService.default.getUserInfo(userID).then((data) => {
      setUserData(data)
    })
  }, [])

  const gotoUserDetail = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    router.push('#')
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)

  const handleDeleteReview = () => {
    setAnchorEl(null)
    deleteService.default.deleteUserReview(reviewID, placeID, userID, ratingObj)
  }

  return userData !== undefined ? (
    <>
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
        <Box>
          <ListItemSecondaryAction>
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>
          </ListItemSecondaryAction>
        </Box>
      </ListItem>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-end">
        <Paper>
          <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            {user.id === userID ? (
              <MenuItem onClick={handleDeleteReview}>
                <Typography
                  variant="body2"
                  style={{ fontWeight: 600, color: 'red' }}
                >
                  {'Xoá bài đánh giá'}
                </Typography>
              </MenuItem>
            ) : (
              <MenuItem>
                <Typography
                  variant="body2"
                  style={{ fontWeight: 600, color: 'red' }}
                >
                  {'Báo cáo bài đánh giá'}
                </Typography>
              </MenuItem>
            )}
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  ) : (
    <> </>
  )
}

export default ReviewHeader
