import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { Place } from '@/models/place'
import moment from 'moment'
import StyledBadge from '../common/StyledBadge'
import router from 'next/router'
import * as ROUTES from '@/constants/routes'

interface Props {
  option: Place
}

const SearchResult = ({ option }: Props) => {
  moment.locale('en')
  const now = moment([])

  const isOpen = (open: string, close: string) =>
    now.isBetween(moment(open, 'h:mma'), moment(close, 'h:mma'))

  const goToDetail = (placeData: Place) => {
    router.push(ROUTES.PLACE_DETAIL(placeData.id))
  }

  return (
    <ListItem
      onClick={() => goToDetail(option)}
      component="span"
      style={{ padding: 0, width: '100%' }}
    >
      <ListItemAvatar>
        {isOpen(option.time.open, option.time.close) ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Avatar alt={option.name} src={option.image} />
          </StyledBadge>
        ) : (
          <Avatar alt={option.name} src={option.image} />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            noWrap
            variant="body2"
            style={{ fontWeight: 700, display: 'flex' }}
          >
            {option.name}
          </Typography>
        }
        secondary={
          <Typography noWrap variant="caption">
            {`${option.address.street}, ${option.address.ward}`}
          </Typography>
        }
      />
    </ListItem>
  )
}

export default SearchResult
