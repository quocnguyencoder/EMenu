import React from 'react'
import { Time } from '@/models/place'
import { Box, Typography } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import moment from 'moment'

interface Props {
  time: Time
}

const OpenTime = ({ time }: Props) => {
  moment.locale('en')
  const now = moment([])

  const isOpen = now.isBetween(
    moment(time.open, 'h:mma'),
    moment(time.close, 'h:mma')
  )
  return (
    <>
      <Box display="flex" style={{ color: 'gray' }}>
        <AccessTimeIcon />
        <Typography variant="body1">{`${time.open} - ${time.close}`}</Typography>
      </Box>

      {isOpen ? (
        <Box display="flex" style={{ color: '#6CC942' }}>
          <FiberManualRecordIcon fontSize="small" />
          <Typography variant="body1">Đang mở</Typography>
        </Box>
      ) : (
        <Box display="flex" style={{ color: 'grey' }}>
          <FiberManualRecordIcon fontSize="small" />
          <Typography variant="body1">Đã đóng</Typography>
        </Box>
      )}
    </>
  )
}

export default OpenTime
