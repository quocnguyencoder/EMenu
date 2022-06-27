import { Place, BillDetail } from '@/models/place'
import React, { useEffect, useState } from 'react'
import * as getService from '@/firebase/getDocument'
import RatingStatistic from './RatingStatistic'
import RatingTable from './RatingTable'
import getDatesInRange from '@/functions/getDatesInRange'
import moment from 'moment'
import dayjs from 'dayjs'
import firebase from 'firebase/app'

interface RatedOrderProps {
  place: Place
}
const RatedOrder: React.FC<RatedOrderProps> = ({ place }: RatedOrderProps) => {
  const [date, setDate] = useState<string>(moment().format('DD-MM-yyyy'))
  const startDate = moment(
    new Date(dayjs().startOf('month').format('YYYY-MM-DD'))
  ).format('L')
  const endDate = moment(
    new Date(dayjs().endOf('month').format('YYYY-MM-DD'))
  ).format('L')

  const dateOfMonth = getDatesInRange(startDate, endDate)
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDate(event.target.value as string)
  }

  const [orderList, setOrderList] = useState<BillDetail[]>([])

  useEffect(() => {
    firebase
      .firestore()
      .collection('bill')
      .onSnapshot((snapshot) => {
        const orders_data = snapshot.docs.map(async (doc) => {
          const order = doc.data() as BillDetail
          order.billID = doc.id
          order.buyerName = await getService.default
            .getUserInfo(order.userID)
            .then((user) => user.name)
          return order
        })
        Promise.all(orders_data).then((billDetailList) => {
          setOrderList(
            billDetailList.filter(
              (billDetail) => billDetail.placeID === place.id
            )
          )
        })
      })
  }, [])

  return (
    <>
      <RatingStatistic
        orderList={orderList}
        date={date}
        handleChange={handleChange}
        dateOfMonth={dateOfMonth}
      />
      <RatingTable
        orderList={orderList.filter(
          (order) => moment(order.datetime).format('DD-MM-yyyy') === date
        )}
      />
    </>
  )
}

export default RatedOrder
