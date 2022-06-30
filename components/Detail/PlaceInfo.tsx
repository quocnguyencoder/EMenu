import { Place } from '@/models/place'
import { Box, Chip, Divider, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { useStyles } from '@/styles/detail'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import { toAvgRating } from 'helpers/toAvgRating'
import useUser from '@/firebase/useUser'
import { addToSaved, removeFromSaved } from '@/services/user'
import LoginRequiredDialog from '../common/LoginRequiredDialog'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PlaceInfoModal from './PlaceInfoModal'
import { Address } from '@/models/address'
import isEqual from 'lodash/isEqual'
import calcCrow from '@/functions/distanceCalc'
import { toAvgPrice } from '@/helpers/toAvgPrice'

interface Props {
  place_data: Place
}

const PlaceInfo = ({ place_data }: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const { user } = useUser()
  const [openDialog, setOpenDialog] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [openModal, setOpenModal] = useState(false)

  const ratingsCount = place_data.rating
    ? Object.keys(place_data.rating).length
    : 0
  const avgRating = place_data.rating ? toAvgRating(place_data.rating) : 0

  const isSaved =
    user && user.id !== '' && user.saved && user.saved.includes(place_data.id)

  const handleToggleSave = () => {
    if (user.id !== '') {
      isSaved
        ? removeFromSaved(user.id, place_data.id)
        : addToSaved(user.id, place_data.id)
    } else {
      setOpenDialog(true)
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const [currentAddress, setCurrentAddress] = useState<Address>({} as Address)

  useEffect(() => {
    setCurrentAddress(
      JSON.parse(sessionStorage.getItem('currentAddress') || '{}') as Address
    )
  }, [])

  const noAddressProvided = isEqual(currentAddress, {})

  return (
    <Box className={classes.infoWrapper}>
      <Typography variant="h4" style={{ fontWeight: 'bold' }}>
        {place_data.name}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" className={classes.description}>
          <Typography variant="body2" noWrap>
            {`${place_data.type} ${isMobile ? '' : '•'}`}&nbsp;
          </Typography>
          <Typography variant="body2">
            {` ${avgRating} ★ (${ratingsCount})  ${
              !noAddressProvided
                ? `• ${Math.floor(
                    calcCrow(
                      currentAddress.coordinate.lat,
                      currentAddress.coordinate.lng,
                      place_data.location.lat,
                      place_data.location.lng
                    )
                  )}km `
                : ''
            }• ${'₫'.repeat(toAvgPrice(place_data.menu))}`}
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
                    Chi tiết
                  </Typography>
                )}
              </Box>
            }
            clickable
            onClick={() => setOpenModal(true)}
            className={classes.chip}
            aria-label="more info"
          />
          <Chip
            label={
              <Box display="flex" alignItems="center" style={{ gap: '0.4rem' }}>
                {isSaved ? (
                  <FavoriteIcon color="primary" fontSize="small" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
                {!isMobile && (
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    {isSaved ? 'Đã lưu' : 'Lưu'}
                  </Typography>
                )}
              </Box>
            }
            clickable
            onClick={() => handleToggleSave()}
            className={classes.chip}
            aria-label="save"
          />
        </Box>
      </Box>
      <LoginRequiredDialog open={openDialog} handleClose={handleCloseDialog} />
      <Divider style={{ marginTop: '2.3rem' }} />
      <PlaceInfoModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        placeInfo={place_data}
      />
    </Box>
  )
}

export default PlaceInfo
