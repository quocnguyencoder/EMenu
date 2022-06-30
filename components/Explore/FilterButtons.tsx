import { Box } from '@material-ui/core'
import React from 'react'
import RatingFilter from './RatingFilter'
import DistanceFilter from './DistanceFilter'
import PriceFilter from './PriceFilter'

interface Props {
  ratingFilter: { show: boolean; rating: number }
  setRatingFilter: (ratingFilter: { show: boolean; rating: number }) => void
  distanceFilter: { show: boolean; distance: number }
  setDistanceFilter: (distanceFilter: {
    show: boolean
    distance: number
  }) => void
  priceFilter: { show: boolean; price: number }
  setPriceFilter: (priceFilter: { show: boolean; price: number }) => void
}

const FilterButtons = ({
  ratingFilter,
  setRatingFilter,
  distanceFilter,
  setDistanceFilter,
  priceFilter,
  setPriceFilter,
}: Props) => {
  return (
    <Box display="flex" overflow="auto" paddingTop="1rem" style={{ gap: '2%' }}>
      <RatingFilter
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
      />
      <DistanceFilter
        distanceFilter={distanceFilter}
        setDistanceFilter={setDistanceFilter}
      />
      <PriceFilter priceFilter={priceFilter} setPriceFilter={setPriceFilter} />
    </Box>
  )
}

export default FilterButtons
