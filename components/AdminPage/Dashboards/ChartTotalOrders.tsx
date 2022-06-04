import { Bill } from '@/models/place'
import { Paper } from '@material-ui/core'
import {
  ArcElement,
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  DoughnutController,
  LineElement,
  Legend,
  Tooltip,
  Title,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  DoughnutController,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title
)

interface Props {
  orderList: Bill[]
}

const ChartTotalOrders = ({ orderList }: Props) => {
  const totalCompleted = orderList.reduce(
    (total, curr) => (curr.status === 'Confirmed' ? total + 1 : total),
    0
  )
  const totalDeleted = orderList.reduce(
    (total, curr) => (curr.status === 'Deleted' ? total + 1 : total),
    0
  )
  const data = {
    labels: ['Số đơn đã hoàn thành', 'Số đơn đã hủy'],
    datasets: [
      {
        data: [totalCompleted, totalDeleted],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
        hoverOffset: 4,
      },
    ],
  }
  return (
    <Paper style={{ width: '30%', margin: '1%' }}>
      <Chart
        type="doughnut"
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'TỔNG SỐ TÌNH TRẠNG CỦA ĐƠN HÀNG',
              position: 'top',
              color: '#D14B28',
            },
          },
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
        }}
      />
    </Paper>
  )
}

export default ChartTotalOrders
