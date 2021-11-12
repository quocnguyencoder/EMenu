import { Box, Container } from '@material-ui/core'
import {
  MainImage,
  MenuWrapper,
  Info,
  ReviewsRatings,
} from '@/components/Place'
import firebase from 'firebase/app'
import { Place } from '@/models/place'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { motion } from 'framer-motion'

interface IParams extends ParsedUrlQuery {
  placeID: string
}
interface Props {
  place_data: Place
}
export default function PlaceDetail({ place_data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container maxWidth="lg">
        <Box display="flex" mt={1} bgcolor="#fff" style={{ gap: '5%' }}>
          <MainImage url={place_data.image} name={place_data.name} />
          <Info place={place_data} />
        </Box>
        <Box display="flex" mt={2} style={{ gap: '2%' }}>
          <MenuWrapper place={place_data} />
        </Box>
        <Box display="flex" mt={2} marginLeft={'22%'} style={{ gap: '2%' }}>
          <ReviewsRatings placeID={place_data.id} />
        </Box>
      </Container>
    </motion.div>
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
      { params: { location: 'khanh-hoa', placeID: '1sfXtIdNJOzFvD15kMLl' } },
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
