import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import CloseIcon from '@material-ui/icons/Close'
import { useStyles } from '@/styles/cart'
import CartListItem from './CartListItem'
import CartInfo from './CartInfo'
import EmptyCartNotice from './EmptyCartNotice'
import formatter from '@/functions/moneyFormatter'
import { Place } from '@/models/place'
import firebase from 'firebase/app'
import { Cart } from '@/models/cart'
import { getPlaceDetail } from '@/services/getData'
import router from 'next/router'
import * as ROUTES from '@/constants/routes'

interface Props {
  userID: string
}

const CartWithDrawer = ({ userID }: Props) => {
  const classes = useStyles()
  const [drawerState, toggleDrawer] = useState(false)
  const [cartInfo, setCartInfo] = useState<Cart>()
  const [placeInfo, setPlaceInfo] = useState<Place>()

  const cartRef = firebase.firestore().collection('cart').doc(userID)

  const emptyCart = cartInfo && cartInfo.placeID === ''

  const handleCloseDrawer = () => {
    toggleDrawer(false)
  }

  const createCart = () => {
    cartRef.set({ placeID: '', items: {} })
  }

  useEffect(() => {
    const unsubscribe = cartRef.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data() as Cart
        setCartInfo(data)
      } else {
        createCart()
      }
    })
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])

  useEffect(() => {
    cartInfo &&
      cartInfo.placeID !== '' &&
      getPlaceDetail(cartInfo.placeID).then((data) => setPlaceInfo(data))
  }, [cartInfo])

  const totalCartItem = cartInfo
    ? Object.keys(cartInfo.items).reduce((total, itemID) => {
        return total + cartInfo.items[Number(itemID)].quantity
      }, 0)
    : 0

  const totalPayment =
    cartInfo && placeInfo
      ? Object.keys(cartInfo.items)
          .map(Number)
          .reduce((total, itemID) => {
            const quantity = cartInfo.items[itemID].quantity
            const price = placeInfo.menu[itemID].price
            const discount = placeInfo.menu[itemID].discount

            return total + price * quantity - discount
          }, 0)
      : 0

  const increaseItem = (itemID: number) => {
    cartInfo &&
      cartRef.update({
        [`items.${itemID}.quantity`]: cartInfo.items[itemID].quantity + 1,
      })
  }
  const decreaseItem = (itemID: number) => {
    cartInfo &&
      cartRef.update({
        [`items.${itemID}.quantity`]: cartInfo.items[itemID].quantity - 1,
      })
  }

  const clearCart = () => {
    cartRef.update({ placeID: '', items: {} })
  }

  const deleteItem = (itemID: number) => {
    if (cartInfo) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [itemID]: omit, ...res } = cartInfo.items
      if (Object.keys(res).length === 0) {
        clearCart()
      } else {
        cartRef.update({
          items: res,
        })
      }
    }
  }

  return (
    <>
      <Button
        className={classes.cartIconButton}
        onClick={() => toggleDrawer(true)}
      >
        <ShoppingCartIcon style={{ marginRight: '0.5rem' }} />
        <Typography style={{ fontWeight: 'bold' }}>{totalCartItem}</Typography>
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
        {emptyCart ? (
          <EmptyCartNotice />
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            p={2}
            className={classes.responsiveDrawer}
          >
            {placeInfo && (
              <CartInfo
                placeInfo={placeInfo}
                handleCloseDrawer={handleCloseDrawer}
              />
            )}
            <Button
              onClick={() => {
                router.push(ROUTES.CHECKOUT)
                handleCloseDrawer()
              }}
              className={classes.checkoutButton}
            >
              <Typography
                style={{ fontWeight: 'bold', textTransform: 'none' }}
              >{`Thanh toán`}</Typography>
              <Typography style={{ fontWeight: 'bold' }}>{`${formatter.format(
                totalPayment
              )}`}</Typography>
            </Button>
            <Divider component="span" />
            {cartInfo &&
              placeInfo &&
              Object.keys(cartInfo.items)
                .map(Number)
                .map((itemID) => (
                  <CartListItem
                    key={`cart-item-${itemID}`}
                    menuItem={placeInfo.menu[itemID]}
                    cartItem={cartInfo.items[itemID]}
                    itemID={itemID}
                    increaseItem={increaseItem}
                    decreaseItem={decreaseItem}
                    deleteItem={deleteItem}
                  />
                ))}
          </Box>
        )}
      </Drawer>
    </>
  )
}

export default CartWithDrawer
