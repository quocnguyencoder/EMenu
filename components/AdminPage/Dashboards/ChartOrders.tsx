import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { Bill } from '@/models/place'
import { Paper } from '@material-ui/core'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title
)

interface Props {
  orderList: Bill[]
  months: string[]
}

const ChartOrders: React.FC<Props> = ({ orderList, months }: Props) => {
  const totalOrdersByMonth = months.map((month) =>
    orderList.filter(
      (orderList) =>
        new Date(month).getMonth() === new Date(orderList.datetime).getMonth()
    )
  )

  const totalOrdersByMonthPayByCash = totalOrdersByMonth.map((orders) =>
    orders.filter((order) => order.payment === 'Cash')
  )

  const totalOrdersByMonthPayByPaypal = totalOrdersByMonth.map((orders) =>
    orders.filter((order) => order.payment === 'Paypal')
  )

  const totalOrdersDestroyedByMonth = totalOrdersByMonth.map((orders) =>
    orders.filter((order) => order.status === 'Deleted')
  )

  const data = {
    labels: months,
    datasets: [
      {
        type: 'line' as const,
        label: 'Tổng số đơn hàng',
        data: totalOrdersByMonth.map((total) => total.length),
        borderColor: 'rgb(255, 165, 0)',
        backgroundColor: 'rgb(255, 165, 0, 0.5)',
        borderWidth: 2,
      },
      {
        type: 'bar' as const,
        label: 'Số đơn trả bằng tiền mặt',
        data: totalOrdersByMonthPayByCash.map((total) => total.length),
        borderColor: 'rgb(0, 255, 127)',
        backgroundColor: 'rgb(0, 255, 127, 0.5)',
        borderWidth: 2,
      },
      {
        type: 'bar' as const,
        label: 'Số đơn trả bằng paypal',
        data: totalOrdersByMonthPayByPaypal.map((total) => total.length),
        borderColor: 'rgb(0, 191, 255)',
        backgroundColor: 'rgb(0, 191, 255, 0.5)',
        borderWidth: 2,
      },
      {
        type: 'bar' as const,
        label: 'Số đơn bị hủy',
        data: totalOrdersDestroyedByMonth.map((total) => total.length),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(255, 182, 193)',
        borderWidth: 2,
      },
    ],
  }

  return (
    <Paper style={{ width: '45%', marginLeft: '1%', flex: '1' }}>
      <Chart
        type="bar"
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'SỐ ĐƠN HÀNG THEO THÁNG',
              position: 'bottom',
              color: '#D14B28',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </Paper>
  )
}

export default ChartOrders
