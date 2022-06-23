import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  Legend,
  Tooltip,
  Title,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { Bill } from '@/models/place'
import { Paper } from '@material-ui/core'
import moment from 'moment'
import dayjs from 'dayjs'
import getDatesInRange from '@/functions/getDatesInRange'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineController,
  LineElement,
  Legend,
  Tooltip,
  Title
)

interface ChartCtx {
  datasetIndex: number
  p0: PointElement
  p0DataIndex: number
  p1: PointElement
  p1DataIndex: number
  type: string
}

interface Props {
  orderList: Bill[]
}

const ChartIncomeWeekly: React.FC<Props> = ({ orderList }: Props) => {
  const startDate = moment(
    new Date(dayjs().startOf('week').format('YYYY-MM-DD'))
  ).format('L')
  const endDate = moment(
    new Date(dayjs().endOf('week').format('YYYY-MM-DD'))
  ).format('L')

  const labelDates = getDatesInRange(startDate, endDate)

  const weeklyOrders = orderList.filter((order) =>
    moment(order.datetime).isBetween(startDate, endDate)
  )

  const totalOrdersByDate = labelDates.map((date) =>
    weeklyOrders.filter(
      (order) => date === moment(order.datetime).format('DD-MM-yyyy')
    )
  )

  const totalIncome = totalOrdersByDate.map((orders) =>
    orders.reduce(
      (pre, income) =>
        income.status === 'Confirmed' ? pre + income.total : pre,
      0
    )
  )

  const labels = labelDates.reduce(
    (pre, curr) =>
      curr === moment().format('DD-MM-yyyy')
        ? [...pre, 'Today']
        : [...pre, curr],
    [] as string[]
  )

  const data = {
    labels: labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Doanh thu trong tuần',
        data: totalIncome.map((total) => total.toFixed(2)),
        borderColor: 'rgb(128,0,128)',
        borderWidth: 2,
        tension: 0.4,
        segment: {
          borderColor: (ctx: ChartCtx) =>
            ctx.p0.parsed.y < ctx.p1.parsed.y
              ? 'rgb(0, 255, 127)'
              : ctx.p0.parsed.y == ctx.p1.parsed.y
              ? 'rgb(0, 191, 255)'
              : 'rgb(255, 99, 132)',
        },
      },
    ],
  }

  return (
    <Paper style={{ width: '45%', marginRight: '1%', flex: '1' }}>
      <Chart
        type="line"
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'DOANH THU TRONG TUẦN',
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

export default ChartIncomeWeekly
