import {
  Box,
  Modal,
  Fade,
  Backdrop,
  Typography,
  Button,
} from '@material-ui/core'
import { Category, MenuItem } from '@/models/place'
import { useStyles } from '@/styles/modal'
import 'firebase/storage'
import * as updateService from '@/firebase/updateDocument'
import type { Color } from '@material-ui/lab/Alert'
import { useState } from 'react'
import SnackBar from '@/components/common/SnackBar'

interface Props {
  categories: Category
  categoryID: number
  itemID: number
  itemInfo: MenuItem
  placeID: string
  openModalRemove: boolean
  handleCloseModal: () => void
}

const RemoveItemFromCategory = ({
  categories,
  categoryID,
  itemID,
  itemInfo,
  placeID,
  openModalRemove,
  handleCloseModal,
}: Props) => {
  const classes = useStyles()

  const [message, setMessage] = useState({
    text: '',
    severity: 'error' as Color,
    open: false,
  })
  const handleOpenAlert = (text: string, severity: Color) => {
    setMessage({
      text: text,
      severity: severity,
      open: true,
    })
  }

  const handleRemove = () => {
    const cate = { ...categories }
    if (cate[categoryID].items.indexOf(itemID) >= 0) {
      cate[categoryID].items.splice(cate[categoryID].items.indexOf(itemID), 1)
      updateService.default.updateMenuCategory(placeID, cate).then(() => {
        handleOpenAlert(`Bỏ món ăn ra khỏi loại thành công`, `success`)
        setTimeout(() => {
          handleCloseModal()
        }, 1000)
      })
    }
  }

  return (
    <>
      <SnackBar message={message} setMessage={setMessage} />
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
    </>
  )
}

export default RemoveItemFromCategory
