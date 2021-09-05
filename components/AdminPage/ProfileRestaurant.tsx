import { Box, Typography, CardMedia, Button } from '@material-ui/core'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { prefix } from '../../constants'

interface Props {
  owner: string | null
  name: string | null
  address: string | null
  coordinates: {
    lat: number | null
    lng: number | null
  }
  openTime: string | null
  closeTime: string | null
}

export default function ProfileRestaurant() {
  const [status, setStatus] = useState('')
  const [now, setNow] = useState(moment().format('LT'))
  const timer = () => setNow(moment().format('LT'))

  useEffect(() => {
    const clock = setInterval(timer, 1000)
    const checkStatus = () => {
      moment(place.openTime, 'hh:mmA').isBefore(moment(now, 'hh:mmA')) &&
      moment(now, 'hh:mmA').isBefore(moment(place.closeTime, 'hh:mmA'))
        ? setStatus('Open')
        : setStatus('Close')
    }
    checkStatus()
    return () => clearInterval(clock)
  }, [now])

  return (
    <Box display="flex">
      <Box flex={1}>
        <Typography>Name: {place.name}</Typography>
        <Typography>Address: {place.address}</Typography>
        <Typography>
          Open Time: {place.openTime} - {place.closeTime}
        </Typography>
        <Typography>Status: {status}</Typography>
        <Button variant="outlined" size="medium" color="secondary">
          Edit
        </Button>
      </Box>
      <Box flex={2}>
        <CardMedia
          component="img"
          image={`${prefix}/chicken.jpg`}
          style={{ objectFit: 'scale-down' }}
        />
      </Box>
    </Box>
  )
}

const place: Props = {
  owner: '1',
  name: 'a',
  address: '1 vo van ngan',
  coordinates: {
    lat: 21.027763,
    lng: 105.83416,
  },
  openTime: '08:00 AM',
  closeTime: '09:00 PM',
}
