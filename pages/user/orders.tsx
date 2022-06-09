import React, { useEffect, useState } from 'react'
import isEqual from 'lodash/isEqual'
import router from 'next/router'
import * as ROUTES from '@/constants/routes'
import useUser from '@/firebase/useUser'
import { Bill, Place } from '@/models/place'
import { getGetAllUserOrders } from '@/services/bill'
import { getPlacesByIDList } from '@/services/place'
import { Box, Container, Typography } from '@material-ui/core'

import OrderItem from '@/components/Orders/OrderItem'

const Orders = () => {
  const { user } = useUser()
  const [orders, setOrders] = useState<Bill[]>([])
  const [places, setPlaces] = useState<Place[]>([])
  const [pageStatus, setPageStatus] = useState('isLoading')

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}')
    if (isEqual(userInfo, {})) {
      router.push(ROUTES.LOGIN)
    }
    if (user && user.id && user.id !== '') {
      getGetAllUserOrders(user.id).then((orders_data) => {
        const placeIDs = orders_data.map((place) => place.placeID)
        getPlacesByIDList(placeIDs).then((places_data) => {
          setOrders(orders_data)
          setPlaces(places_data)
          setPageStatus('loaded')
        })
      })
    }
  }, [user.id])

  return (
    <Container
      maxWidth="md"
      style={{ paddingTop: '2rem', minWidth: '70vw', minHeight: '75vh' }}
    >
      <Typography variant="h4" style={{ fontWeight: 'bold' }}>
        Đơn hàng
      </Typography>
      {pageStatus === 'loaded' && orders.length !== 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          width="100%"
          style={{ gap: '1rem' }}
        >
          {orders.map((order) => {
            const placeInfo = places.filter(
              (place) => place.id === order.placeID
            )[0]

            return (
              placeInfo && (
                <OrderItem
                  key={order.billID}
                  order={order}
                  placeInfo={placeInfo}
                />
              )
            )
          })}
        </Box>
      ) : (
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          Bạn chưa có đơn hàng nào
        </Typography>
      )}
    </Container>
  )
}

export default Orders
