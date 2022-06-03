import React from 'react'
import { GetServerSideProps } from 'next'
import { getPlaceDetail } from '@/services/getData'
import { Place } from '@/models/place'
import { Container } from '@material-ui/core'
import CoverWithLogo from '@/components/Detail/CoverWithLogo'
import PlaceInfo from '@/components/Detail/PlaceInfo'
import TopReviews from '@/components/Detail/TopReviews'

interface Props {
  place_data: Place
  status: number
}

const Detail = ({ place_data, status }: Props) => {
  return (
    <Container
      style={{
        maxWidth: '1000px',
        padding: 0,
      }}
    >
      <CoverWithLogo coverImg={place_data.image} />
      <PlaceInfo place_data={place_data} />
      <TopReviews />
      {status}
    </Container>
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
