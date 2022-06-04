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

const PlaceList = () => {
  const classes = useStyles()
  return (
    <Box display="flex" flexDirection="column" mt={3} style={{ gap: 10 }}>
      <Typography variant="h5" style={{ fontWeight: 'bold' }}>
        {'Gần bạn'}
      </Typography>
      <Box display="flex" overflow="auto" style={{ gap: 10 }}>
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
            src="https://img.cdn4dd.com/p/media/store/header/b7aaca8e-e401-4ea2-8b4b-61983ad1de86.jpg"
            title="Paella dish"
            component="img"
            height="100%"
            style={{ maxHeight: '10rem', borderRadius: '5px' }}
          />
          <Box display="flex" justifyContent="space-between">
            <CardContent style={{ padding: '0.7rem 0 0 0' }}>
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold' }}
              >{`Quán ăn gia đình`}</Typography>
              <Typography variant="body2" color="textSecondary">
                5 ★ 10 ratings • 0.5km • $$
              </Typography>
            </CardContent>
            <IconButton className={classes.disableHoverEffect}>
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}

export default PlaceList
