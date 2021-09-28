import { Box, Container } from '@material-ui/core'
import { MainImage, MenuWrapper, Info } from '../../components/Place'
import firebase from 'firebase/app'
import { Place } from '../../models/place'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface IParams extends ParsedUrlQuery {
  placeID: string
}
interface Props {
  place_data: Place
}
export default function PlaceDetail({ place_data }: Props) {
  // console.log('rerendered')
  // const categories = Array.from(
  //   new Set(menu.map((m) => m.category.toLowerCase()))
  // )
  // const [filterCategories, setFilterCategories] = useState(categories)
  // const scroll = useScroll()

  return (
    <Container maxWidth="lg">
      <Box display="flex" mt={1} bgcolor="#fff" style={{ gap: '5%' }}>
        <MainImage url={place_data.image} name={place_data.name} />
        <Info place={place_data} />
      </Box>
      <Box display="flex" mt={2} style={{ gap: '2%' }}>
        <MenuWrapper place={place_data} />
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
    paths: [{ params: { city: 'nha-trang', placeID: '1sfXtIdNJOzFvD15kMLl' } }],
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

// function useScroll() {
//   const [scrollY, setScrollY] = useState(0)
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY)
//     }
//     window.addEventListener('scroll', handleScroll)
//     handleScroll()
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])
//   return scrollY
// }
