import {
  Box,
  Modal,
  Fade,
  Backdrop,
  CardMedia,
  Button,
  ButtonBase,
  Typography,
  Snackbar,
} from '@material-ui/core'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { SnackbarOrigin } from '@material-ui/core/Snackbar'
import { useState, useRef } from 'react'
import { useStyles } from '../../styles/modal'
import { Address, Place, Time } from '../../models/place'
import PlaceForm from './PlaceForm'
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/storage'
import isEqual from 'lodash/isEqual'
import type { Color } from '@material-ui/lab/Alert'
import Alert from '@material-ui/lab/Alert'
import * as updateService from '@/firebase/updateDocument'
import * as getService from '@/firebase/getDocument'
import shortcutAddress from '@/functions/shortcutAddress'

interface State extends SnackbarOrigin {
  open: boolean
}

interface Props {
  place: Place
  openModal: boolean
  setAdminPlace: any
  handleCloseModal: () => void
}

const UpdateProfile = ({
  place,
  openModal,
  setAdminPlace,
  handleCloseModal,
}: Props) => {
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

  const [previewImg, setPreviewImg] = useState<string>(place.image)
  const inputEl = useRef(null)
  const [disableBtn, setDisableBtn] = useState(false)

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

  const handlePreviewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files[0] === undefined) {
      return
    } else
      e.target.files[0].type.includes('image')
        ? setPreviewImg(URL.createObjectURL(e.target.files[0]))
        : handleOpenAlert(`File không phải là hình ảnh hoặc gif`, `error`)
  }

  const handleUpdateLocation = (data: Place, imageUrl: string) => {
    if (!isEqual(data.address, place.address)) {
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
        // .get('https://us1.locationiq.com/v1/search.php', {
        //   params: {
        //     q:
        //       data.address.street +
        //       ', ' +
        //       data.address.ward +
        //       ', ' +
        //       data.address.city +
        //       ', ' +
        //       data.address.province,
        //     key: '',
        //     format: 'json',
        //   },
        // })
        .then((res: any) => {
          updateService.default.updatePlaceLocation(place.id, res).then(() => {
            setAdminPlace({
              ...place,
              name: data.name,
              address: data.address,
              type: data.type,
              phone: data.phone,
              time: data.time,
              image: imageUrl,
              location: res.data.results[0].geometry.location,
            })
          })
        })
        .catch(() => {
          setAdminPlace({
            ...place,
            name: data.name,
            address: data.address,
            type: data.type,
            phone: data.phone,
            time: data.time,
            image: imageUrl,
          })
        })
    } else {
      setAdminPlace({
        ...place,
        name: data.name,
        type: data.type,
        phone: data.phone,
        time: data.time,
        image: imageUrl,
      })
    }
    handleOpenAlert(`Cập nhật thông tin của địa điểm thành công`, `success`)
    setDisableBtn(false)
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
    } as Place

    // @ts-expect-error: to stop error
    // eslint-disable-next-line
    const imageAsFile = inputEl.current!.files[0]
    if (imageAsFile === null || imageAsFile === undefined) {
      if (
        data.name === place.name &&
        data.phone === place.phone &&
        data.type === place.type &&
        isEqual(data.time, place.time) &&
        isEqual(data.address, place.address)
      ) {
        handleOpenAlert(`Không thể cập nhật vì dữ liệu giống nhau`, `warning`)
        setDisableBtn(false)
      } else {
        updateService.default
          .updatePlaceInfo(place.id, data, place.image)
          .then(() => {
            handleUpdateLocation(data, place.image)
          })
      }
    } else {
      if (imageAsFile.type.includes('image')) {
        const uploadTask = firebase
          .storage()
          .ref(`/place_pictures/${place.id}/${imageAsFile.name}`)
          .put(imageAsFile)
        // //initiates the firebase side uploading
        uploadTask.on(
          'state_changed',
          (snapShot) => {
            //takes a snap shot of the process as it is happening
            const progress =
              (snapShot.bytesTransferred / snapShot.totalBytes) * 100
            // eslint-disable-next-line
            console.log('Upload is ' + progress + '% done')
          },
          (err) => {
            // eslint-disable-next-line
            console.log(err)
          },
          () => {
            getService.default
              .getNewImage(place.id, imageAsFile.name)
              .then((fireBaseUrl) => {
                updateService.default
                  .updatePlaceInfo(place.id, data, fireBaseUrl)
                  .then(() => {
                    handleUpdateLocation(data, fireBaseUrl)
                  })
              })
          }
        )
      } else {
        handleOpenAlert(`File không phải là hình ảnh hoặc gif`, `error`)
        setDisableBtn(false)
      }
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
      <Modal
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box className={classes.paper}>
            <form onSubmit={handleSubmit}>
              <Box
                display="flex"
                style={{
                  gap: '3%',
                  width: '90vw',
                  height: '60vh',
                }}
              >
                <Box flex={2}>
                  <PlaceForm place={place} />
                </Box>
                <Box flex={1} paddingTop={1}>
                  <CardMedia
                    component="img"
                    image={`${previewImg}`}
                    style={{
                      width: '100%',
                      height: '50%',
                      objectFit: 'scale-down',
                    }}
                  />
                  <input
                    id="icon-button-file"
                    type="file"
                    ref={inputEl}
                    style={{ display: 'none' }}
                    onChange={(e) => handlePreviewImg(e)}
                  />
                  <Box display="flex" flexDirection="column">
                    <label htmlFor="icon-button-file">
                      <ButtonBase
                        component="span"
                        style={{
                          backgroundColor: '#e7e7e7',
                          width: '100%',
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
                  Xác nhận
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default UpdateProfile
