import {
  Box,
  Container,
  Chip,
  Typography,
  Divider,
  IconButton,
} from '@material-ui/core'
import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlaceList from '@/components/Explore/PlaceList'
import Breakfast from 'icons/Breakfast'
import Desserts from 'icons/Desserts'
import Sandwiches from 'icons/Sandwiches'
import Coffee from 'icons/Coffee'
import Burgers from 'icons/Burgers'
import Chicken from 'icons/Chicken'
import Salad from 'icons/Salad'
import Fastfood from 'icons/Fastfood'
import Bakery from 'icons/Bakery'
import Smoothie from 'icons/Smoothie'
import Healthy from 'icons/Healthy'
import Pizza from 'icons/Pizza'
import Soup from 'icons/Soup'
import Vegan from 'icons/Vegan'
import { GetStaticProps } from 'next'
import { getAllLocations, getLocationBySlug } from '@/services/location'
import { Location } from '@/models/location'
import { getPlacesByIDList } from '@/services/place'
import { Place } from '@/models/place'
import DefaultErrorPage from 'next/error'
import { NextSeo } from 'next-seo'

interface Props {
  status: number
  location: Location
  places: Place[]
}

const index = ({ status, location, places }: Props) => {
  const categories = [
    { name: 'Ăn sáng', icon: <Breakfast /> },
    { name: 'Đồ ngọt', icon: <Desserts /> },
    { name: 'Sandwiches', icon: <Sandwiches /> },
    { name: 'Cà phê', icon: <Coffee /> },
    { name: 'Burgers', icon: <Burgers /> },
    { name: 'Gà', icon: <Chicken /> },
    { name: 'Salad', icon: <Salad /> },
    { name: 'Ăn vặt', icon: <Fastfood /> },
    { name: 'Bánh mì', icon: <Bakery /> },
    { name: 'Smoothie', icon: <Smoothie /> },
    { name: 'Healthy', icon: <Healthy /> },
    { name: 'Pizza', icon: <Pizza /> },
    { name: 'Súp', icon: <Soup /> },
    { name: 'Chay', icon: <Vegan /> },
  ]
  return status === 200 ? (
    <Container maxWidth="md" style={{ minWidth: '80vw', minHeight: '85vh' }}>
      <NextSeo
        title={`Khám phá các địa điểm ở ${location.name}`}
        openGraph={{
          type: 'website',
          url: 'https://emenu-green.vercel.app/',
          title: `Khám phá các địa điểm ở ${location.name}`,
          description: `Khám phá các địa điểm ở ${location.name}`,
          images: [
            {
              url: 'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/emenu%2Flogo.png?alt=media&token=7d77c9ca-efa5-41be-8070-7d28a9999938',
              alt: 'EMenu logo',
            },
          ],
        }}
      />
      <Box
        padding="1rem 0%"
        display="flex"
        overflow="scroll auto"
        style={{ gap: '3%' }}
      >
        {categories.map((category, index) => (
          <Box
            key={`${index}-${category.name}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {category.icon}
            <Typography variant="caption" style={{ marginTop: '0.5rem' }}>
              {category.name}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        display="flex"
        overflow="auto"
        paddingTop="1rem"
        style={{ gap: '2%' }}
      >
        <Chip
          label={
            <Box display="flex" alignItems="center" style={{ gap: '4%' }}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                Trên 4.5 ★
              </Typography>
              <Divider orientation="vertical" flexItem />
              <IconButton
                aria-label="expand-rating-filter"
                style={{ padding: '0', color: 'black' }}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Box>
          }
          clickable
          style={{
            backgroundColor: 'rgb(231, 231, 231)',
          }}
        />
        <Chip
          label={
            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
              Gần bạn
            </Typography>
          }
          clickable
          style={{
            backgroundColor: 'rgb(231, 231, 231)',
          }}
        />
        <Chip
          label={
            <Box display="flex" alignItems="center" style={{ gap: '4%' }}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                Giá
              </Typography>
              <IconButton style={{ padding: '0', color: 'black' }}>
                <ExpandMoreIcon />
              </IconButton>
            </Box>
          }
          aria-label="expand-price-filter"
          clickable
          style={{
            backgroundColor: 'rgb(231, 231, 231)',
          }}
        />
      </Box>
      <PlaceList title="Gần bạn" places={places} />
      <PlaceList title={`Nổi bật ở ${location.name}`} places={places} />
    </Container>
  ) : (
    <DefaultErrorPage statusCode={status} />
  )
}

export default index

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locationID = params ? `${params.locationID}` : ''
  let location = {} as Location
  let places = [] as Place[]
  let status = 200

  if (locationID !== '') {
    try {
      location = await getLocationBySlug(locationID)
      places = await getPlacesByIDList(location.places)
    } catch {
      status = 500
    }
  } else {
    status = 404
  }

  return {
    props: { places, location, status },
    revalidate: 600,
  }
}

export async function getStaticPaths() {
  const locations = await getAllLocations()

  const paths = locations.map((location) => ({
    params: { locationID: location.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}
