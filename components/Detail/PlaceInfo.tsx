import { Place } from '@/models/place'
import { Box, Chip, Divider, Typography } from '@material-ui/core'
import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { useStyles } from '@/styles/detail'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

interface Props {
  place_data: Place
}

const PlaceInfo = ({ place_data }: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Box className={classes.infoWrapper}>
      <Typography variant="h4" style={{ fontWeight: 'bold' }}>
        {place_data.name}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" className={classes.description}>
          <Typography variant="body2" color="textSecondary" noWrap>
            {`Nha Trang, Pizza, Coca ${isMobile ? '' : '•'}`}&nbsp;
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {` 5 ★ (10 ratings) • 0.5km • $$`}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ gap: '2%' }}
        >
          <Chip
            label={
              <Box display="flex" alignItems="center" style={{ gap: '0.4rem' }}>
                <InfoOutlinedIcon fontSize="small" />
                {!isMobile && (
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    More Info
                  </Typography>
                )}
              </Box>
            }
            clickable
            className={classes.chip}
          />
          <Chip
            label={
              <Box display="flex" alignItems="center" style={{ gap: '0.4rem' }}>
                <FavoriteBorderIcon fontSize="small" />
                {!isMobile && (
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    Save
                  </Typography>
                )}
              </Box>
            }
            clickable
            className={classes.chip}
          />
        </Box>
      </Box>
      <Divider style={{ marginTop: '2.3rem' }} />
    </Box>
  )
}

export default PlaceInfo
