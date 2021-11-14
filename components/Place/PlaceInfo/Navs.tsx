import Link from 'next/link'
import { Breadcrumbs } from '@material-ui/core'
import * as ROUTES from '@/constants/routes'

interface Props {
  province: string
  placeName: string
  placeID: string
}

const Navs = ({ province, placeName, placeID }: Props) => {
  return (
    <Breadcrumbs
      separator="››"
      aria-label="breadcrumb"
      style={{ marginBottom: '2%' }}
    >
      <Link as="/" href="/">
        <a>Home</a>
      </Link>
      <Link as={ROUTES.LOCATION(province)} href="/[location]">
        <a>{province}</a>
      </Link>
      <Link
        as={ROUTES.PLACE_DETAIL(province, placeID)}
        href="/[location]/[place]"
      >
        <a>{placeName}</a>
      </Link>
    </Breadcrumbs>
  )
}

export default Navs
