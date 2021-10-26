import React, { useState } from 'react'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
  Paper,
  Typography,
  ButtonBase,
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { useStyles } from '../../styles/place'
import formatter from '../../functions/moneyFormatter'
import AddBoxIcon from '@material-ui/icons/AddBox'
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox'
import { Order } from '../../models/place'
import ModalQR from './ModalQR'

interface Props {
  ordersList: Order
  addToOrders: (itemID: number) => void
  removeFromOrders: (itemID: number) => void
  clearOrders: () => void
}

const OrdersForm = ({
  ordersList,
  addToOrders,
  removeFromOrders,
  clearOrders,
}: Props) => {
  const classes = useStyles()
  const [openModal, setOpenModal] = useState(false)

  const orderItemsIDArr = Object.keys(ordersList).map(Number)

  const total = orderItemsIDArr.reduce(
    (result, curr) =>
      result + ordersList[curr].price * ordersList[curr].quantity,
    0
  )

  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const handleOpenModal = () => {
    orderItemsIDArr.length === 0
      ? alert('Vui lòng chọn món!')
      : setOpenModal(true)
  }

  return (
    <Box width="25%">
      <Paper className={classes.orderWrapper}>
        <List>
          <ListSubheader>
            <Typography style={{ fontStyle: 'italic' }} variant="subtitle2">
              Món đã chọn
            </Typography>
            <ListItemSecondaryAction>
              <ListItemText
                primary={
                  <ButtonBase
                    onClick={() => clearOrders()}
                    className={classes.orderClearBtn}
                  >
                    <Typography
                      style={{ fontSize: '10px' }}
                      variant="subtitle2"
                    >
                      Xoá
                    </Typography>
                  </ButtonBase>
                }
              />
            </ListItemSecondaryAction>
          </ListSubheader>

          {orderItemsIDArr.length === 0 && (
            <ListItem className={classes.orderEmptyNotice}>
              <Typography variant="subtitle2">
                (*)Thêm món ăn từ menu
              </Typography>
            </ListItem>
          )}

          {orderItemsIDArr.map((itemID) => (
            <ListItem key={`orderItem-${itemID}`}>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    style={{ fontWeight: 700, maxWidth: '80%' }}
                  >
                    {ordersList[itemID].name}
                  </Typography>
                }
                secondary={
                  <Box component={'span'} display="flex">
                    <AddBoxIcon
                      onClick={() => addToOrders(itemID)}
                      style={{ color: 'green', cursor: 'pointer' }}
                    />
                    <Typography
                      component={'span'}
                      variant="body1"
                      style={{ fontWeight: 700, color: 'black' }}
                    >
                      {ordersList[itemID].quantity}
                    </Typography>
                    <IndeterminateCheckBoxIcon
                      onClick={() => removeFromOrders(itemID)}
                      style={{ color: 'red', cursor: 'pointer' }}
                    />
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      {formatter.format(
                        ordersList[itemID].price * ordersList[itemID].quantity
                      )}
                    </Typography>
                  }
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}

          {/* Total */}
          <ListItem style={{ backgroundColor: '#f2f2f2' }}>
            <ListItemText
              primary={<Typography variant="body2">Tổng cộng</Typography>}
            />
            <ListItemSecondaryAction>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    style={{
                      fontWeight: 700,
                      color: '#58B1E1',
                    }}
                  >
                    {formatter.format(total)}
                  </Typography>
                }
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <Button
          className={classes.orderSubmitBtn}
          onClick={() => handleOpenModal()}
        >
          <CheckCircleIcon fontSize="small" />
          <Typography variant="body2">Gọi món</Typography>
        </Button>

        <ModalQR
          ordersList={ordersList}
          openModal={openModal}
          handleCloseModal={handleCloseModal}
        />
      </Paper>
    </Box>
  )
}

export default React.memo(OrdersForm)
