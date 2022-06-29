import { Box, Chip, Typography, IconButton } from '@material-ui/core'
import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import RatingFilter from './RatingFilter'

interface Props {
  ratingFilter: { show: boolean; rating: number }
  setRatingFilter: (ratingFilter: { show: boolean; rating: number }) => void
}

const FilterButtons = ({ ratingFilter, setRatingFilter }: Props) => {
  return (
    <Box display="flex" overflow="auto" paddingTop="1rem" style={{ gap: '2%' }}>
      <RatingFilter
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
      />
      <Chip
        label={
          <Typography variant="body2" style={{ fontWeight: 'bold' }}>
            Gần bạn
          </Typography>
        }
        clickable
        style={{
          backgroundColor: 'rgb(231, 231, 231)',
        }}
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
