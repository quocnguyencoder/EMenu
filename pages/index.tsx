import { HeroWithAddressInput } from '@/components/Homepage'
import { Container } from '@material-ui/core'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { GetStaticProps } from 'next'
import { Place } from '@/models/place'
import { Location } from '@/models/location'
import FeaturedPlace from '@/components/Homepage/FeaturedPlace'
import { getAllLocations } from '@/services/location'
import { NextSeo } from 'next-seo'
interface Props {
  places: Place[]
  locations: Location[]
}

export default function Home({ places, locations }: Props) {
  return (
    <>
      <NextSeo
        title={'Mọi địa điểm trong một menu'}
        description="Trang chủ Emenu"
        openGraph={{
          type: 'website',
          url: 'https://emenu-green.vercel.app/',
          title: 'EMenu - Mọi địa điểm trong một Menu',
          description: 'Các địa điểm ăn uống nổi bật',
          images: [
            {
              url: 'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/emenu%2Flogo.png?alt=media&token=7d77c9ca-efa5-41be-8070-7d28a9999938',
              alt: 'EMenu logo',
            },
          ],
        }}
      />
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
