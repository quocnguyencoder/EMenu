import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  IconButton,
  Link,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { useRouter } from 'next/router'
import { Place } from '@/models/place'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import PlaceRatings from './PlaceRatings'
import * as ROUTES from '@/constants/routes'
import PlaceDistance from './PlaceDistance'

interface Props {
  info: Place
}
const PlaceCard = ({ info }: Props) => {
  const router = useRouter()

  const gotoDetail = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    router.push(ROUTES.PLACE_DETAIL(info.address.province, info.id))
  }

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={info.image}
          title={info.name}
        />
      </CardActionArea>
      {/* Place info region */}
      <ListItem style={{ paddingBottom: 0 }}>
        <ListItemText
          primary={
            <Link
              href={ROUTES.PLACE_DETAIL(info.address.province, info.id)}
              color="inherit"
              variant="body1"
              onClick={(e) => gotoDetail(e)}
              style={{ fontWeight: 'bold' }}
            >
              {info.name}
            </Link>
          }
          secondary={
            <Typography variant="body2">
              {`${info.address.street}, ${info.address.ward}, ${info.address.city}, ${info.address.province}`}
            </Typography>
          }
        />
      </ListItem>
      <CardActions disableSpacing style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Box style={{ display: 'flex', width: '50%', alignItems: 'center' }}>
          <PlaceRatings ratings={info.rating} />
          <PlaceDistance placeCoord={info.location} />
        </Box>
        <Box style={{ width: '50%' }}>
          <IconButton aria-label="add to favorites" style={{ float: 'right' }}>
            <BookmarkBorderIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  )
}

export default PlaceCard
