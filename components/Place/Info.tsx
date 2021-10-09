import { Box, Typography, Breadcrumbs } from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import PlaceRating from './PlaceRating'
import Link from 'next/link'
import { Place } from '../../models/place'
import moment from 'moment'
import nonAccentVietnamese from '../../functions/nonAccentVietnamese'
import formatter from '../../functions/moneyFormatter'

interface Props {
  place: Place
}

export default function Info({ place }: Props) {
  const now = moment([])

  // Khánh Hòa -> khanh-hoa
  const normalizeText = (text: string) =>
    nonAccentVietnamese(text).toLowerCase().replace(' ', '-')

  const isOpen = now.isBetween(
    moment(place.time.open, 'h:mma'),
    moment(place.time.close, 'h:mma')
  )

  const menu = place.menu
  const menuItems = Object.keys(menu).map(Number)

  const maxItemID = menuItems.reduce((prev, curr) =>
    menu[prev].price > menu[curr].price ? prev : curr
  )

  const minItemID = menuItems.reduce((prev, curr) =>
    menu[prev].price < menu[curr].price ? prev : curr
  )

  const maxPrice = formatter.format(menu[maxItemID].price)
  const minPrice = formatter.format(menu[minItemID].price)

  return (
    <Box maxWidth="60%">
      <Breadcrumbs
        separator="››"
        aria-label="breadcrumb"
        style={{ marginBottom: '2%' }}
      >
        <Link as="/" href="/">
          <a>Home</a>
        </Link>
        <Link
          as={`/${normalizeText(place.address.province)}`}
          href="/[location]"
        >
          <a>{place.address.province}</a>
        </Link>
        <Link
          as={`/${normalizeText(place.address.province)}/${place.id}`}
          href="/[location]/[place]"
        >
          <a>{place.name}</a>
        </Link>
      </Breadcrumbs>

      <Typography>{place.type}</Typography>

      <Typography variant="h4">{place.name}</Typography>
      <Typography variant="body2">
        {`${place.address.street}, P.${place.address.ward},  ${place.address.city}, ${place.address.province}`}
      </Typography>

      <PlaceRating />

      <Box display="flex" style={{ color: 'gray' }}>
        <AccessTimeIcon />
        <Typography variant="body1">{`${place.time.open} - ${place.time.close}`}</Typography>
      </Box>

      {isOpen ? (
        <Box display="flex" style={{ color: '#6CC942' }}>
          <FiberManualRecordIcon fontSize="small" />
          <Typography variant="body1">Đang mở</Typography>
        </Box>
      ) : (
        <Box display="flex" style={{ color: 'grey' }}>
          <FiberManualRecordIcon fontSize="small" />
          <Typography variant="body1">Đã đóng</Typography>
        </Box>
      )}

      <Box display="flex" style={{ color: 'gray' }}>
        <MonetizationOnOutlinedIcon />
        <Typography variant="body1">{`${minPrice} - ${maxPrice}`}</Typography>
      </Box>
    </Box>
  )
}
