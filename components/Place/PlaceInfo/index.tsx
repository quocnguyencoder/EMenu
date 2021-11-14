import React from 'react'
import { Place } from '@/models/place'
import Info from './Info'
import MainImage from './MainImage'

interface Props {
  place: Place
}

const PlaceInfo = ({ place }: Props) => {
  return (
    <>
      <MainImage url={place.image} alt={`${place.name}'s main image`} />

      <Info place={place} />
    </>
  )
}

export default PlaceInfo
