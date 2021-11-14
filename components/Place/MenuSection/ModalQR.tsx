import React from 'react'
import {
  Box,
  CardMedia,
  Paper,
  Typography,
  Modal,
  Backdrop,
  Fade,
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import QRCode from 'react-qr-code'
import { Order } from '@/models/place'
import { useStyles } from '../../../styles/place'

interface Props {
  ordersList: Order
  openModal: boolean
  handleCloseModal: () => void
}

const ModalQR = ({ ordersList, openModal, handleCloseModal }: Props) => {
  const classes = useStyles()

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Fade in={openModal}>
        <Paper className={classes.QRNoticeWrapper}>
          <Box>
            <CardMedia
              component="img"
              image={`/logo.png`}
              title="logo"
              height="70"
            />
          </Box>
          <Box display="flex" color="green">
            <CheckCircleIcon fontSize="large" />
            <Typography variant="h4">Gọi món thành công</Typography>
          </Box>
          <QRCode value={JSON.stringify(ordersList)} />
          <Typography variant="body2" style={{ fontWeight: 'bold' }}>
            (*)Vui lòng đưa mã QR cho nhân viên địa điểm
          </Typography>
        </Paper>
      </Fade>
    </Modal>
  )
}

export default ModalQR
