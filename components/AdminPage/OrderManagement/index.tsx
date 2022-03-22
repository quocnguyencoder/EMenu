import { Bill, Place } from '@/models/place'
import { useEffect, useState } from 'react'
import firebase from 'firebase/app'
interface Props {
  place: Place
}

const OrderManagement = ({ place }: Props) => {
  const [orders, setOrders] = useState<Bill[]>()

  useEffect(() => {
    firebase
      .firestore()
      .collection('bill')
      .onSnapshot((snapshot) => {
        const orders_data = snapshot.docs.map((doc) => {
          const order = doc.data() as Bill
          order.billID = doc.id
          return order
        })
        setOrders(orders_data.filter((order) => order.placeID == place.id))
      })
  }, [])

  return orders !== undefined ? (
    <div>
      {orders.map((order) => (
        <p key={`${order.billID}`}>{order.billID}</p>
      ))}
    </div>
  ) : (
    <></>
  )
}

export default OrderManagement
