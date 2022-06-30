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
  priceFilter: { show: boolean; price: number }
  setPriceFilter: (priceFilter: { show: boolean; price: number }) => void
}

const PriceFilter = ({ priceFilter, setPriceFilter }: Props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'filter-by-price' : undefined

  const marks = [
    {
      value: 20000,
      label: '20k',
    },
    {
      value: 80000,
      label: '80k',
    },
    {
      value: 150000,
      label: '150k',
    },
    {
      value: 250000,
      label: '250k',
    },
    {
      value: 350000,
      label: '350k',
    },
    {
      value: 450000,
      label: '450k',
    },
  ]

  function valuetext(value: number) {
    return `under ${value}`
  }

  const [selectedPrice, setSelectedPrice] = useState(priceFilter.price)

  return (
    <Box>
      <Chip
        label={
          <Box display="flex" alignItems="center" style={{ gap: '4%' }}>
            <Typography
              variant="body2"
              style={{
                fontWeight: 'bold',
                color: priceFilter.show ? 'white' : 'black',
              }}
            >
              {`Giá`}
            </Typography>

            <IconButton
              aria-label="expand-rating-filter"
              onClick={(e) => {
                e.stopPropagation()
                handleClick(e)
              }}
              style={{
                padding: '0',
                color: priceFilter.show ? 'white' : 'black',
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        }
        clickable
        component="span"
        onClick={() =>
          setPriceFilter({ ...priceFilter, show: !priceFilter.show })
        }
        aria-describedby={id}
        style={{
          backgroundColor: priceFilter.show ? '#D4451B' : 'rgb(231, 231, 231)',
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
            Giá
          </Typography>
          <Typography
            variant="body2"
            style={{ fontWeight: 'bold', color: 'gray' }}
          >
            {`Trung bình dưới ${selectedPrice / 1000}k`}
          </Typography>
          <Slider
            value={selectedPrice}
            aria-labelledby="rating-slider"
            step={1000}
            valueLabelDisplay="off"
            marks={marks}
            getAriaValueText={valuetext}
            min={20000}
            max={500000}
            onChange={(event, value) => setSelectedPrice(Number(value))}
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
                setPriceFilter({ show: true, price: selectedPrice })
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

export default PriceFilter
