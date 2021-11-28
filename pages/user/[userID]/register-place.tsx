import {
  Box,
  Button,
  ButtonBase,
  CardMedia,
  Snackbar,
  Typography,
} from '@material-ui/core'
import { Address, Place, Time } from '@/models/place'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import PlaceForm from '@/components/AdminPage/PlaceForm'
import moment from 'moment'
import { useRef, useState } from 'react'
import type { Color } from '@material-ui/lab/Alert'
import Alert from '@material-ui/lab/Alert'
import * as createService from '@/firebase/createDocument'
import { SnackbarOrigin } from '@material-ui/core/Snackbar'
import { useStyles } from '@/styles/modal'
import axios from 'axios'
import useUser from '@/firebase/useUser'
import { useRouter } from 'next/router'
import * as ROUTES from '@/constants/routes'

interface State extends SnackbarOrigin {
  open: boolean
}

const initialPlace: Place = {
  id: '',
  name: '',
  address: {
    province: '',
    city: '',
    ward: '',
    street: '',
  },
  reviews: [],
  rating: {},
  menu: {},
  categories: {},
  image: '',
  type: '',
  time: {
    open: '00:00 AM',
    close: '00:00 AM',
  },
  location: {
    lat: 0,
    lng: 0,
  },
  phone: '',
  createdDate: moment().format('LLL'),
  activeDate: moment(
    moment().format('LLL'),
    'MMMM Do YYYY, hh:mm:ss A'
  ).fromNow(),
  show: false,
}

const RegisterPlace = () => {
  const { user } = useUser()
  const router = useRouter()
  const classes = useStyles()
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })
  const { vertical, horizontal, open } = state
  const [message, setMessage] = useState({
    text: '',
    severity: 'error' as Color,
  })
  const [previewImg, setPreviewImg] = useState<string>('')
  const inputEl = useRef(null)
  const [disableBtn, setDisableBtn] = useState(false)

  const handlePreviewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files[0] === undefined) {
      return
    } else
      e.target.files[0].type.includes('image')
        ? setPreviewImg(URL.createObjectURL(e.target.files[0]))
        : handleOpenAlert(`File không phải là hình ảnh hoặc gif`, `error`)
  }
  const handleOpenAlert = (text: string, severity: Color) => {
    setState({ ...state, open: true })
    setMessage({
      text: text,
      severity: severity,
    })
  }

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setDisableBtn(true)

    const address = {
      province: e.target.province.value,
      city: e.target.city.value,
      ward: e.target.ward.value,
      street: e.target.street.value.replace(/ +(?= )/g, '').trim(),
    } as Address

    const time = {
      open:
        e.target.OpenHour.value +
        ':' +
        e.target.OpenMinute.value +
        ' ' +
        e.target.OpenPeriod.value,
      close:
        e.target.CloseHour.value +
        ':' +
        e.target.CloseMinute.value +
        ' ' +
        e.target.ClosePeriod.value,
    } as Time

    const data = {
      name: e.target.name.value,
      address: address,
      phone: e.target.phone.value,
      type: e.target.type.value,
      time: time,
    } as Place

    // @ts-expect-error: to stop error
    // eslint-disable-next-line
    const imageAsFile = inputEl.current!.files[0]
    if (imageAsFile.type.includes('image')) {
      axios
        .get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address:
              data.address.street +
              ', ' +
              data.address.ward +
              ', ' +
              data.address.city +
              ', ' +
              data.address.province,
            key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
          },
        })
        .then((res: any) => {
          createService.default
            .createPlaceInfo(
              data,
              initialPlace,
              res.data.results[0].geometry.location,
              user.id,
              imageAsFile
            )
            .then(() => {
              router.push(ROUTES.ADMIN)
            })
        })
    } else {
      handleOpenAlert(`File không phải là hình ảnh hoặc gif`, `error`)
    }
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={2000}
        open={open}
        key={vertical + horizontal}
        onClose={handleClose}
      >
        <Alert variant="filled" severity={message.severity}>
          {message.text}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit}>
        <Box display="flex" p={2} style={{ gap: '4%' }}>
          <Box flex={2}>
            <PlaceForm place={initialPlace} />
          </Box>
          <Box flex={1}>
            <CardMedia
              component="img"
              image={`${previewImg}`}
              style={{
                width: '70%',
                height: '70%',
                objectFit: 'scale-down',
              }}
            />
            <input
              id="icon-button-file"
              type="file"
              required
              ref={inputEl}
              style={{ display: 'none' }}
              onChange={(e) => handlePreviewImg(e)}
            />
            <Box style={{ height: '30%' }}>
              <label htmlFor="icon-button-file">
                <ButtonBase
                  component="span"
                  style={{
                    backgroundColor: '#e7e7e7',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <AddAPhotoIcon fontSize="large" />
                  <Typography variant="body2">Thêm ảnh</Typography>
                </ButtonBase>
              </label>
            </Box>
          </Box>
        </Box>
        <Box style={{ textAlign: 'center' }}>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            disabled={disableBtn}
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  )
}

export default RegisterPlace
