import { Button, Container, Typography } from '@material-ui/core'
import InfoHeader from '@/components/Checkout/InfoHeader'
import DeliveryInfo from '@/components/Checkout/DeliveryInfo'
import OrderDetail from '@/components/Checkout/OrderDetail'
import { useEffect, useState } from 'react'
import useUser from '@/firebase/useUser'
import router from 'next/router'
import * as ROUTES from '@/constants/routes'
import isEqual from 'lodash/isEqual'
import { Cart } from '@/models/cart'
import { Order, Place } from '@/models/place'
import firebase from 'firebase/app'
import { getPlaceDetail } from '@/services/getData'
import Cash from '@/components/Checkout/Cash'
import Paypal from '@/components/Checkout/Paypal'
import Crypto from '@/components/Checkout/Crypto'
import * as createService from '@/firebase/createDocument'
import { clearCart } from '@/services/cart'
import { NextSeo } from 'next-seo'

const Checkout = () => {
  const [address, setAddress] = useState('Tại quán')
  const [phone, setPhone] = useState('')
  const { user } = useUser()
  const [cartInfo, setCartInfo] = useState<Cart>()
  const [placeInfo, setPlaceInfo] = useState<Place>()

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}')
    if (isEqual(userInfo, {})) {
      router.push(ROUTES.LOGIN)
    }
  }, [])

  useEffect(() => {
    let unsubscribe: () => void
    if (user.id && user.id !== '') {
      unsubscribe = firebase
        .firestore()
        .collection('cart')
        .doc(user.id)
        .onSnapshot((snapshot) => {
          if (snapshot.exists) {
            const data = snapshot.data() as Cart
            setCartInfo(data)
          }
        })
    }
    return () => unsubscribe && unsubscribe()
  }, [user.id])

  useEffect(() => {
    cartInfo &&
      cartInfo.placeID !== '' &&
      getPlaceDetail(cartInfo.placeID).then((data) => setPlaceInfo(data))
  }, [cartInfo])

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

  const toOrder = () => {
    const order = {} as Order
    cartInfo &&
      placeInfo &&
      Object.keys(cartInfo.items)
        .map(Number)
        .map((itemID) => {
          order[itemID] = {
            name: placeInfo.menu[itemID].name,
            price: placeInfo.menu[itemID].price,
            quantity: cartInfo.items[itemID].quantity,
            discount: placeInfo.menu[itemID].discount,
            image: placeInfo.menu[itemID].image,
          }
        })
    return order
  }
  const ordersList = toOrder()
  const items = Object.keys(ordersList)
    .map(Number)
    .map((itemID) => ({ [itemID]: ordersList[itemID] } as Order))

  const handlePayment = (
    items: Order[],
    note: string,
    payment: string,
    status: string,
    userID: string,
    total: number
  ) => {
    placeInfo &&
      createService.default
        .createBillInfo(
          items,
          note,
          payment,
          placeInfo.id,
          status,
          userID,
          total,
          address,
          phone,
          placeInfo.order
        )
        .then(() => {
          clearCart(userID)
          alert('Thanh toán thành công!')
          router.push(ROUTES.USER_ORDERS)
        })
  }

  const showPaymentButtons = phone !== '' && address !== ''

  return placeInfo && cartInfo ? (
    <Container maxWidth="sm" style={{ paddingTop: '2rem' }}>
      <NextSeo
        title={'Thanh toán đơn hàng của bạn'}
        description="Trang thanh toán của EMenu"
        openGraph={{
          type: 'website',
          url: 'https://emenu-green.vercel.app/',
          title: 'EMenu - Mọi địa điểm trong một Menu',
          description: 'Các địa điểm ăn uống nổi bật',
          images: [
            {
              url: 'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/emenu%2Flogo.png?alt=media&token=7d77c9ca-efa5-41be-8070-7d28a9999938',
              alt: 'EMenu logo',
            },
          ],
        }}
      />
      {cartInfo.placeID !== '' ? (
        <>
          <InfoHeader placeInfo={placeInfo} />
          <DeliveryInfo
            address={address}
            setAddress={setAddress}
            phone={phone}
            setPhone={setPhone}
            userName={user.name}
          />
          <OrderDetail
            cartInfo={cartInfo}
            placeInfo={placeInfo}
            totalPayment={totalPayment}
          />

          {showPaymentButtons ? (
            <>
              <Cash
                userID={user.id}
                items={items}
                total={totalPayment}
                handlePayment={handlePayment}
              />
              <Crypto
                userID={user.id}
                items={items}
                total={totalPayment}
                handlePayment={handlePayment}
              />
              <Paypal
                userID={user.id}
                items={items}
                total={totalPayment}
                handlePayment={handlePayment}
              />
            </>
          ) : (
            <Button
              variant="contained"
              disabled
              style={{
                color: '#FFFFFF',
                backgroundColor: 'red',
                width: '100%',
                height: '3.3rem',
                marginBottom: '1rem',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              Vui lòng nhập địa chỉ và số điện thoại
            </Button>
          )}
        </>
      ) : (
        <>
          <Typography style={{ margin: '2rem 0' }} variant="h5">
            Không có thông tin giỏ hàng
          </Typography>
          <Button
            onClick={() => router.push('/')}
            variant="contained"
            color="primary"
          >
            Về trang chủ
          </Button>
        </>
      )}
    </Container>
  ) : (
    <Container
      maxWidth="sm"
      style={{
        paddingTop: '2rem',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography style={{ margin: '2rem 0' }} variant="h5">
        Không có thông tin giỏ hàng
      </Typography>
      <Button
        onClick={() => router.push('/')}
        variant="contained"
        color="primary"
      >
        Về trang chủ
      </Button>
    </Container>
  )
}

export default Checkout
