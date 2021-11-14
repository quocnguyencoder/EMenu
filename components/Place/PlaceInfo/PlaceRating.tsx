import Rating from '@material-ui/lab/Rating'
import { RatingList } from '@/models/place'

interface Props {
  ratings: RatingList
}

interface RatingDisplay {
  [star: number]: number
}

export default function PlaceRating({ ratings }: Props) {
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

  const avgRating = (
    Object.keys(ratingDisplay)
      .map(Number)
      .reduce((sum, star) => {
        return star * ratingDisplay[star] + sum
      }, 0) / ratingList.length
  ).toFixed(1)

  return (
    <Rating
      name="read-only"
      value={Number(avgRating)}
      readOnly
      precision={0.5}
    />
  )
}
