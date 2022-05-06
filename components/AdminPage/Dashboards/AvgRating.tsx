import { RatingList } from '@/models/place'
import { Box, Paper, Typography } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'

interface Props {
  ratings: RatingList
}

interface RatingDisplay {
  [star: number]: number
}

const AvgRating = ({ ratings }: Props) => {
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
    if ((latestRating !== undefined && latestRating.rating) !== undefined) {
      ratingDisplay[latestRating.rating] += 1
    }
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
      : 0

  return (
    <Box flex="1" m="1%">
      <Paper style={{ padding: '5%' }}>
        <Typography variant="subtitle2">Rating</Typography>
        <Box display="flex">
          <Typography
            variant="h6"
            style={{ fontWeight: 600, alignSelf: 'center', width: '100%' }}
          >
            {`${avgRating}`}
          </Typography>
          <StarIcon style={{ color: 'orange' }} />
        </Box>
      </Paper>
    </Box>
  )
}

export default AvgRating
