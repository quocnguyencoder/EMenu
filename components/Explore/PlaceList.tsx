import { Coordinate, Place } from '@/models/place'
import { Box, Typography } from '@material-ui/core'
import React from 'react'
import PlaceCard from './PlaceCard'
interface Props {
  title: string
  currentPosition: Coordinate
  places: Place[]
}

const PlaceList = ({ title, places, currentPosition }: Props) => {
  return (
    <Box display="flex" flexDirection="column" mt={3} style={{ gap: 10 }}>
      <Typography variant="h5" style={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Box display="flex" overflow="auto" style={{ gap: 10 }}>
        {places.map((place) => (
          <PlaceCard
            key={`${title}-${place.id}`}
            place={place}
            currentPosition={currentPosition}
          />
        ))}
      </Box>
    </Box>
  )
}

export default PlaceList
