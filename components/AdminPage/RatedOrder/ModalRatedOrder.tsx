import React from 'react'
import { useStyles } from '@/styles/modal'
import { Box, Modal, Fade, Backdrop, Typography } from '@material-ui/core'
import { BillDetail } from '@/models/place'
import moment from 'moment'
import ItemOrderedList from '../OrderManagement/ItemOrderedList'
import moneyFormatter from '@/functions/moneyFormatter'

interface Props {
  infoModal: {
    open: boolean
    orderDetail: BillDetail
  }
  handleCloseModal: () => void
}
const ModalRatedOrder: React.FC<Props> = ({
  infoModal,
  handleCloseModal,
}: Props) => {
  const classes = useStyles()
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
          <Typography>
            Tên người mua: {infoModal.orderDetail.buyerName}
          </Typography>
          <Typography>Địa chỉ: {infoModal.orderDetail.deliveryTo}</Typography>
          <Typography>Số điện thoại: {infoModal.orderDetail.phone}</Typography>
          <Typography>
            Ngày đặt hàng:{' '}
            {moment(infoModal.orderDetail.datetime).format(
              'DD-MM-YYYY hh:mm A'
            )}
          </Typography>
          <Typography>
            Tình trạng:{' '}
            {infoModal.orderDetail.status === 'Deleted'
              ? 'Đã bị xóa'
              : infoModal.orderDetail.status === 'Confirmed'
              ? 'Đã nhận hàng'
              : 'Đang chờ xác nhạna'}
          </Typography>
          <Typography>
            Số sao được đánh giá: {infoModal.orderDetail.feedback.rating}
          </Typography>
          <Typography>
            Nội dung đánh giá: {infoModal.orderDetail.feedback.content}
          </Typography>
          <Typography>Danh sách món ăn</Typography>
          <ItemOrderedList itemList={infoModal.orderDetail.items} />
          <Typography>
            Thành tiền: {moneyFormatter.format(infoModal.orderDetail.total)}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ModalRatedOrder
