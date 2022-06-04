import { RatingList } from '@/models/place'

interface RatingDisplay {
  [star: number]: number
}

const toAvgRating = (ratings: RatingList) => {
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
  return avgRating
}

export { toAvgRating }
