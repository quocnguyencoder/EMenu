import {
  Box,
  Button,
  Card,
  CardContent,
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
import { Place } from '@/models/place'
import { Location } from '@/models/location'
import { toAvgRating } from 'helpers/toAvgRating'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  location: Location
  places: Place[]
}

const FeaturedPlace = ({ location, places }: Props) => {
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
          component="h1"
          style={{ fontWeight: 'bold', marginRight: '1%' }}
        >{`Các địa điểm nổi bật ở ${location.name}`}</Typography>
      </Box>
      <Box display="flex" flexDirection="column" gridArea="caption">
        <Typography
          className={classes.caption}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {`${location.places.length} địa điểm ở ${location.name}`}
        </Typography>
        <Button
          className={classes.seeMoreButton}
          endIcon={<ArrowForwardIcon />}
          onClick={() => router.push(ROUTES.EXPLORE_LOCATION(location.slug))}
        >{`Xem thêm các địa điểm`}</Button>
      </Box>

      <Box display="flex" flexDirection="column" width="100%" gridArea="cards">
        {places.map((place) => (
          <Card
            key={`featured-${place.id}`}
            variant="outlined"
            className={classes.card}
          >
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
                {Object.keys(place.menu)
                  .map(Number)
                  .map((itemID) => (
                    <ImageListItem
                      key={`place-${place.id}-${itemID}`}
                      style={{ display: 'block' }}
                    >
                      <Image
                        src={place.menu[itemID].image}
                        alt={`${place.menu[itemID].name} image`}
                        layout="responsive"
                        height="100%"
                        width="100%"
                        className={classes.image}
                      />
                    </ImageListItem>
                  ))}
              </ImageList>
            </Box>

            <CardContent>
              <Link href={ROUTES.PLACE_DETAIL(place.id)}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.link}
                  style={{ fontWeight: 'bold' }}
                >
                  {place.name}
                </Typography>
              </Link>

              <Typography variant="body2" color="textSecondary" component="p">
                {place.type}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {` ${toAvgRating(place.rating)} ★ ${
                  Object.keys(place.rating).length
                } đánh giá`}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default FeaturedPlace
