import { Box, Paper, Typography } from '@material-ui/core'
import { Chart } from 'react-google-charts'
import Rating from '@material-ui/lab/Rating'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import { RatingList } from '@/models/place'

interface Props {
  ratings: RatingList
}

interface RatingDisplay {
  [star: number]: number
}

const RatingOverview = ({ ratings }: Props) => {
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
    const latestRating = userRatings[userRatings.length - 1]
    ratingDisplay[latestRating.rating] += 1
  })

  const avgRating =
    ratingList.length !== 0
      ? (
          Object.keys(ratingDisplay)
            .map(Number)
            .reduce((sum, star) => {
              return star * ratingDisplay[star] + sum
            }, 0) / ratingList.length
        ).toFixed(1)
      : '0'

  return (
    <Paper
      elevation={3}
      variant="outlined"
      square
      style={{
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" style={{ marginLeft: '3%', paddingTop: '1%' }}>
        {'Xếp hạng và đánh giá'}
      </Typography>
      <Box display="flex">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          ml="5%"
        >
          <Typography variant="h2">{avgRating}</Typography>
          <Rating
            name="read-only"
            value={Number(avgRating)}
            readOnly
            precision={0.5}
          />
          <Box display="flex">
            <PermIdentityIcon fontSize="small" />
            <Typography variant="subtitle2">{`${ratingList.length} total`}</Typography>
          </Box>
        </Box>
        <Chart
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Rating', 'Total', { role: 'style' }],
            ['5*', ratingDisplay[5], '#79C9A1'],
            ['4*', ratingDisplay[4], '#AED888'],
            ['3*', ratingDisplay[3], '#FFD935'],
            ['2*', ratingDisplay[2], '#FFB235'],
            ['1*', ratingDisplay[1], '#FF8C5A'],
          ]}
          options={{
            bar: { groupWidth: '80%' },
            legend: { position: 'none' },
            hAxis: {
              baselineColor: '#fff',
              gridlineColor: '#fff',
              textPosition: 'none',
            },
            axisFontSize: 0,
          }}
          style={{ flex: 1, height: '160px' }}
        />
      </Box>
    </Paper>
  )
}

export default RatingOverview
