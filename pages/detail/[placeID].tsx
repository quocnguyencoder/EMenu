import React from 'react'
import { GetServerSideProps } from 'next'
import { getPlaceDetail } from '@/services/getData'
import { Place } from '@/models/place'

interface Props {
  place_data: Place
  status: number
}

const Detail = ({ place_data, status }: Props) => {
  return (
    <div>
      {place_data.name}
      {status}
    </div>
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
