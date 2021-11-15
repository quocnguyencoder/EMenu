import {
  Box,
  Modal,
  Fade,
  Backdrop,
  CardMedia,
  Button,
} from '@material-ui/core'
import { useState, useRef } from 'react'
import { useStyles } from '../../styles/modal'
import { Address, Place, Time } from '../../models/place'
import PlaceForm from './PlaceForm'
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/storage'
import isEqual from 'lodash/isEqual'

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
  const [previewImg, setPreviewImg] = useState<string>(place.image)
  const inputEl = useRef(null)
  const [disableBtn, setDisableBtn] = useState(false)

  const handlePreviewImg = (e: any) => {
    if (e.type.includes('image')) {
      setPreviewImg(URL.createObjectURL(e))
    } else {
      alert(`File is not an image or gif`)
    }
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
          firebase
            .firestore()
            .collection('place')
            .doc(place.id)
            .update({
              location: res.data.results[0].geometry.location,
              // ['location.lat']: Number(res.data[0].lat),
              // ['location.lng']: Number(res.data[0].lon),
            })
            .then(() => {
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
          // eslint-disable-next-line
          //console.log(error)
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
    alert(`Cập nhật thông tin của địa điểm thành công`)
    setDisableBtn(false)
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
    if (imageAsFile === null || imageAsFile === undefined) {
      if (
        data.name === place.name &&
        data.phone === place.phone &&
        data.type === place.type &&
        isEqual(data.time, place.time) &&
        isEqual(data.address, place.address)
      ) {
        alert(`Không thể cập nhật vì dữ liệu giống nhau`)
        setDisableBtn(false)
      } else {
        firebase
          .firestore()
          .collection('place')
          .doc(place.id)
          .update({
            address: data.address,
            name: data.name,
            phone: data.phone,
            type: data.type,
            time: data.time,
          })
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
            firebase
              .storage()
              .ref(`/place_pictures/${place.id}/`)
              .child(imageAsFile.name)
              .getDownloadURL()
              .then((fireBaseUrl) => {
                firebase
                  .firestore()
                  .collection('place')
                  .doc(place.id)
                  .update({
                    image: fireBaseUrl,
                    address: data.address,
                    name: data.name,
                    phone: data.phone,
                    type: data.type,
                    time: data.time,
                  })
                  .then(() => {
                    handleUpdateLocation(data, fireBaseUrl)
                  })
              })
          }
        )
      } else {
        alert(`File không phải là hình ảnh hoặc gif`)
        setDisableBtn(false)
      }
    }
  }
  return (
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
            <Box display="flex" style={{ gap: '4%' }}>
              <Box flex={2}>
                <PlaceForm place={place} />
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
                  type="file"
                  ref={inputEl}
                  // @ts-expect-error: to stop error
                  // eslint-disable-next-line
                  onChange={(e) => handlePreviewImg(e.target.files[0])}
                />
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
        </Box>
      </Fade>
    </Modal>
  )
}

export default UpdateProfile
