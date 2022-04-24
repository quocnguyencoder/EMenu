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

interface ChartCtx {
  datasetIndex: number
  p0: PointElement
  p0DataIndex: number
  p1: PointElement
  p1DataIndex: number
  type: string
}

const ChartIncome: React.FC<Props> = ({ orderList, months }: Props) => {
  const totalOrdersByMonth = months.map((month) =>
    orderList.filter(
      (orderList) =>
        new Date(month).getMonth() === new Date(orderList.datetime).getMonth()
    )
  )

  const totalIncomeByMonth = totalOrdersByMonth.map((orders) =>
    orders.reduce((pre, income) => pre + income.total, 0)
  )

  const data = {
    labels: months,
    datasets: [
      {
        type: 'line' as const,
        label: 'Tổng doanh thu',
        data: totalIncomeByMonth.map((total) => total.toFixed(2)),
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
    <div style={{ width: '45%' }}>
      <Chart
        type="line"
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'DOANH THU THEO THÁNG',
              position: 'bottom',
              color: '#D14B28',
            },
          },
        }}
      />
    </div>
  )
}

export default ChartIncome
