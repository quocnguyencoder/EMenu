import { Box, Button, Snackbar } from '@material-ui/core'
import { Address, Place, Time } from '@/models/place'
import PlaceForm from '@/components/AdminPage/PlaceForm'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import type { Color } from '@material-ui/lab/Alert'
import Alert from '@material-ui/lab/Alert'
import * as createService from '@/firebase/createDocument'
import { SnackbarOrigin } from '@material-ui/core/Snackbar'
import { useStyles } from '@/styles/modal'
import axios from 'axios'
import useUser from '@/firebase/useUser'
import { useRouter } from 'next/router'
import * as ROUTES from '@/constants/routes'
import isEqual from 'lodash/isEqual'
import shortcutAddress from '@/functions/shortcutAddress'
import { NextSeo } from 'next-seo'
import ImagePreview from '@/components/AdminPage/MenuManagement/ImagePreview'
import SelectTags from '@/components/AdminPage/SelectTags'

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
  order: [],
  tags: [],
}

const RegisterPlace = () => {
  const { user } = useUser()
  const router = useRouter()
  const classes = useStyles()
  const [tags, setTags] = useState<string[]>([])
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

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}')
    if (isEqual(userInfo, {})) {
      router.push(ROUTES.LOGIN)
    } else {
      userInfo.placeID !== '' && router.push(ROUTES.ADMIN)
    }
  }, [])

  const changeTags = (selectedTags: string[]) => setTags(selectedTags)

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
      province: shortcutAddress(e.target.province.value),
      city: shortcutAddress(e.target.city.value),
      ward: shortcutAddress(e.target.ward.value),
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
      tags: tags,
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
      <NextSeo
        title={'Đăng ký địa điểm mới'}
        description={`Trang đăng ký địa điểm mới trong hệ thống EMenu`}
        openGraph={{
          type: 'website',
          url: 'https://emenu-green.vercel.app/',
          title: 'EMenu - Mọi địa điểm trong một Menu',
          description: 'Welcome to EMenu',
          images: [
            {
              url: 'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/emenu%2Flogo.png?alt=media&token=7d77c9ca-efa5-41be-8070-7d28a9999938',
              alt: 'EMenu logo',
            },
          ],
        }}
      />
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
        <Box
          display="flex"
          p={2}
          style={{
            gap: '3%',
            height: '75vh',
            maxWidth: '98vw',
          }}
        >
          <Box flex={2}>
            <PlaceForm place={initialPlace} />
            <SelectTags tags={tags} changeTags={changeTags} />
          </Box>
          <ImagePreview
            previewImg={previewImg}
            inputEl={inputEl}
            handlePreviewImg={handlePreviewImg}
          />
        </Box>
        <Box style={{ textAlign: 'center' }}>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            disabled={disableBtn}
          >
            Xác nhận
          </Button>
        </Box>
      </form>
    </>
  )
}

export default RegisterPlace
