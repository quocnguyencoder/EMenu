import {
  Avatar,
  Box,
  ListItemAvatar,
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
          <Box>
            <Typography
              variant="body2"
              style={{ fontWeight: 700, display: 'flex' }}
            >
              {option.name}
            </Typography>
            {isOpen(option.time.open, option.time.close) ? (
              <Box display="flex" style={{ color: '#6CC942', float: 'right' }}>
                <Typography variant="caption">Đang mở</Typography>
                <FiberManualRecordIcon fontSize="small" />
              </Box>
            ) : (
              <Box display="flex" style={{ color: 'grey', float: 'right' }}>
                <Typography variant="caption">Chưa mở cửa</Typography>
                <FiberManualRecordIcon fontSize="small" />
              </Box>
            )}
          </Box>
        }
        secondary={
          <Typography variant="caption">
            {`${option.address.street}, ${option.address.ward}`}
          </Typography>
        }
      />
    </>
  )
}

export default SearchResult
