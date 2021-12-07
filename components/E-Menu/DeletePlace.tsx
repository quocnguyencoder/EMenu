import {
  Box,
  Modal,
  Fade,
  Backdrop,
  Typography,
  Button,
} from '@material-ui/core'
import { useStyles } from '@/styles/modal'
import * as updateService from '@/firebase/updateDocument'
import * as getService from '@/firebase/getDocument'
import User from '@/models/user'
import difference from 'lodash/difference'
import intersection from 'lodash/intersection'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Place } from '@/models/place'

interface Props {
  placesData: Place[]
  placeInfo: { id: string; name: string }
  openModal: boolean
  setPlacesData: any
  handleCloseModal: () => void
}

const DeletePlace = ({
  placesData,
  placeInfo,
  openModal,
  setPlacesData,
  handleCloseModal,
}: Props) => {
  const classes = useStyles()

  const handleDelete = async () => {
    const querySnapshotUser = await getService.default.getCollection('user')
    const querySnapshotReviews = await getService.default.getCollection(
      'review'
    )

    const owner = querySnapshotUser.docs.reduce((pre, curr) => {
      if (curr.data().placeID === placeInfo.id) {
        const data = curr.data() as User
        data.id = curr.id
        return data
      } else return pre
    }, {} as User)

    const allReviewsOfPlace = await getService.default.getAllReviewsOfPlace(
      placeInfo.id as string
    )

    //Xóa các bình luận của người dùng đã bình luận vào địa điểm bị xóa
    querySnapshotUser.docs.map((doc) => {
      const userInfo = doc.data() as User
      //intersection([1,2,3,4,5],[2,5,6,7]) -> [2,5]
      //difference([1,2,3,4,5],[2,5,6,7]) -> [1,3,4]
      if (intersection(userInfo.reviews, allReviewsOfPlace).length > 0) {
        updateService.default.updateReviewsAfterDeletedPlace(
          doc.id,
          difference(userInfo.reviews, allReviewsOfPlace)
        )
      }
    })

    //Xóa bình luận của địa điểm bị xóa trong collection
    querySnapshotReviews.docs.map((doc) => {
      allReviewsOfPlace.includes(doc.id) && doc.ref.delete()
    })

    //Xóa địa điểm
    firebase.firestore().collection('place').doc(placeInfo.id).delete()

    //Xóa các files trong folder của địa điểm
    firebase
      .storage()
      .ref(`place_pictures/${placeInfo.id}/`)
      .listAll()
      .then((listResults) => {
        const promises = listResults.items.map((item) => {
          return item.delete()
        })
        Promise.all(promises)
      })

    //Xét lại placeID của người dùng thành ''
    firebase.firestore().collection('user').doc(owner.id).update({
      placeID: '',
    })

    const newPlacesData = placesData.filter(
      (placeData) => placeData.id !== placeInfo.id
    )
    handleCloseModal()
    alert(`Đã xóa địa điểm ${placeInfo.name} ra khỏi cơ sở dữ liệu`)
    setPlacesData(newPlacesData)
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
          <Typography style={{ color: 'red' }}>
            <b>
              CẢNH BÁO: MỘT KHI ĐÃ XÓA THÌ SẼ KHÔNG KHÔI PHỤC LẠI DỮ LIỆU ĐƯỢC
            </b>
          </Typography>
          <Typography>
            Bạn có chắc chắn muốn xóa địa điểm{' '}
            <b style={{ color: '#D14B28' }}>{placeInfo.name}</b> không?
          </Typography>
          <Box style={{ textAlign: 'center' }}>
            <Button
              onClick={handleDelete}
              className={classes.button}
              size="large"
              color="primary"
              style={{ margin: '0 3% 0 3%' }}
            >
              Có
            </Button>
            <Button
              onClick={handleCloseModal}
              className={classes.button}
              size="large"
              color="primary"
              style={{ margin: '0 3% 0 3%' }}
            >
              Không
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default DeletePlace
