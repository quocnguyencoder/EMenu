import firebase from 'firebase/app'
import { Coordinate, Place, Order } from '@/models/place'
import * as getService from './getDocument'
import * as updateService from './updateDocument'
import User from '@/models/user'
import moment from 'moment'

const createUserInfo = (
  uid: string,
  email: string | null,
  displayName: string | null,
  photoURL: string | null
) => {
  firebase
    .firestore()
    .collection('user')
    .doc(uid)
    .set({
      email: email != null ? email : '',
      name: displayName != null ? displayName : '',
      profilePic: photoURL != null ? photoURL : '',
      placeID: '',
      reviews: [] as string[],
    })
}
const createPlaceInfo = async (
  data: Place,
  initialPlace: Place,
  location: Coordinate,
  uid: string,
  imageAsFile: File
) => {
  firebase
    .firestore()
    .collection('place')
    .add({
      name: data.name,
      address: data.address,
      type: data.type,
      time: data.time,
      phone: data.phone,
      reviews: initialPlace.reviews,
      rating: initialPlace.rating,
      menu: initialPlace.menu,
      categories: initialPlace.categories,
      createdDate: initialPlace.createdDate,
      activeDate: initialPlace.activeDate,
      location: location,
      image: '',
      show: false,
    })
    .then((doc) => {
      firebase.firestore().collection('user').doc(uid).update({
        placeID: doc.id,
      })
      const obj: User = JSON.parse(sessionStorage.getItem('userInfo') || '{}')
      const userInfo: User = { ...obj, placeID: doc.id }
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      const uploadTask = firebase
        .storage()
        .ref(`/place_pictures/${doc.id}/${imageAsFile.name}`)
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
            .getNewImage(doc.id, imageAsFile.name)
            .then((fireBaseUrl) => {
              firebase.firestore().collection('place').doc(doc.id).update({
                image: fireBaseUrl,
              })
            })
        }
      )
    })
}

const createBillInfo = async (
  items: Order[],
  note: string,
  payment: string,
  placeID: string,
  status: string,
  userID: string,
  total: number,
  deliveryTo: string,
  phone: string,
  order: string[]
) => {
  moment.locale('en')
  firebase
    .firestore()
    .collection('bill')
    .add({
      items: items,
      note: note,
      datetime: moment().format('LLL'),
      payment: payment,
      placeID: placeID,
      status: status,
      userID: userID,
      deliveryTo: deliveryTo,
      phone: phone,
      total: total,
    })
    .then((doc) => {
      updateService.default.updatePlaceOrders(placeID, [...order, doc.id])
    })
}

export default { createUserInfo, createPlaceInfo, createBillInfo }
