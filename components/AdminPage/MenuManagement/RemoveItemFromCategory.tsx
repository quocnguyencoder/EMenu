import {
  Box,
  Modal,
  Fade,
  Backdrop,
  Typography,
  Button,
} from '@material-ui/core'
import { Category, MenuItem } from '../../../models/place'
import { useStyles } from '../../../styles/modal'
import firebase from 'firebase/app'
import 'firebase/storage'

interface Props {
  categories: Category
  categoryID: number
  itemID: number
  itemInfo: MenuItem
  placeID: string
  updateMenu: (
    index: number,
    item: MenuItem,
    updateCategories: Category
  ) => void
  openModalRemove: boolean
  handleCloseModal: () => void
}

const RemoveItemFromCategory = ({
  categories,
  categoryID,
  itemID,
  itemInfo,
  placeID,
  updateMenu,
  openModalRemove,
  handleCloseModal,
}: Props) => {
  const classes = useStyles()

  const handleRemove = () => {
    const cate = { ...categories }
    if (cate[categoryID].items.indexOf(itemID) >= 0) {
      cate[categoryID].items.splice(cate[categoryID].items.indexOf(itemID), 1)
      firebase
        .firestore()
        .collection('place')
        .doc(placeID)
        .update({
          categories: cate,
        })
        .then(() => {
          updateMenu(itemID, itemInfo, cate)
          handleCloseModal()
          alert(`Remove successful`)
        })
    }
  }

  return (
    <Modal
      className={classes.modal}
      open={openModalRemove}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalRemove}>
        <Box className={classes.paper}>
          <Typography>
            Bạn có chắc chắn muốn bỏ <br />
            <b style={{ color: '#D14B28' }}>{itemInfo.name}</b> ra khỏi <br />
            <b style={{ color: '#D14B28' }}>
              {categories[categoryID].name}
            </b>{' '}
            chứ?
          </Typography>
          <Box style={{ textAlign: 'center' }}>
            <Button
              onClick={handleRemove}
              className={classes.button}
              size="large"
              color="primary"
              style={{ margin: '0 3% 0 3%' }}
            >
              OK
            </Button>
            <Button
              onClick={handleCloseModal}
              className={classes.button}
              size="large"
              color="primary"
              style={{ margin: '0 3% 0 3%' }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default RemoveItemFromCategory
