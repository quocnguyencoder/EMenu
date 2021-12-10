import {
  Box,
  Modal,
  Fade,
  Backdrop,
  Typography,
  Button,
} from '@material-ui/core'
import { Category, Menu } from '@/models/place'
import { useStyles } from '@/styles/modal'
import 'firebase/storage'
import * as updateService from '@/firebase/updateDocument'

interface Props {
  menu: Menu
  categories: Category
  placeID: string
  itemID: number
  itemCategoryList: number[]
  modalDeleteMenuItem: boolean
  handleCloseModal: () => void
}

const DeleteMenuItem = ({
  menu,
  categories,
  placeID,
  itemID,
  itemCategoryList,
  modalDeleteMenuItem,
  handleCloseModal,
}: Props) => {
  const classes = useStyles()

  const handleDelete = () => {
    const cate = { ...categories }
    for (let i = 0; i < itemCategoryList.length; i++) {
      if (cate[itemCategoryList[i]].items.indexOf(itemID) >= 0) {
        cate[itemCategoryList[i]].items.splice(
          cate[itemCategoryList[i]].items.indexOf(itemID),
          1
        )
      }
    }
    updateService.default.updateMenuCategory(placeID, cate).then(() => {
      updateService.default.deleteMenuItem(placeID, itemID).then(() => {
        handleCloseModal()
        alert(`Đã xóa món ${menu[itemID].name} ra khỏi menu`)
      })
    })
  }

  return (
    <Modal
      className={classes.modal}
      open={modalDeleteMenuItem}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalDeleteMenuItem}>
        <Box className={classes.paper}>
          <Typography>
            Bạn có chắc chắn muốn xóa <br />
            <b style={{ color: '#D14B28' }}>{menu[itemID].name}</b> ra khỏi{' '}
            <br />
            menu chứ?
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

export default DeleteMenuItem
