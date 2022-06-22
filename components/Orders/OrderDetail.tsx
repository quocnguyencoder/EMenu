import React from 'react'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { Order } from '@/models/place'
import formatter from '@/functions/moneyFormatter'

interface Props {
  orderItems: Order[]
  total: number
}

const OrderDetail = ({ orderItems, total }: Props) => {
  return (
    <>
      <Divider />
      <Box display="flex" alignItems="center" p={2}>
        <ShoppingCartOutlinedIcon />
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          Chi tiết đơn hàng
        </Typography>
      </Box>
      <Box>
        {orderItems.map((item, index) => {
          const itemInfo = item[Object.keys(item).map(Number)[0]]
          return (
            <React.Fragment key={`order-item-${index}`}>
              <ListItem component="span">
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={itemInfo.image}
                    alt={itemInfo.name}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={itemInfo.name}
                  secondary={formatter.format(itemInfo.price)}
                />
                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  x{itemInfo.quantity}
                </Typography>
              </ListItem>
              <Divider />
            </React.Fragment>
          )
        })}
        <ListItem component="span">
          <ListItemText
            primary={
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                Tổng cộng
              </Typography>
            }
          />
          <Typography
            variant="h6"
            color="primary"
            style={{ fontWeight: 'bold' }}
          >
            {formatter.format(total)}
          </Typography>
        </ListItem>
      </Box>
    </>
  )
}

export default OrderDetail
