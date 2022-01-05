import { Admin } from '@/components/E-Menu'
import { Place } from '@/models/place'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { GetStaticProps } from 'next'

interface Props {
  places_data: Place[]
}

const admin = ({ places_data }: Props) => {
  return <Admin places_data={places_data} />
}

export default admin
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
