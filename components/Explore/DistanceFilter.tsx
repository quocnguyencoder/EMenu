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
  distanceFilter: { show: boolean; distance: number }
  setDistanceFilter: (ratingFilter: { show: boolean; distance: number }) => void
}

const DistanceFilter = ({ distanceFilter, setDistanceFilter }: Props) => {
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
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
  ]

  function valuetext(value: number) {
    return `under ${value}`
  }

  const [selectedDistance, setSelectedDistance] = useState(
    distanceFilter.distance
  )

  return (
    <Box>
      <Chip
        label={
          <Box display="flex" alignItems="center" style={{ gap: '4%' }}>
            <Typography
              variant="body2"
              style={{
                fontWeight: 'bold',
                color: distanceFilter.show ? 'white' : 'black',
              }}
            >
              {`Dưới ${distanceFilter.distance}km`}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              style={{
                backgroundColor: distanceFilter.show
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
                color: distanceFilter.show ? 'white' : 'black',
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        }
        clickable
        component="span"
        onClick={() =>
          setDistanceFilter({ ...distanceFilter, show: !distanceFilter.show })
        }
        aria-describedby={id}
        style={{
          backgroundColor: distanceFilter.show
            ? '#D4451B'
            : 'rgb(231, 231, 231)',
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
            Khoảng cách
          </Typography>
          <Typography
            variant="body2"
            style={{ fontWeight: 'bold', color: 'gray' }}
          >
            {`Dưới ${selectedDistance} km`}
          </Typography>
          <Slider
            value={selectedDistance}
            aria-labelledby="rating-slider"
            step={null}
            valueLabelDisplay="off"
            marks={marks}
            getAriaValueText={valuetext}
            min={1}
            max={5}
            onChange={(event, value) => setSelectedDistance(Number(value))}
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
                setDistanceFilter({ show: true, distance: selectedDistance })
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

export default DistanceFilter
