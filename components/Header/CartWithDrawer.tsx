import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from '@material-ui/core'
import { useState } from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import CloseIcon from '@material-ui/icons/Close'

import { useStyles } from '@/styles/cart'
import CartItem from './CartItem'
import CartInfo from './CartInfo'
import EmptyCartNotice from './EmptyCartNotice'
import formatter from '@/functions/moneyFormatter'

const CartWithDrawer = () => {
  const classes = useStyles()
  const [drawerState, toggleDrawer] = useState(false)
  const emptyCart = false

  const handleCloseDrawer = () => {
    toggleDrawer(false)
  }
  return (
    <>
      <Button
        className={classes.cartIconButton}
        onClick={() => toggleDrawer(true)}
      >
        <ShoppingCartIcon style={{ marginRight: '0.5rem' }} />
        <Typography style={{ fontWeight: 'bold' }}>0</Typography>
      </Button>
      <Drawer
        variant="persistent"
        open={drawerState}
        onClose={handleCloseDrawer}
        anchor="right"
      >
        <Box className={classes.responsiveDrawer} p={2}>
          <IconButton style={{ padding: 0 }} onClick={handleCloseDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        {emptyCart && <EmptyCartNotice />}
        <Box display="flex" flexDirection="column" p={2}>
          <CartInfo />
          <Button className={classes.checkoutButton}>
            <Typography
              style={{ fontWeight: 'bold', textTransform: 'none' }}
            >{`Thanh toán`}</Typography>
            <Typography style={{ fontWeight: 'bold' }}>{`${formatter.format(
              12000
            )}`}</Typography>
          </Button>
          <Divider component="span" />
          <CartItem />
        </Box>
      </Drawer>
    </>
  )
}

export default CartWithDrawer
