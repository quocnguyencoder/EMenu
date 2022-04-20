import {
  Box,
  Modal,
  Fade,
  Backdrop,
  Typography,
  CardMedia,
  Button,
  ButtonBase,
} from '@material-ui/core'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { Category, MenuItem } from '@/models/place'
import { useStyles } from '@/styles/modal'
import { useRef, useState } from 'react'
import ItemForm from './ItemForm'
import SelectCategories from './SelectCategories'
import * as updateService from '@/firebase/updateDocument'
import * as getService from '@/firebase/getDocument'
import firebase from 'firebase/app'
import 'firebase/storage'
import type { Color } from '@material-ui/lab/Alert'
import SnackBar from '@/components/common/SnackBar'

interface Props {
  categories: Category
  itemInfo: MenuItem
  itemID: number
  itemCategoryList: number[]
  placeID: string
  openModal: boolean
  handleCloseModal: () => void
  setItemCategoryList: React.Dispatch<React.SetStateAction<number[]>>
}

const UpdateItem = ({
  categories,
  itemID,
  itemInfo,
  itemCategoryList,
  placeID,
  openModal,
  handleCloseModal,
  setItemCategoryList,
}: Props) => {
  const classes = useStyles()
  const [message, setMessage] = useState({
    text: '',
    severity: 'error' as Color,
    open: false,
  })
  const [disableBtn, setDisableBtn] = useState(false)
  const [selectedCategories, setSelectedCategories] =
    useState<number[]>(itemCategoryList)

  const [previewImg, setPreviewImg] = useState<string>(itemInfo.image)
  const inputEl = useRef(null)
  const cate = { ...categories }

  const handleOpenAlert = (text: string, severity: Color) => {
    setMessage({
      text: text,
      severity: severity,
      open: true,
    })
  }

  const handleChangeCategory = (selectedList: number[]) => {
    setSelectedCategories(selectedList.sort((a, b) => (a > b ? 1 : -1)))
  }

  const handlePreviewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files[0] === undefined) {
      return
    } else
      e.target.files[0].type.includes('image')
        ? setPreviewImg(URL.createObjectURL(e.target.files[0]))
        : handleOpenAlert(`File không phải là hình ảnh hoặc gif`, `error`)
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

  const handleUpdateCategory = () => {
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
        setItemCategoryList(
          Object.keys(categories)
            .map(Number)
            .reduce(
              (pre: number[], curr) =>
                categories[curr].items.includes(itemID) ? [...pre, curr] : pre,
              []
            )
        )
      })
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
        discount: 0,
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
          handleUpdateCategory()
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
                  discount: 0,
                } as MenuItem
                updateService.default
                  .updateMenuItem(placeID, itemID, data)
                  .then(() => {
                    handleUpdateCategory()
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
      <SnackBar message={message} setMessage={setMessage} />
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
              <Box
                display="flex"
                style={{
                  gap: '3%',
                  height: '60vh',
                  width: '90vw',
                }}
              >
                <Box flex={2}>
                  <ItemForm item={itemInfo} />
                  <Box alignItems="center" display="flex" marginBottom="1%">
                    <Typography style={{ marginRight: '1%' }}>Loại:</Typography>
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
                      maxWidth: '100%',
                      height: '50%',
                      objectFit: 'scale-down',
                    }}
                  />
                  <input
                    id="icon-button-file"
                    type="file"
                    ref={inputEl}
                    style={{ display: 'none' }}
                    onChange={(e) => handlePreviewImg(e)}
                  />
                  <Box display="flex" flexDirection="column">
                    <label htmlFor="icon-button-file">
                      <ButtonBase
                        component="span"
                        style={{
                          backgroundColor: '#e7e7e7',
                          width: '100%',
                        }}
                      >
                        <AddAPhotoIcon fontSize="large" />
                        <Typography variant="body2">Thêm ảnh</Typography>
                      </ButtonBase>
                    </label>
                  </Box>
                </Box>
              </Box>
              <Box style={{ textAlign: 'center' }}>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  disabled={disableBtn}
                >
                  Xác nhận
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
