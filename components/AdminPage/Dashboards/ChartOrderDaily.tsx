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
import moment from 'moment'

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
}

const ChartOrderDaily = ({ orderList }: Props) => {
  const orderInDate = orderList.filter(
    (order) => moment(order.datetime).format('ll') === moment().format('ll')
  )

  const orderConfirmed = orderInDate.filter(
    (order) => order.status === 'Confirmed'
  )

  const orderWaiting = orderInDate.filter((order) => order.status === 'Waiting')

  const orderDeleted = orderInDate.filter((order) => order.status === 'Deleted')

  const data = {
    labels: ['Đang chờ', 'Hoàn thành', 'Đã hủy'],
    datasets: [
      {
        type: 'bar' as const,
        data: [orderWaiting.length, orderConfirmed.length, orderDeleted.length],
        borderColor: [
          'rgb(0, 255, 127)',
          'rgb(0, 191, 255)',
          'rgb(255, 99, 132)',
        ],
        backgroundColor: [
          'rgb(0, 255, 127, 0.5)',
          'rgb(0, 191, 255, 0.5)',
          'rgb(255, 182, 193)',
        ],
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
              text: `TÌNH TRẠNG ĐƠN HÀNG NGÀY ${moment().format('DD-MM-YYYY')}`,
              position: 'top',
              color: '#D14B28',
            },
            legend: {
              display: false,
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

export default ChartOrderDaily
