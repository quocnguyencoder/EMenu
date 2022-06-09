import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core'
import React from 'react'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import { Cart } from '@/models/cart'
import { Place } from '@/models/place'
import formatter from '@/functions/moneyFormatter'

interface Props {
  cartInfo: Cart
  placeInfo: Place
  totalPayment: number
}

const OrderDetail = ({ cartInfo, placeInfo, totalPayment }: Props) => {
  return (
    <Paper variant="outlined" style={{ marginBottom: '1rem' }}>
      <Box display="flex" alignItems="center" p={1}>
        <ShoppingCartOutlinedIcon />
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          Chi tiết đơn hàng
        </Typography>
      </Box>
      <Box>
        {cartInfo &&
          placeInfo &&
          Object.keys(cartInfo.items)
            .map(Number)
            .map((itemID) => (
              <React.Fragment key={itemID}>
                <ListItem component="span">
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={placeInfo.menu[itemID].image}
                      alt={placeInfo.menu[itemID].name}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={placeInfo.menu[itemID].name}
                    secondary={formatter.format(placeInfo.menu[itemID].price)}
                  />
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    x{cartInfo.items[itemID].quantity}
                  </Typography>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}

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
            {formatter.format(totalPayment)}
          </Typography>
        </ListItem>
      </Box>
    </Paper>
  )
}

export default OrderDetail
