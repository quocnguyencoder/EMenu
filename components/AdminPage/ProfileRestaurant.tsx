import { Box, Typography, CardMedia, Button } from '@material-ui/core'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { Maps } from '.'
import { Place } from '../../models/place'

interface Props {
  place: Place
}

export default function ProfileRestaurant({ place }: Props) {
  const [status, setStatus] = useState('')
  const [now, setNow] = useState(moment().format('LT'))
  const timer = () => setNow(moment().format('LT'))

  useEffect(() => {
    const clock = setInterval(timer, 1000)
    const checkStatus = () => {
      moment(place.time.open, 'hh:mmA').isBefore(moment(now, 'hh:mmA')) &&
      moment(now, 'hh:mmA').isBefore(moment(place.time.close, 'hh:mmA'))
        ? setStatus('Open')
        : setStatus('Close')
    }
    checkStatus()
    return () => clearInterval(clock)
  }, [now])

  return (
    <Box display="flex" style={{ gap: '3%' }}>
      <Box flex={1}>
        <Typography>Name: {place.name}</Typography>
        <Typography>
          Address: {place.address.street}, {place.address.ward},{' '}
          {place.address.city}, {place.address.province}
        </Typography>
        <Typography>Phone: {place.phone}</Typography>
        <Typography>
          Open Time: {place.time.open} - {place.time.close}
        </Typography>
        <Typography>Status: {status}</Typography>
        <Typography>Type: {place.type}</Typography>
        <CardMedia
          component="img"
          image={`${place.image}`}
          style={{ objectFit: 'scale-down' }}
        />
        <Button variant="outlined" size="medium" color="secondary">
          Edit
        </Button>
      </Box>
      <Box flex={1}>
        <Maps location={place.location} address={place.address} />
      </Box>
    </Box>
  )
}
