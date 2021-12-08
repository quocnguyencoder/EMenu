import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { Place } from '@/models/place'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import moment from 'moment'

interface Props {
  option: Place
}

const SearchResult = ({ option }: Props) => {
  moment.locale('en')
  const now = moment([])

  const isOpen = (open: string, close: string) =>
    now.isBetween(moment(open, 'h:mma'), moment(close, 'h:mma'))

  return (
    <>
      <ListItemAvatar>
        <Avatar alt={option.name} src={option.image} variant="square" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontWeight: 700 }}>
            {option.name}
          </Typography>
        }
        secondary={
          <Typography variant="caption">
            {`${option.address.street}, P.${option.address.ward}`}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        {isOpen(option.time.open, option.time.close) ? (
          <Box display="flex" style={{ color: '#6CC942' }}>
            <Typography variant="caption">Đang mở</Typography>
            <FiberManualRecordIcon fontSize="small" />
          </Box>
        ) : (
          <Box display="flex" style={{ color: 'grey' }}>
            <Typography variant="caption">Chưa mở cửa</Typography>
            <FiberManualRecordIcon fontSize="small" />
          </Box>
        )}
      </ListItemSecondaryAction>
    </>
  )
}

export default SearchResult
