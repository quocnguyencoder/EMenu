import { Bill } from '@/models/place'
import { useLayoutEffect, useState } from 'react'
import * as getService from '@/firebase/getDocument'
import ChartOrders from './ChartOrders'
import ChartIncome from './ChartIncome'

interface Props {
  placeID: string
}

const Dashboards: React.FC<Props> = ({ placeID }: Props) => {
  const [orderList, setOrderList] = useState<Bill[]>([])
  const months = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ]

  useLayoutEffect(() => {
    getService.default.getCollection('bill').then((snapShot) => {
      const orders = snapShot.docs.reduce(
        (pre, data) =>
          placeID === (data.data() as Bill).placeID
            ? [...pre, data.data() as Bill]
            : pre,
        [] as Bill[]
      )
      setOrderList(orders)
    })
  }, [])
  return (
    <div style={{ width: '83vw', display: 'flex', gap: '3%' }}>
      <ChartOrders orderList={orderList} months={months} />
      <ChartIncome orderList={orderList} months={months} />
    </div>
  )
}

export default Dashboards
