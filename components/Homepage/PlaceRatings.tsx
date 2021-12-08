import React from 'react'
import { RatingList } from '@/models/place'
import StarIcon from '@material-ui/icons/Star'
import { Typography } from '@material-ui/core'

interface Props {
  ratings: RatingList
}

interface RatingDisplay {
  [star: number]: number
}

const PlaceRatings = ({ ratings }: Props) => {
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
      : 0

  return (
    <>
      <StarIcon style={{ color: 'orange', paddingBottom: '4%' }} />
      <Typography variant="subtitle2" style={{ fontWeight: 600 }}>
        {`${avgRating}`}
      </Typography>
      <Typography
        variant="subtitle2"
        style={{ color: 'gray', paddingLeft: '2%', paddingRight: '4%' }}
      >{`(${ratingList.length})`}</Typography>
    </>
  )
}

export default PlaceRatings
