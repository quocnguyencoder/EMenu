import { useEffect, useState, Fragment } from 'react'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { useStyles } from '../styles/header'
import {
  Avatar,
  Box,
  IconButton,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import * as getService from '@/firebase/getDocument'
import { Place } from '@/models/place'
import { Autocomplete } from '@material-ui/lab'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import CropFreeIcon from '@material-ui/icons/CropFree'
import moment from 'moment'
import { useRouter } from 'next/router'
import * as ROUTES from '@/constants/routes'

const SearchBar = () => {
  const router = useRouter()
  const classes = useStyles()
  const [placesData, setPlaceData] = useState<Place[]>([])
  moment.locale('en')
  const now = moment([])

  const isOpen = (open: string, close: string) =>
    now.isBetween(moment(open, 'h:mma'), moment(close, 'h:mma'))

  useEffect(() => {
    getService.default.getAllPlaces().then((data) => setPlaceData(data))
  }, [])

  const goToDetail = (placeData: Place | null) => {
    placeData !== null &&
      router.push(ROUTES.PLACE_DETAIL(placeData.address.province, placeData.id))
  }

  return (
    <div className={classes.search}>
      <Autocomplete
        style={{ width: '100%' }}
        disableListWrap
        noOptionsText={<Typography>{'Không tìm thấy kết quả'}</Typography>}
        disablePortal
        options={placesData}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => goToDetail(value)}
        renderInput={(params) => (
          <InputBase
            placeholder="Tìm kiếm địa điểm"
            classes={{
              root: classes.inputRoot,
            }}
            style={{
              paddingLeft: '10px',
              border: '1.3px ridge #f2f2f2',
            }}
            startAdornment={<SearchIcon />}
            endAdornment={
              <IconButton>
                <CropFreeIcon />
              </IconButton>
            }
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
          />
        )}
        renderOption={(option) => (
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
                  <Typography variant="caption">Đã đóng</Typography>
                  <FiberManualRecordIcon fontSize="small" />
                </Box>
              )}
            </ListItemSecondaryAction>
          </>
        )}
      />
    </div>
  )
}

export default SearchBar
