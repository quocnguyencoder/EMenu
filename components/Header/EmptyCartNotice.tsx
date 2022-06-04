import React from 'react'
import { Box, Typography } from '@material-ui/core'

import EmptyCart from 'icons/EmptyCart'

const EmptyCartNotice = () => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <EmptyCart />
      </Box>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ textAlign: 'center' }}
      >
        {'Giỏ hàng của bạn đang trống'}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ textAlign: 'center' }}
      >
        {'Thêm vào đây vài món ăn nào!'}
      </Typography>
    </Box>
  )
}

export default EmptyCartNotice
