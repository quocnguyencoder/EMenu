import React, { useState } from 'react'
import {
  Box,
  Chip,
  Typography,
  Divider,
  IconButton,
  Popover,
  Paper,
  Slider,
  Button,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useStyles } from '@/styles/explore'

interface Props {
  ratingFilter: { show: boolean; rating: number }
  setRatingFilter: (ratingFilter: { show: boolean; rating: number }) => void
}

const RatingFilter = ({ ratingFilter, setRatingFilter }: Props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'filter-by-rating' : undefined

  const marks = [
    {
      value: 3,
      label: '3',
    },
    {
      value: 3.5,
      label: '3.5',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 4.5,
      label: '4.5',
    },
    {
      value: 5,
      label: '5',
    },
  ]

  function valuetext(value: number) {
    return `over ${value}`
  }

  const [selectedRating, setSelectedRating] = useState(ratingFilter.rating)

  return (
    <Box>
      <Chip
        label={
          <Box display="flex" alignItems="center" style={{ gap: '4%' }}>
            <Typography
              variant="body2"
              style={{
                fontWeight: 'bold',
                color: ratingFilter.show ? 'white' : 'black',
              }}
            >
              {`Trên ${ratingFilter.rating} ★`}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              style={{
                backgroundColor: ratingFilter.show
                  ? 'white'
                  : 'rgba(0, 0, 0, 0.12)',
              }}
            />
            <IconButton
              aria-label="expand-rating-filter"
              onClick={(e) => {
                e.stopPropagation()
                handleClick(e)
              }}
              style={{
                padding: '0',
                color: ratingFilter.show ? 'white' : 'black',
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        }
        clickable
        component="span"
        onClick={() =>
          setRatingFilter({ ...ratingFilter, show: !ratingFilter.show })
        }
        aria-describedby={id}
        style={{
          backgroundColor: ratingFilter.show ? '#D4451B' : 'rgb(231, 231, 231)',
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper className={classes.popoverPaper}>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            Xếp hạng
          </Typography>
          <Typography
            variant="body2"
            style={{ fontWeight: 'bold', color: 'gray' }}
          >
            {`Trên ${selectedRating} ★`}
          </Typography>
          <Slider
            value={selectedRating}
            aria-labelledby="rating-slider"
            step={null}
            valueLabelDisplay="off"
            marks={marks}
            track="inverted"
            getAriaValueText={valuetext}
            min={3}
            max={5}
            onChange={(event, value) => setSelectedRating(Number(value))}
          />
          <Divider />
          <Box
            style={{ paddingTop: '0.5rem' }}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              className={classes.disableHoverEffect}
              onClick={handleClose}
              aria-label="Close rating filter"
              style={{ textTransform: 'none', borderRadius: '16px' }}
            >
              Hủy
            </Button>
            <Button
              className={classes.applyFilterButton}
              variant="contained"
              color="primary"
              aria-label="Apply rating filter"
              onClick={() => {
                setRatingFilter({ show: true, rating: selectedRating })
                handleClose()
              }}
              style={{ textTransform: 'none', borderRadius: '16px' }}
            >
              Tìm kiếm
            </Button>
          </Box>
        </Paper>
      </Popover>
    </Box>
  )
}

export default RatingFilter
