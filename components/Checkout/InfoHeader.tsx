import {
  Box,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core'
import React from 'react'
import StorefrontIcon from '@material-ui/icons/Storefront'

const InfoHeader = () => {
  return (
    <Paper variant="outlined" style={{ marginBottom: '1rem' }}>
      <Typography
        variant="h5"
        style={{ fontWeight: 'bold', textAlign: 'center', paddingTop: '1rem' }}
      >
        Thông tin đơn hàng
      </Typography>
      <ListItem component="span">
        <ListItemText
          style={{ width: '40%' }}
          primary={
            <Box display="flex" alignItems="center" style={{ gap: '0.5rem' }}>
              <StorefrontIcon fontSize="large" />
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                Địa điểm
              </Typography>
            </Box>
          }
        />
        <ListItemText primary="Quan an gia dinh" />
      </ListItem>
    </Paper>
  )
}

export default InfoHeader
