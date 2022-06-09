import React from 'react'
import { GetServerSideProps } from 'next'
import { getPlaceDetail } from '@/services/getData'
import { Place } from '@/models/place'
import { Container } from '@material-ui/core'
import CoverWithLogo from '@/components/Detail/CoverWithLogo'
import PlaceInfo from '@/components/Detail/PlaceInfo'
import TopReviews from '@/components/Detail/TopReviews'
import PlaceMenu from '@/components/Detail/PlaceMenu'
import DefaultErrorPage from 'next/error'
import { NextSeo } from 'next-seo'
interface Props {
  place_data: Place
  status: number
}

const Detail = ({ place_data, status }: Props) => {
  return status === 200 ? (
    <Container
      style={{
        maxWidth: '1000px',
        padding: 0,
      }}
    >
      <NextSeo
        title={`${place_data.name}`}
        openGraph={{
          type: 'website',
          url: `https://emenu-green.vercel.app/detail/${place_data.id}`,
          title: `${place_data.name}`,
          description: `${place_data.name}`,
          images: [
            {
              url: `${place_data.image}`,
              alt: `${place_data.name} cover`,
            },
          ],
        }}
      />
      <CoverWithLogo coverImg={place_data.image} />
      <PlaceInfo place_data={place_data} />
      <TopReviews
        placeID={place_data.id}
        ratings={place_data.rating}
        reviews={place_data.reviews}
      />
      <PlaceMenu
        menu={place_data.menu}
        categories={place_data.categories}
        placeID={place_data.id}
      />
    </Container>
  ) : (
    <DefaultErrorPage statusCode={status} />
  )
}

export default Detail

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
