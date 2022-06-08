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

const OrderDetail = () => {
  return (
    <Paper variant="outlined" style={{ marginBottom: '1rem' }}>
      <Box display="flex" alignItems="center" p={1}>
        <ShoppingCartOutlinedIcon />
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          Chi tiết đơn hàng
        </Typography>
      </Box>
      <Box>
        <ListItem component="span">
          <ListItemAvatar>
            <Avatar variant="square" src="https://" alt="Q" />
          </ListItemAvatar>
          <ListItemText primary="Ten mon" secondary="12000" />
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            x1
          </Typography>
        </ListItem>

        <Divider />
        <ListItem component="span">
          <ListItemText primary="Tổng cộng" />
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            12000
          </Typography>
        </ListItem>
      </Box>
    </Paper>
  )
}

export default OrderDetail
