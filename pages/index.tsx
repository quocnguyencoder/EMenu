import { Discovery, HeroWithAddressInput } from '@/components/Homepage'
import { Box, Container } from '@material-ui/core'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { GetStaticProps } from 'next'
import { Place } from '@/models/place'
import FeaturedPlace from '@/components/Homepage/FeaturedPlace'
// import { motion } from 'framer-motion'

interface Props {
  places_data: Place[]
}

export default function Home({ places_data }: Props) {
  // console.log('home', places_data)
  const placeCanShow = places_data.reduce(
    (pre, curr) => (curr.show ? [...pre, curr] : pre),
    [] as Place[]
  )

  return (
    <>
      <HeroWithAddressInput />
      <Container maxWidth="md" style={{ paddingTop: '4%', minWidth: '70vw' }}>
        <FeaturedPlace />
        <Box visibility="hidden">
          <Discovery places_data={placeCanShow} />
        </Box>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const querySnapshot = await firebase.firestore().collection('place').get()

  const places_data = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Place
    data.id = doc.id
    return data
  })

  return {
    props: { places_data },
    revalidate: 600,
  }
}
