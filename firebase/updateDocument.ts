import { Category, MenuItem, Place } from '@/models/place'
import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'

const updatePlaceReview = (reviewID: string, placeID: string) => {
  const placeRef = firebase.firestore().collection('place').doc(placeID)

  placeRef.update({
    reviews: firebase.firestore.FieldValue.arrayUnion(reviewID),
  })
}

const updateUserReview = (reviewID: string, userID: string) => {
  const userRef = firebase.firestore().collection('user').doc(userID)

  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      userRef.update({
        reviews: firebase.firestore.FieldValue.arrayUnion(reviewID),
      })
    } else {
      userRef.set({
        reviews: firebase.firestore.FieldValue.arrayUnion(reviewID),
      })
    }
  })
}

const updatePlaceRating = (
  placeID: string,
  userID: string,
  reviewID: string,
  rating: number,
  date: string
) => {
  const placeRef = firebase.firestore().collection('place').doc(placeID)

  placeRef.update({
    [`rating.${userID}`]: firebase.firestore.FieldValue.arrayUnion({
      reviewID: reviewID,
      rating: rating,
      date: date,
    }),
  })
}

const updateBackup = () => {
  const placeRef = firebase
    .firestore()
    .collection('place')
    .doc('1sfXtIdNJOzFvD15kMLl')

  placeRef.set({
    rating: {
      sZ4LhHIwNRO3xQQCjeJg76d9qwx1: [
        {
          date: '12 11 2021, 5:11:07 ch',
          reviewID: 'K4aBVig3npRQSaUw6dUS',
          rating: 4,
        },
        {
          date: '12 11 2021, 5:12:50 ch',
          reviewID: 'fS9tPKHfx4pSttSE1c8b',
          rating: 4,
        },
      ],
    },
    show: true,
    phone: '0586128625',
    type: 'Quán ăn',
    name: 'Cơm Tấm Sườn Que - Yết Kiêu',
    address: {
      province: 'Tỉnh Khánh Hòa',
      city: 'Thành phố Nha Trang',
      ward: 'Phường Vạn Thắng',
      street: '3 Yết Kiêu',
    },
    categories: {
      '0': { name: 'Món đang giảm', items: [4] },
      '1': { items: [1, 5], name: 'Combo' },
      '2': { items: [4], name: 'Cơm' },
      '3': { items: [3, 6], name: 'Gọi thêm' },
    },
    createdDate: 'October 8th 2021, 9:12:29 pm',
    activeDate: moment(
      moment(
        'October 8th 2021, 09:12:29 PM',
        'MMMM Do YYYY, hh:mm:ss A'
      ).format('LLL'),
      'MMMM Do YYYY, hh:mm:ss A'
    ).fromNow(),
    reviews: [
      'ZTpYg3ue8bY2D4ltNodi',
      'oFqsS7vsC9RPG0ZAvM3R',
      '2sH2GmddvLv4fYDwNACC',
      'Tb4VfrHVCmlxrgQydW4p',
      'K4aBVig3npRQSaUw6dUS',
      'fS9tPKHfx4pSttSE1c8b',
    ],
    time: { open: '08:00 AM', close: '08:00 PM' },
    menu: {
      '0': {
        image:
          'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/place_pictures%2FRl2KBm5pkobdVhYEBEJU%2F1.jpeg?alt=media&token=a1c3c888-686d-4d1a-8cc7-b32274c9e014',
        name: 'Cơm tấm sườn miếng sốt Maki mật ong',
        price: 38000,
        description: 'Sườn ướp đượm vị cùng sốt siêu ngon',
      },
      '1': {
        price: 85000,
        image:
          'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/place_pictures%2FRl2KBm5pkobdVhYEBEJU%2F2.jpeg?alt=media&token=2bc112bc-6499-4080-a99a-7ed0b61529d8',
        name: 'Combo ăn ngon',
        description: '1 Cơm sườn que sốt Maki + 1 Cơm sườn que Maki + ốp la',
      },
      '2': {
        price: 5000,
        name: 'Cơm thêm',
        image:
          'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/place_pictures%2FRl2KBm5pkobdVhYEBEJU%2F4.jpeg?alt=media&token=9ea83dac-e9e0-4871-b0eb-00fb6302bf93',
        description: '',
      },
      '3': {
        name: 'Cơm tấm sườn mì tôm',
        price: 20000,
        description: 'Là cơm tấm + mì tôm',
        image:
          'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/place_pictures%2FRl2KBm5pkobdVhYEBEJU%2F2.jpeg?alt=media&token=2bc112bc-6499-4080-a99a-7ed0b61529d8',
      },
      '4': {
        description: 'Sườn ướp đượm vị cùng sốt siêu ngon heyooo',
        name: 'Cơm tấm sườn miếng sốt Maki + ốp la',
        price: 43000,
        image:
          'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/place_pictures%2F1sfXtIdNJOzFvD15kMLl%2F5.jpeg?alt=media&token=3b56abc8-7d4d-4006-a09b-9bb47d911846',
      },
      '5': {
        name: 'Combo ngày hè',
        image:
          'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/place_pictures%2FRl2KBm5pkobdVhYEBEJU%2F2.jpeg?alt=media&token=2bc112bc-6499-4080-a99a-7ed0b61529d8',
        description:
          '1 Cơm tấm sườn que sốt Maki mật ong -- 1 Cơm tấm sườn miếng sốt Maki + ốp la -- 1 Cơm tấm sườn que sốt Maki + ốp la -- 3 Nước râu bắp',
        price: 185000,
      },
      '6': {
        name: 'Trứng thêm',
        description: '',
        image:
          'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/place_pictures%2F1sfXtIdNJOzFvD15kMLl%2Feggs.jpeg?alt=media&token=16ebfbb1-8fa8-464b-a9d8-c365ee6e5aa5',
        price: 5000,
      },
      '7': {
        price: 0,
        description: '',
        name: 'Nước râu bắp',
        image:
          'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/place_pictures%2F1sfXtIdNJOzFvD15kMLl%2Fn%C6%B0%E1%BB%9Bc%20r%C3%A2u%20b%E1%BA%AFp.jpeg?alt=media&token=ed005e37-c4eb-41dd-bddf-7d853cdd3034',
      },
    },
    image:
      'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/place_pictures%2FRl2KBm5pkobdVhYEBEJU%2Fmain%20pic.jpeg?alt=media&token=f21a70b5-ee5c-4d69-9f34-c51fabfd1f90',
    location: { lat: 12.2515559, lng: 109.1892444 },
  })
}

const updateReviewLikes = (
  reviewID: string,
  userID: string,
  status: string
) => {
  const reviewRef = firebase.firestore().collection('review').doc(reviewID)

  status === 'like'
    ? reviewRef.update({
        likes: firebase.firestore.FieldValue.arrayUnion(userID),
      })
    : reviewRef.update({
        likes: firebase.firestore.FieldValue.arrayRemove(userID),
      })
}

const updateReviewComment = (
  reviewID: string,
  userID: string,
  date: string,
  content: string
) => {
  const reviewRef = firebase.firestore().collection('review').doc(reviewID)

  reviewRef.update({
    comments: firebase.firestore.FieldValue.arrayUnion({
      userID: userID,
      date: date,
      content: content,
    }),
  })
}

const updateMenuCategory = async (placeID: string, category: Category) => {
  moment.locale('en')
  firebase
    .firestore()
    .collection('place')
    .doc(placeID)
    .update({
      categories: category,
      activeDate: moment(
        moment().format('LLL'),
        'MMMM Do YYYY, hh:mm:ss A'
      ).fromNow(),
    })
}

const updateMenuItem = async (
  placeID: string,
  itemID: number,
  item: MenuItem
) => {
  moment.locale('en')
  firebase
    .firestore()
    .collection('place')
    .doc(placeID)
    .update({
      [`menu.${itemID}`]: item,
      activeDate: moment(
        moment().format('LLL'),
        'MMMM Do YYYY, hh:mm:ss A'
      ).fromNow(),
    })
}

const updatePlaceInfo = async (
  placeID: string,
  placeInfo: Place,
  imgUrl: string
) => {
  moment.locale('en')
  firebase
    .firestore()
    .collection('place')
    .doc(placeID)
    .update({
      address: placeInfo.address,
      name: placeInfo.name,
      phone: placeInfo.phone,
      type: placeInfo.type,
      time: placeInfo.time,
      image: imgUrl,
      activeDate: moment(
        moment().format('LLL'),
        'MMMM Do YYYY, hh:mm:ss A'
      ).fromNow(),
    })
}
const updatePlaceLocation = async (placeID: string, res: any) => {
  firebase.firestore().collection('place').doc(placeID).update({
    location: res.data.results[0].geometry.location,
    // ['location.lat']: Number(res.data[0].lat),
    // ['location.lng']: Number(res.data[0].lon),
  })
}

const deleteMenuItem = async (placeID: string, itemID: number) => {
  moment.locale('en')
  firebase
    .firestore()
    .collection('place')
    .doc(placeID)
    .update({
      [`menu.${itemID}`]: firebase.firestore.FieldValue.delete(),
      activeDate: moment(
        moment().format('LLL'),
        'MMMM Do YYYY, hh:mm:ss A'
      ).fromNow(),
    })
}

const verifyPlace = (placeID: string, verify: boolean) => {
  firebase.firestore().collection('place').doc(placeID).update({ show: verify })
}

const updateReviewsAfterDeletedPlace = (
  userID: string,
  newReviews: string[]
) => {
  firebase.firestore().collection('user').doc(userID).update({
    reviews: newReviews,
  })
}

const updateUserProfile = (
  userID: string,
  displayName: string,
  profilePic: string
) => {
  const userRef = firebase.firestore().collection('user').doc(userID)

  userRef.update({
    name: displayName,
    profilePic: profilePic,
  })
}

export default {
  updatePlaceReview,
  updateUserReview,
  updatePlaceRating,
  updateBackup,
  updateReviewLikes,
  updateReviewComment,
  updateMenuCategory,
  updateMenuItem,
  updatePlaceInfo,
  updatePlaceLocation,
  deleteMenuItem,
  verifyPlace,
  updateReviewsAfterDeletedPlace,
  updateUserProfile,
}
