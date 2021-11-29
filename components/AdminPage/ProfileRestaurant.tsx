import { Box, Typography, CardMedia, Button } from '@material-ui/core'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { Maps } from '.'
import { Place } from '../../models/place'
import UpdateProfile from './UpdateProfile'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

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
          ? setStatus('Đang mở')
          : setStatus('Đã đóng')
      } else {
        open.isBefore(moment(now, 'hh:mmA')) ||
        moment(now, 'hh:mmA').isBefore(close)
          ? setStatus('Đang mở')
          : setStatus('Đã đóng')
      }
    }
    checkStatus()
    return () => clearInterval(clock)
  }, [now])

  return (
    <>
      <Box display="flex" style={{ gap: '3%' }}>
        <Box flex={1}>
          <Typography>Tên địa điểm: {adminPlace.name}</Typography>
          <Typography>
            Địa chỉ: {adminPlace.address.street}, {adminPlace.address.ward},{' '}
            {adminPlace.address.city}, {adminPlace.address.province}
          </Typography>
          <Typography>Số điện thoại: {adminPlace.phone}</Typography>
          <Typography>
            Thời gian hoạt động: {adminPlace.time.open} -{' '}
            {adminPlace.time.close}
          </Typography>
          <Box display="flex">
            <Typography>Trạng thái:</Typography>
            <Box
              display="flex"
              style={{ color: status === 'Đang mở' ? '#6CC942' : 'grey' }}
            >
              <FiberManualRecordIcon fontSize="small" />
              <Typography variant="body1">{status}</Typography>
            </Box>
          </Box>
          <Typography>Loại hình kinh doanh: {adminPlace.type}</Typography>
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
            Chỉnh sửa thông tin
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
