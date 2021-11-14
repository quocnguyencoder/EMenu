import { Box, Container } from '@material-ui/core'
import { MenuSection, PlaceInfo, ReviewsRatings } from '@/components/Place'
import firebase from 'firebase/app'
import { Place } from '@/models/place'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useState, useEffect } from 'react'

interface IParams extends ParsedUrlQuery {
  placeID: string
}
interface Props {
  place_data: Place
}
export default function PlaceDetail({ place_data }: Props) {
  const [place, setPlace] = useState<Place>(place_data)

  // update place's data when sth change in database
  useEffect(() => {
    firebase
      .firestore()
      .collection('place')
      .doc(place_data.id)
      .onSnapshot((snapshot) => {
        const storedID = place_data.id
        place_data = snapshot.data() as Place
        place_data.id = storedID
        setPlace(place_data)
        //console.log('change')
      })
  }, [])

  return (
    <Container maxWidth="lg">
      <Box display="flex" mt={1} bgcolor="#fff" style={{ gap: '5%' }}>
        <PlaceInfo place={place} />
      </Box>
      <Box display="flex" mt={2} style={{ gap: '2%' }}>
        <MenuSection place={place} />
      </Box>
      <Box display="flex" mt={2} marginLeft={'22%'} style={{ gap: '2%' }}>
        <ReviewsRatings place={place} />
      </Box>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const arr: string[] = ['1sfXtIdNJOzFvD15kMLl']
  // const paths = arr.map((slug) => {
  //   return {
  //     params: { city: 'Nha Trang', placeID: `${slug}` },
  //   }
  // })
  return {
    paths: [
      {
        params: { location: 'tinh-khanh-hoa', placeID: '1sfXtIdNJOzFvD15kMLl' },
      },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { placeID } = context.params as IParams

  const place_data = await firebase
    .firestore()
    .collection('place')
    .doc(placeID)
    .get()
    .then((snapshot) => {
      return snapshot.data() as Place
    })

  place_data.id = placeID

  return {
    props: {
      place_data,
    },
    revalidate: 60,
  }
}
