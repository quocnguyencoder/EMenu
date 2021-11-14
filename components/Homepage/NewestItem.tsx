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
import nonAccentVietnamese from '../../functions/nonAccentVietnamese'

interface Props {
  info: Place
}
const NewestItem = ({ info }: Props) => {
  const router = useRouter()

  // Khánh Hòa -> khanh-hoa
  const normalizeText = (text: string) =>
    nonAccentVietnamese(text).toLowerCase().split(' ').join('-')

  const detailURL = `/${normalizeText(info.address.province)}/${info.id}`

  const gotoDetail = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    router.push(detailURL)
  }

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
              href={detailURL}
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
