import { Box, Typography, CardMedia, Button } from '@material-ui/core'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { Maps } from '.'
import { Place } from '../../models/place'
import UpdateProfile from './UpdateProfile'

interface Props {
  place: Place
}

export default function ProfileRestaurant({ place }: Props) {
  const [adminPlace, setAdminPlace] = useState<Place>(place)
  const [status, setStatus] = useState('')
  const [now, setNow] = useState(moment().format('LT'))
  const timer = () => setNow(moment().format('LT'))
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    const clock = setInterval(timer, 1000)
    const checkStatus = () => {
      const open = moment(adminPlace.time.open, 'hh:mmA')
      const close = moment(adminPlace.time.close, 'hh:mmA')
      if (open.isBefore(close)) {
        open.isBefore(moment(now, 'hh:mmA')) &&
        moment(now, 'hh:mmA').isBefore(close)
          ? setStatus('Open')
          : setStatus('Close')
      } else {
        open.isBefore(moment(now, 'hh:mmA')) ||
        moment(now, 'hh:mmA').isBefore(close)
          ? setStatus('Open')
          : setStatus('Close')
      }
    }
    checkStatus()
    return () => clearInterval(clock)
  }, [now])

  return (
    <>
      <Box display="flex" style={{ gap: '3%' }}>
        <Box flex={1}>
          <Typography>Name: {adminPlace.name}</Typography>
          <Typography>
            Address: {adminPlace.address.street}, {adminPlace.address.ward},{' '}
            {adminPlace.address.city}, {adminPlace.address.province}
          </Typography>
          <Typography>Phone: {adminPlace.phone}</Typography>
          <Typography>
            Open Time: {adminPlace.time.open} - {adminPlace.time.close}
          </Typography>
          <Typography>Status: {status}</Typography>
          <Typography>Type: {adminPlace.type}</Typography>
          <CardMedia
            component="img"
            image={`${adminPlace.image}`}
            style={{ objectFit: 'scale-down' }}
          />
          <Button
            variant="outlined"
            size="medium"
            color="secondary"
            onClick={handleOpenModal}
          >
            Edit
          </Button>
        </Box>
        <Box flex={1}>
          <Maps location={adminPlace.location} address={adminPlace.address} />
        </Box>
      </Box>
      {openModal == true && (
        <UpdateProfile
          place={adminPlace}
          openModal={openModal}
          setAdminPlace={setAdminPlace}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  )
}
