import firebase from 'firebase/app'
import { Coordinate, Place } from '@/models/place'
import * as getService from './getDocument'
import User from '@/models/user'

const createUserInfo = (
  uid: string,
  email: string | null,
  displayName: string | null
) => {
  firebase
    .firestore()
    .collection('user')
    .doc(uid)
    .set({
      email: email != null ? email : '',
      name: displayName != null ? displayName : '',
      profilePic: '',
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

export default { createUserInfo, createPlaceInfo }
