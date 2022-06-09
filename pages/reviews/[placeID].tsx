import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import { getPlaceDetail } from '@/services/getData'
import { Place } from '@/models/place'
import { Box, Container, Divider, Typography } from '@material-ui/core'
import RatingOverview from '@/components/reviews/RatingOverview'
import UserReview from '@/components/reviews/UserReview'
import useUser from '@/firebase/useUser'
import LoginRequiredDialog from '@/components/common/LoginRequiredDialog'
import { useStyles } from '@/styles/reviews'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import * as ROUTES from '@/constants/routes'
import Link from 'next/link'
import DefaultErrorPage from 'next/error'
import { NextSeo } from 'next-seo'
interface Props {
  place_data: Place
  status: number
}

const ReviewsPage = ({ place_data, status }: Props) => {
  const { user } = useUser()
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  return status === 200 ? (
    <Container maxWidth="lg" style={{ paddingTop: '1%', maxWidth: '1000px' }}>
      <NextSeo
        title={`Đánh giá: ${place_data.name}`}
        openGraph={{
          type: 'website',
          url: `https://emenu-green.vercel.app/reviews/${place_data.id}`,
          title: `Đánh giá: ${place_data.name}`,
          description: `Các xếp hạng và đánh giá: ${place_data.name}`,
          images: [
            {
              url: `${place_data.image}`,
              alt: `${place_data.name} cover`,
            },
          ],
        }}
      />
      <Box display="flex" alignItems="center" mt={2}>
        <ArrowBackIosIcon style={{ fontSize: '0.5rem', marginRight: '1rem' }} />
        <Link href={ROUTES.PLACE_DETAIL(place_data.id)}>
          <Typography className={classes.link} variant="body2">
            {place_data.name}
          </Typography>
        </Link>

        <Typography variant="body2" style={{ marginLeft: '1rem' }}>
          /
        </Typography>
      </Box>
      <Typography variant="h4" className={classes.headerText}>
        Xếp hạng và đánh giá
      </Typography>

      <Box
        display="flex"
        className={classes.mainContentWrapper}
        style={{ gap: '5%' }}
      >
        <RatingOverview ratings={place_data.rating} />
        <Divider className={classes.divider} />
        <Box
          display="flex"
          flexDirection="column"
          className={classes.reviewPostsWrapper}
        >
          {place_data &&
            place_data.reviews
              .slice(0)
              .reverse()
              .map((reviewID) => (
                <UserReview
                  key={reviewID}
                  reviewID={reviewID}
                  setOpenDialog={setOpenDialog}
                  ratings={place_data.rating}
                  userID={user.id}
                  placeID={place_data.id}
                />
              ))}
        </Box>
      </Box>
      <LoginRequiredDialog open={openDialog} handleClose={handleCloseDialog} />
    </Container>
  ) : (
    <DefaultErrorPage statusCode={status} />
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { placeID } = context.query || ''

  let place_data = {} as Place
  let status = 200
  try {
    place_data = await getPlaceDetail(`${placeID}`)
  } catch {
    status = 404
  }
  return {
    props: {
      place_data,
      status,
    },
  }
}

export default ReviewsPage
