import { Banners, Discovery } from '../components/Homepage'
import { Container } from '@material-ui/core'
import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { GetServerSideProps } from 'next'
import { Place } from '../models/place'
// import Write from '../components/cloudFirestore/Write'

interface Props {
  places_data: Place[]
}

export default function Home({ places_data }: Props) {
  // console.log('home', places_data)
  return (
    <>
      <Banners />
      <Container maxWidth="lg">
        {/* <Write /> */}
        <Discovery places_data={places_data} />
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const querySnapshot = await firebase.firestore().collection('place').get()

  const places_data = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Place
    data.id = doc.id
    return data
  })

  return {
    props: { places_data },
  }
}
