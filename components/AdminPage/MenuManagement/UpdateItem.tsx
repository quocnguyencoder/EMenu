import {
  Box,
  Modal,
  Fade,
  Backdrop,
  Typography,
  CardMedia,
  Button,
  Snackbar,
} from '@material-ui/core'
import { SnackbarOrigin } from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { Category, MenuItem } from '../../../models/place'
import { useStyles } from '../../../styles/modal'
import { useRef, useState } from 'react'
import ItemForm from './ItemForm'
import SelectCategories from './SelectCategories'
import * as updateService from '@/firebase/updateDocument'
import * as getService from '@/firebase/getDocument'
import firebase from 'firebase/app'
import 'firebase/storage'
import type { Color } from '@material-ui/lab/Alert'

interface Props {
  categories: Category
  itemInfo: MenuItem
  itemID: number
  itemCategoryList: number[]
  placeID: string
  openModal: boolean
  updateMenu: (
    index: number,
    item: MenuItem,
    updateCategories: Category
  ) => void
  setItemCategoryList: any
  handleCloseModal: () => void
}

interface State extends SnackbarOrigin {
  open: boolean
}

const UpdateItem = ({
  categories,
  itemInfo,
  itemID,
  itemCategoryList,
  placeID,
  openModal,
  updateMenu,
  setItemCategoryList,
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
  const [disableBtn, setDisableBtn] = useState(false)
  const [selectedCategories, setSelectedCategories] =
    useState<number[]>(itemCategoryList)

  const [previewImg, setPreviewImg] = useState<string>(itemInfo.image)
  const inputEl = useRef(null)
  const cate = { ...categories }

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

  const handleChangeCategory = (selectedList: number[]) => {
    setSelectedCategories(selectedList.sort((a, b) => (a > b ? 1 : -1)))
  }

  const handlePreviewImg = (e: any) => {
    if (e.type.includes('image')) {
      setPreviewImg(URL.createObjectURL(e))
    } else {
      handleOpenAlert(`File không phải là hình ảnh hoặc gif`, `error`)
    }
  }

  const notChangeCategory = () => {
    const deleteList = itemCategoryList.filter(
      (categoryID) => !selectedCategories.includes(categoryID)
    )
    const updateList = selectedCategories.filter(
      (categoryID) => !itemCategoryList.includes(categoryID)
    )
    if (deleteList.length === 0 && updateList.length === 0) return true
    return false
  }

  const handleUpdateCategory = (data: MenuItem) => {
    const deleteList = itemCategoryList.filter(
      (categoryID) => !selectedCategories.includes(categoryID)
    )
    const updateList = selectedCategories.filter(
      (categoryID) => !itemCategoryList.includes(categoryID)
    )
    if (deleteList.length > 0 || updateList.length > 0) {
      for (let i = 0; i < deleteList.length; i++) {
        if (cate[deleteList[i]].items.indexOf(itemID) >= 0) {
          cate[deleteList[i]].items.splice(
            cate[deleteList[i]].items.indexOf(itemID),
            1
          )
        }
      }
      for (let i = 0; i < updateList.length; i++) {
        cate[updateList[i]].items.push(itemID)
        cate[updateList[i]].items.sort((a, b) => (a > b ? 1 : -1))
      }

      updateService.default.updateMenuCategory(placeID, cate).then(() => {
        setItemCategoryList(selectedCategories)
        updateMenu(itemID, data, cate)
      })
    } else {
      updateMenu(itemID, data, cate)
    }
    handleOpenAlert(`Cập nhật thành công`, `success`)
    setDisableBtn(false)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setDisableBtn(true)

    // @ts-expect-error: to stop error
    // eslint-disable-next-line
    const imageAsFile = inputEl.current!.files[0]
    if (imageAsFile === null || imageAsFile === undefined) {
      const data = {
        description: e.target.Description.value,
        image: itemInfo.image,
        name: e.target.Name.value,
        price: Number(e.target.Price.value),
      } as MenuItem
      if (
        itemInfo.description === data.description &&
        itemInfo.name === data.name &&
        itemInfo.price == data.price &&
        notChangeCategory()
      ) {
        setDisableBtn(false)
        handleOpenAlert(`Không thể cập nhật vì dữ liệu giống nhau`, `warning`)
      } else {
        updateService.default.updateMenuItem(placeID, itemID, data).then(() => {
          handleUpdateCategory(data)
        })
      }
    } else {
      if (imageAsFile.type.includes('image')) {
        const uploadTask = firebase
          .storage()
          .ref(`/place_pictures/${placeID}/${imageAsFile.name}`)
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
              .getNewImage(placeID, imageAsFile.name)
              .then((fireBaseUrl) => {
                const data = {
                  description: e.target.Description.value,
                  image: fireBaseUrl,
                  name: e.target.Name.value,
                  price: Number(e.target.Price.value),
                } as MenuItem
                updateService.default
                  .updateMenuItem(placeID, itemID, data)
                  .then(() => {
                    handleUpdateCategory(data)
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
              <Box display="flex" style={{ gap: '4%' }}>
                <Box flex={1}>
                  <ItemForm item={itemInfo} />
                  <Box alignItems="center" display="flex" marginBottom="1%">
                    <Typography style={{ marginRight: '1%' }}>
                      Category:
                    </Typography>
                    <SelectCategories
                      selectedCategories={selectedCategories}
                      handleChangeCategory={handleChangeCategory}
                      categories={categories}
                    />
                  </Box>
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
    </>
  )
}

export default UpdateItem
