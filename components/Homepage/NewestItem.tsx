import {
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
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import React from 'react'
import { useRouter } from 'next/router'
import { Place } from '../../models/place'

interface Props {
  info: Place
}
const NewestItem = ({ info }: Props) => {
  const router = useRouter()

  const gotoDetail = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    router.push(`/nha-trang/1sfXtIdNJOzFvD15kMLl`)
  }

  // console.log('newest', info)

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={info.image}
          title="Contemplative Reptile"
        />
      </CardActionArea>
      {/* Place info region */}
      <ListItem>
        <ListItemText
          primary={
            <Link
              href="/nha-trang/1sfXtIdNJOzFvD15kMLl"
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
              {`${info.address.street}, P.${info.address.ward},  ${info.address.city}, ${info.address.province}`}
            </Typography>
          }
        />
      </ListItem>
      {/* Lastest user cmt region */}
      {/* <CardHeader
        avatar={<Avatar aria-label="recipe">Q</Avatar>}
        title={
          <Link
            href="#"
            color="inherit"
            variant="body2"
            style={{ fontWeight: 'bold' }}
          >
            Quoc Nguyen
          </Link>
        }
        subheader="This place is awesome :)"
      /> */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default NewestItem
