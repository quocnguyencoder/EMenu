import useUser from '@/firebase/useUser'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import * as ROUTES from '@/constants/routes'
import isEqual from 'lodash/isEqual'
import { Place } from '@/models/place'
import { getPlacesByIDList } from '@/services/place'
import PlaceCard from '@/components/Saved/PlaceCard'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

const Saved = () => {
  const { user } = useUser()
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([])
  const isLoaded = user && user.id !== ''

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}')
    if (isEqual(userInfo, {})) {
      router.push(ROUTES.LOGIN)
    } else {
      isLoaded &&
        user.saved &&
        user.saved.length !== 0 &&
        getPlacesByIDList(user.saved).then((data) => setSavedPlaces(data))
    }
  }, [user.saved])

  return isLoaded ? (
    <Container
      maxWidth="md"
      style={{ paddingTop: '2rem', minWidth: '70vw', minHeight: '75vh' }}
    >
      <NextSeo
        title={'Địa điểm đã lưu '}
        description={`Trang liệt kê địa điểm đã lưu của người dùng`}
        openGraph={{
          type: 'website',
          url: 'https://emenu-green.vercel.app/',
          title: 'EMenu - Mọi địa điểm trong một Menu',
          description: 'Welcome to EMenu',
          images: [
            {
              url: 'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/emenu%2Flogo.png?alt=media&token=7d77c9ca-efa5-41be-8070-7d28a9999938',
              alt: 'EMenu logo',
            },
          ],
        }}
      />
      <Typography variant="h4" style={{ fontWeight: 'bold' }}>
        Đã lưu
      </Typography>
      {user.saved && user.saved.length !== 0 ? (
        <Grid container spacing={3}>
          {savedPlaces.map((place) => (
            <Grid key={`saved-${place.id}`} item xs={12} sm={6} md={4} lg={4}>
              <PlaceCard place={place} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Image
            src="https://img.cdn4dd.com/s/managed/consumer/discovery/save_for_later/heart_empty_state.svg"
            height="150rem"
            width="150rem"
          />
          <Typography
            variant="body1"
            color="secondary"
            style={{ fontWeight: 'bold' }}
          >
            Bạn chưa lưu địa điểm nào
          </Typography>
        </Box>
      )}
    </Container>
  ) : (
    <></>
  )
}

export default Saved
