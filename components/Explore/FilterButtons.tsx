import { Box, Chip, Typography, IconButton } from '@material-ui/core'
import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import RatingFilter from './RatingFilter'
import DistanceFilter from './DistanceFilter'

interface Props {
  ratingFilter: { show: boolean; rating: number }
  setRatingFilter: (ratingFilter: { show: boolean; rating: number }) => void
  distanceFilter: { show: boolean; distance: number }
  setDistanceFilter: (distanceFilter: {
    show: boolean
    distance: number
  }) => void
}

const FilterButtons = ({
  ratingFilter,
  setRatingFilter,
  distanceFilter,
  setDistanceFilter,
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
      <Chip
        label={
          <Box display="flex" alignItems="center" style={{ gap: '4%' }}>
            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
              Giá
            </Typography>
            <IconButton
              aria-label="expand-price-filter"
              style={{ padding: '0', color: 'black' }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        }
        aria-label="expand-price-filter"
        clickable
        style={{
          backgroundColor: 'rgb(231, 231, 231)',
        }}
      />
    </Box>
  )
}

export default FilterButtons
