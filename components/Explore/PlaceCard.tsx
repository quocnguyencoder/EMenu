import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { useStyles } from '@/styles/placeList'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { Place } from '@/models/place'
import { toAvgRating } from 'helpers/toAvgRating'
import Link from 'next/link'
import * as ROUTES from '@/constants/routes'

interface Props {
  place: Place
}

const PlaceCard = ({ place }: Props) => {
  const classes = useStyles()
  const distance = 0.1
  const ratingsCount = place.rating ? Object.keys(place.rating).length : 0
  const avgRating = place.rating ? toAvgRating(place.rating) : 0

  return (
    <Card
      style={{
        minWidth: '20rem',
        maxWidth: '25rem',
        height: '14rem',
        backgroundColor: '#fff',
        cursor: 'pointer',
      }}
      elevation={0}
    >
      <CardMedia
        src={place.image}
        title={`${place.name}`}
        component="img"
        height="100%"
        style={{ maxHeight: '10rem', borderRadius: '5px' }}
      />
      <Box display="flex" justifyContent="space-between">
        <CardContent style={{ padding: '0.7rem 0 0 0' }}>
          <Link href={ROUTES.PLACE_DETAIL(place.id)}>
            <Typography
              variant="body1"
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
        <IconButton className={classes.disableHoverEffect}>
          <FavoriteBorderIcon />
        </IconButton>
      </Box>
    </Card>
  )
}

export default PlaceCard
