import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import { useStyles } from '@/styles/placeList'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { Coordinate, Place } from '@/models/place'
import { toAvgRating } from 'helpers/toAvgRating'
import Link from 'next/link'
import * as ROUTES from '@/constants/routes'
import useUser from '@/firebase/useUser'
import { addToSaved, removeFromSaved } from '@/services/user'
import LoginRequiredDialog from '../common/LoginRequiredDialog'
import Image from 'next/image'
import calcCrow from '@/functions/distanceCalc'

interface Props {
  place: Place
  currentPosition: Coordinate
}

const PlaceCard = ({ place, currentPosition }: Props) => {
  const classes = useStyles()
  const { user } = useUser()
  const [openDialog, setOpenDialog] = useState(false)
  const distance = Math.floor(
    calcCrow(
      currentPosition.lat,
      currentPosition.lng,
      place.location.lat,
      place.location.lng
    )
  )
  const ratingsCount = place.rating ? Object.keys(place.rating).length : 0
  const avgRating = place.rating ? toAvgRating(place.rating) : 0

  const isSaved =
    user && user.id !== '' && user.saved && user.saved.includes(place.id)

  const handleToggleSave = () => {
    if (user.id !== '') {
      isSaved
        ? removeFromSaved(user.id, place.id)
        : addToSaved(user.id, place.id)
    } else {
      setOpenDialog(true)
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <Card className={classes.cardWrapper} elevation={0}>
      <Image
        src={place.image}
        alt={`${place.name}`}
        height="50%"
        width="100%"
        layout="responsive"
        className={classes.cardImage}
      />
      <Box display="flex" justifyContent="space-between">
        <CardContent style={{ padding: '0.7rem 0 0 0' }}>
          <Link href={ROUTES.PLACE_DETAIL(place.id)}>
            <Typography
              variant="body1"
              noWrap
              className={classes.link}
              style={{ fontWeight: 'bold' }}
            >
              {place.name}
            </Typography>
          </Link>

          <Typography variant="body2" color="textSecondary">
            {`${avgRating} ★ ${ratingsCount} đánh giá • ${distance}km • $$`}
          </Typography>
        </CardContent>
        <IconButton
          aria-label="save-button"
          onClick={() => handleToggleSave()}
          className={classes.disableHoverEffect}
        >
          {isSaved ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
      <LoginRequiredDialog open={openDialog} handleClose={handleCloseDialog} />
    </Card>
  )
}

export default PlaceCard
