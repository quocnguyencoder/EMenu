import { Place, Bill } from '@/models/place'
import { useLayoutEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import * as getService from '@/firebase/getDocument'
import ChartOrders from './ChartOrders'
import ChartIncome from './ChartIncome'
import AvgRating from './AvgRating'
import NumberOfReviews from './NumberOfReviews'
import Revenue from './Revenue'
import TotalRevenue from './TotalRevenue'
import BestSellingProduct from './BestSellingProduct'

interface Props {
  place: Place
}

const Dashboards: React.FC<Props> = ({ place }: Props) => {
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
          place.id === (data.data() as Bill).placeID
            ? [...pre, data.data() as Bill]
            : pre,
        [] as Bill[]
      )
      setOrderList(orders)
    })
  }, [])
  return (
    <Box style={{ width: '83vw' }}>
      <Box display="flex" style={{ gap: '3%' }}>
        <AvgRating ratings={place.rating} />
        <NumberOfReviews ratings={place.reviews} />
        <Revenue orderList={orderList} months={months} />
        <TotalRevenue orderList={orderList} />
      </Box>
      <Box display="flex" style={{ gap: '3%' }}>
        <ChartOrders orderList={orderList} months={months} />
        <ChartIncome orderList={orderList} months={months} />
      </Box>
      <BestSellingProduct
        orderList={orderList.filter((order) => order.status === 'Confirmed')}
      />
    </Box>
  )
}

export default Dashboards
