import {
  Box,
  CardMedia,
  Paper,
  Typography,
  Modal,
  Backdrop,
  Fade,
} from '@material-ui/core'
import { useStyles } from '@/styles/place'
import { Paypal, Cash } from './Payment'
import { Order } from '@/models/place'
import { moneyFormatter } from '@/functions/index'
import * as createService from '@/firebase/createDocument'
import useUser from '@/firebase/useUser'
import * as ROUTES from '@/constants/routes'
import { useRouter } from 'next/router'

interface Props {
  placeID: string
  placeOrders: string[]
  ordersList: Order
  total: number
  openModal: boolean
  handleCloseModal: () => void
}

const ModalPayments = ({
  placeID,
  placeOrders,
  ordersList,
  total,
  openModal,
  handleCloseModal,
}: Props) => {
  const classes = useStyles()
  const { user } = useUser()
  const router = useRouter()
  const items = Object.keys(ordersList)
    .map(Number)
    .map((itemID) => ({ [itemID]: ordersList[itemID] } as Order))

  const handlePayment = (
    items: Order[],
    note: string,
    payment: string,
    status: string,
    userID: string,
    total: number
  ) => {
    createService.default
      .createBillInfo(
        items,
        note,
        payment,
        placeID,
        status,
        userID,
        total,
        placeOrders
      )
      .then(() => {
        router.push(ROUTES.NOTIFY)
      })
  }

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
          <Box
            display="flex"
            flexDirection="column"
            color="green"
            style={{
              alignItems: 'center',
            }}
          >
            <Typography variant="h4">Thanh toán hóa đơn</Typography>
            <Typography variant="h4">{moneyFormatter.format(total)}</Typography>
          </Box>
          <Cash
            userID={user.id}
            items={items}
            total={total}
            handlePayment={handlePayment}
          />
          <Paypal
            userID={user.id}
            items={items}
            total={total}
            handlePayment={handlePayment}
          />

          <Typography variant="body2" style={{ fontWeight: 'bold' }}>
            (*)Vui lòng đưa mã QR cho nhân viên địa điểm
          </Typography>
        </Paper>
      </Fade>
    </Modal>
  )
}

export default ModalPayments