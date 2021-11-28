import {
  Box,
  Modal,
  Fade,
  Backdrop,
  Typography,
  Button,
  Snackbar,
} from '@material-ui/core'
import { Category, MenuItem } from '../../../models/place'
import { useStyles } from '../../../styles/modal'
import 'firebase/storage'
import * as updateService from '@/firebase/updateDocument'
import { SnackbarOrigin } from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import type { Color } from '@material-ui/lab/Alert'
import { useState } from 'react'

interface State extends SnackbarOrigin {
  open: boolean
}

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

  const handleRemove = () => {
    const cate = { ...categories }
    if (cate[categoryID].items.indexOf(itemID) >= 0) {
      cate[categoryID].items.splice(cate[categoryID].items.indexOf(itemID), 1)
      updateService.default.updateMenuCategory(placeID, cate).then(() => {
        updateMenu(itemID, itemInfo, cate)
        handleOpenAlert(`Bỏ món ăn ra khỏi loại thành công`, `success`)
        setTimeout(() => {
          handleCloseModal()
        }, 1000)
      })
    }
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={1000}
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
    </>
  )
}

export default RemoveItemFromCategory
