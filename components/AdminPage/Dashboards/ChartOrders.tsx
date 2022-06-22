import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  BarController,
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
  BarController,
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

  const totalOrdersByMonthCompleted = totalOrdersByMonth.map((orders) =>
    orders.filter((order) => order.status === 'Confirmed')
  )

  const totalOrdersByMonthProcessing = totalOrdersByMonth.map((orders) =>
    orders.filter((order) => order.status === 'Waiting')
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
        label: 'Số đơn hàng đang chờ',
        data: totalOrdersByMonthProcessing.map((total) => total.length),
        borderColor: 'rgb(0, 255, 127)',
        backgroundColor: 'rgb(0, 255, 127, 0.5)',
        borderWidth: 2,
      },
      {
        type: 'bar' as const,
        label: 'Số đơn hàng đã hoàn thành',
        data: totalOrdersByMonthCompleted.map((total) => total.length),
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
              text: 'SỐ ĐƠN HÀNG THEO THÁNG TRONG NĂM 2022',
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
