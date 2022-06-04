import { RatingList } from '@/models/place'
import { Paper } from '@material-ui/core'
import {
  ArcElement,
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  PieController,
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
  PieController,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title
)

interface Props {
  ratings: RatingList
}

interface RatingDisplay {
  [star: number]: number
}

const ChartTotalStars: React.FC<Props> = ({ ratings }: Props) => {
  const ratingDisplay: RatingDisplay = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  }

  const ratingList = Object.keys(ratings)

  ratingList.map((userID) => {
    const userRatings = ratings[userID]
    userRatings.map((userRating) => {
      if ((userRating !== undefined && userRating.rating) !== undefined) {
        ratingDisplay[userRating.rating] += 1
      }
    })
  })

  const data = {
    labels: Object.keys(ratingDisplay).map(Number),
    datasets: [
      {
        data: Object.values(ratingDisplay),
        backgroundColor: [
          'rgb(255, 102, 102)',
          'rgb(255, 99, 132)',
          'rgb(255, 184, 77)',
          'rgb(159, 255, 128)',
          'rgb(64, 255, 0)',
        ],
        hoverOffset: 4,
      },
    ],
  }

  return (
    <Paper style={{ width: '30%', margin: '1%' }}>
      <Chart
        type="pie"
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'TỔNG SỐ SAO ĐƯỢC ĐÁNH GIÁ',
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

export default ChartTotalStars
