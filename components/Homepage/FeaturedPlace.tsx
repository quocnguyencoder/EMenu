import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  ImageList,
  ImageListItem,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { useStyles } from '@/styles/featuredPlace'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import router from 'next/router'
import * as ROUTES from '@/constants/routes'

const FeaturedPlace = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box display="grid" className={classes.responsiveGrid}>
      <Box
        display="flex"
        flexDirection="column"
        gridArea="header"
        className={classes.heading}
      >
        <Typography
          variant="h5"
          style={{ fontWeight: 'bold', marginRight: '1%' }}
        >{`Các địa điểm nổi bật ở TP. Hồ Chí Minh`}</Typography>
      </Box>
      <Box display="flex" flexDirection="column" gridArea="caption">
        <Typography
          className={classes.caption}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {`1000 địa điểm ở TP.Hồ Chí Minh`}
        </Typography>
        <Button
          className={classes.seeMoreButton}
          endIcon={<ArrowForwardIcon />}
          onClick={() => router.push(ROUTES.EXPLORE_LOCATION('ho-chi-minh'))}
        >{`Xem thêm các địa điểm`}</Button>
      </Box>
      <Box display="flex" flexDirection="column" width="100%" gridArea="cards">
        <Card variant="outlined" style={{ paddingTop: '1%' }}>
          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              overflow: 'hidden',
              maxWidth: '100%',
            }}
          >
            <ImageList
              cols={isMobile ? 2.5 : 4}
              className={classes.responsiveImgList}
              rowHeight={110}
              gap={15}
            >
              <ImageListItem style={{ display: 'block' }}>
                <CardMedia
                  component={'img'}
                  src="https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=jpeg,quality=75/media/photos/02fec519-14cc-4093-a97f-5cf4b67fdcb9-retina-large.jpg"
                  style={{
                    height: '100%',
                    objectFit: 'fill',
                    borderRadius: '5px',
                  }}
                />
              </ImageListItem>
              <ImageListItem style={{ display: 'block' }}>
                <CardMedia
                  component={'img'}
                  src="https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=jpeg,quality=75/media/photos/02fec519-14cc-4093-a97f-5cf4b67fdcb9-retina-large.jpg"
                  style={{
                    height: '100%',
                    objectFit: 'fill',
                    borderRadius: '5px',
                  }}
                />
              </ImageListItem>
              <ImageListItem style={{ display: 'block' }}>
                <CardMedia
                  component={'img'}
                  src="https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=jpeg,quality=75/media/photos/02fec519-14cc-4093-a97f-5cf4b67fdcb9-retina-large.jpg"
                  style={{ height: '100%', objectFit: 'fill' }}
                />
              </ImageListItem>
              <ImageListItem style={{ display: 'block' }}>
                <CardMedia
                  component={'img'}
                  src="https://img.cdn4dd.com/p/fit=cover,width=600,height=300,format=jpeg,quality=75/media/photos/02fec519-14cc-4093-a97f-5cf4b67fdcb9-retina-large.jpg"
                  style={{ height: '100%', objectFit: 'fill' }}
                />
              </ImageListItem>
            </ImageList>
          </Box>

          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              style={{ fontWeight: 'bold' }}
            >
              {`Quán ăn gia đình`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Hồ Chí Minh • Quán ăn • $$
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              5 ★ 10 ratings
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default FeaturedPlace
