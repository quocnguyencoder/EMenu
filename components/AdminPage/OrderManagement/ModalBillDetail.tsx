import { useStyles } from '@/styles/modal'
import {
  Box,
  Modal,
  Fade,
  Backdrop,
  Typography,
  Button,
} from '@material-ui/core'
import { BillDetail } from '@/models/place'
import moneyFormatter from '@/functions/moneyFormatter'
import moment from 'moment'
import ItemOrderedList from './ItemOrderedList'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import * as updateService from '@/firebase/updateDocument'
import * as deleteService from '@/firebase/deleteDocument'

interface Props {
  placeID: string
  infoModal: {
    open: boolean
    orderDetail: BillDetail
  }
  handleCloseModal: () => void
}

const ModalBillDetail: React.FC<Props> = ({
  placeID,
  infoModal,
  handleCloseModal,
}: Props) => {
  const classes = useStyles()
  const handleConfirm = () => {
    updateService.default.verifyOrder(
      placeID,
      infoModal.orderDetail.billID,
      'Confirmed'
    )
    handleCloseModal()
  }

  const handleDelete = () => {
    deleteService.default.deleteUserOrder(placeID, infoModal.orderDetail.billID)
    handleCloseModal()
  }

  return (
    <Modal
      className={classes.modal}
      open={infoModal.open}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={infoModal.open}>
        <Box className={classes.paper}>
          <Typography>ID hóa đơn: {infoModal.orderDetail.billID}</Typography>
          <Typography>Tên người mua {infoModal.orderDetail.billID}</Typography>
          <Typography>
            Ngày đặt hàng:{' '}
            {moment(infoModal.orderDetail.datetime).format(
              'DD-MM-YYYY hh:mm A'
            )}
          </Typography>
          <Typography>Lưu ý: {infoModal.orderDetail.note}</Typography>
          <Typography>Danh sách món ăn</Typography>
          <ItemOrderedList itemList={infoModal.orderDetail.items} />
          <Typography>
            Thành tiền: {moneyFormatter.format(infoModal.orderDetail.total)}
          </Typography>
          <Box display="flex" style={{ textAlign: 'center' }}>
            <Button
              onClick={handleConfirm}
              size="large"
              color="primary"
              style={{
                margin: '0 3% 0 3%',
                flex: '1',
                background: 'linear-gradient(315deg, #20bf55 0%, #01baef 74%)',
                color: 'white',
              }}
              startIcon={<DoneIcon />}
            >
              Nhận đơn hàng
            </Button>
            <Button
              onClick={handleDelete}
              size="large"
              color="primary"
              style={{
                margin: '0 3% 0 3%',
                flex: '1',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                color: 'white',
              }}
              startIcon={<DeleteIcon />}
            >
              Hủy đơn hàng
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ModalBillDetail
