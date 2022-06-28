import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Modal,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core'
import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { useStyles } from '@/styles/itemDetailModal'
import { Place } from '@/models/place'
import GoogleMapReact from 'google-map-react'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import CallMadeOutlinedIcon from '@material-ui/icons/CallMadeOutlined'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined'
import moment from 'moment'

interface Props {
  open: boolean
  handleClose: () => void
  placeInfo: Place
}

const PlaceInfoModal = ({ open, handleClose, placeInfo }: Props) => {
  const classes = useStyles()
  const lat = placeInfo.location.lat
  const lng = placeInfo.location.lng
  const address = `${placeInfo.address.street},${placeInfo.address.ward}, ${placeInfo.address.city}, ${placeInfo.address.province}`
  const renderMarkers = (map: any, maps: any) =>
    new maps.Marker({
      position: { lat: lat, lng: lng },
      map,
      title: `${placeInfo.name}, ${address}`,
    })
  moment.locale('en')
  const now = moment([])

  const isOpen = now.isBetween(
    moment(placeInfo.time.open, 'h:mma'),
    moment(placeInfo.time.close, 'h:mma')
  )

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={classes.detailModalWrapper}
      aria-labelledby="info-modal-title"
      aria-describedby="info-modal-description"
    >
      <Paper className={classes.detailModalPaper}>
        <Box>
          <IconButton
            className={classes.disableHoverEffect}
            onClick={() => handleClose()}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography
          variant="h4"
          component="h1"
          style={{ fontWeight: 'bold', padding: '1rem' }}
        >
          {placeInfo.name}
        </Typography>
        <Box flex={1}>
          <GoogleMapReact
            // bootstrapURLKeys={{ key: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}` }}
            defaultCenter={{
              lat: lat,
              lng: lng,
            }}
            defaultZoom={16}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }: any) => renderMarkers(map, maps)}
          />
        </Box>
        <List>
          <ListItem>
            <ListItemIcon>
              <LocationOnOutlinedIcon
                style={{ color: 'black', fontSize: '1.7rem' }}
              />
            </ListItemIcon>
            <ListItemText
              primary={placeInfo.address.street}
              secondary={`${placeInfo.address.ward}, ${placeInfo.address.city}, ${placeInfo.address.province}`}
            />
            <ListItemSecondaryAction>
              <a
                target="_blank"
                href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                rel="noopener noreferrer"
              >
                <IconButton className={classes.disableHoverEffect}>
                  <CallMadeOutlinedIcon
                    fontSize="small"
                    style={{ color: 'black' }}
                  />
                </IconButton>
              </a>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <AccessTimeOutlinedIcon
                style={{ color: 'black', fontSize: '1.7rem' }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                isOpen ? (
                  <Typography style={{ color: '#6CC942' }}>
                    {`Đang mở`}
                  </Typography>
                ) : (
                  <Typography style={{ color: 'red' }}>{`Đã đóng`}</Typography>
                )
              }
              secondary={`${placeInfo.time.open} - ${placeInfo.time.close}`}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <PhoneOutlinedIcon
                style={{ color: 'black', fontSize: '1.7rem' }}
              />
            </ListItemIcon>
            <ListItemText primary={`+84 ${placeInfo.phone}`} />
            <ListItemSecondaryAction>
              <a
                target="_blank"
                href={`tel:+84-${placeInfo.phone}`}
                rel="noopener noreferrer"
              >
                <IconButton className={classes.disableHoverEffect}>
                  <CallMadeOutlinedIcon
                    fontSize="small"
                    style={{ color: 'black' }}
                  />
                </IconButton>
              </a>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <AppBar position="relative" color="transparent">
          <Toolbar style={{ justifyContent: 'flex-end' }}>
            <Button
              onClick={() => handleClose()}
              className={classes.addToCartButton}
            >{`Đóng`}</Button>
          </Toolbar>
        </AppBar>
      </Paper>
    </Modal>
  )
}

export default PlaceInfoModal
