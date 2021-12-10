import { Banners, Discovery } from '../components/Homepage'
import { Container } from '@material-ui/core'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { GetStaticProps } from 'next'
import { Place } from '@/models/place'
// import { motion } from 'framer-motion'

interface Props {
  places_data: Place[]
}

export default function Home({ places_data }: Props) {
  // console.log('home', places_data)

  return (
    <>
      <Banners />
      <Container maxWidth="lg">
        <Discovery places_data={places_data} />
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
