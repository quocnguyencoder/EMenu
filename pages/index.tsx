import { HeroWithAddressInput } from '@/components/Homepage'
import { Container } from '@material-ui/core'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { GetStaticProps } from 'next'
import { Place } from '@/models/place'
import { Location } from '@/models/location'
import FeaturedPlace from '@/components/Homepage/FeaturedPlace'
import { getAllLocations } from '@/services/location'
interface Props {
  places: Place[]
  locations: Location[]
}

export default function Home({ places, locations }: Props) {
  return (
    <>
      <HeroWithAddressInput />
      <Container maxWidth="md" style={{ paddingTop: '4%', minWidth: '70vw' }}>
        {locations.map((location) => {
          const placeList = places.filter((place) =>
            location.places.includes(place.id)
          )
          return (
            <FeaturedPlace
              key={`featured-${location.slug}`}
              location={location}
              places={placeList}
            />
          )
        })}
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const querySnapshot = await firebase.firestore().collection('place').get()

  const places = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Place
    data.id = doc.id
    return data
  })

  const locations = await getAllLocations()

  return {
    props: { places, locations },
    revalidate: 600,
  }
}
