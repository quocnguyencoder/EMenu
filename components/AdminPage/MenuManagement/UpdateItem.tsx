import {
  Box,
  Modal,
  Fade,
  Backdrop,
  Typography,
  CardMedia,
  Button,
} from '@material-ui/core'
import { Category, MenuItem } from '../../../models/place'
import { useStyles } from '../../../styles/modal'
import { useRef, useState } from 'react'
import ItemForm from './ItemForm'
import SelectCategories from './SelectCategories'
import firebase from 'firebase/app'
import 'firebase/storage'

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
  handleCloseModal: () => void
}

const UpdateItem = ({
  categories,
  itemInfo,
  itemID,
  itemCategoryList,
  placeID,
  openModal,
  updateMenu,
  handleCloseModal,
}: Props) => {
  const classes = useStyles()

  const [selectedCategories, setSelectedCategories] =
    useState<number[]>(itemCategoryList)

  const [previewImg, setPreviewImg] = useState<string>(itemInfo.image)
  const inputEl = useRef(null)
  const cate = { ...categories }

  const handleChangeCategory = (selectedList: number[]) => {
    setSelectedCategories(selectedList.sort((a, b) => (a > b ? 1 : -1)))
  }

  const handlePreviewImg = (e: any) => {
    if (e.type.includes('image')) {
      setPreviewImg(URL.createObjectURL(e))
    } else {
      alert(`File is not an image or gif`)
    }
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
        cate[deleteList[i]].items.splice(
          cate[deleteList[i]].items.indexOf(itemID),
          1
        )
      }
      for (let i = 0; i < updateList.length; i++) {
        cate[updateList[i]].items.push(itemID)
        cate[updateList[i]].items.sort((a, b) => (a > b ? 1 : -1))
      }

      firebase
        .firestore()
        .collection('place')
        .doc(placeID)
        .update({
          categories: cate,
        })
        .then(() => updateMenu(itemID, data, cate))
    } else {
      updateMenu(itemID, data, cate)
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // @ts-expect-error: to stop error
    // eslint-disable-next-line
    const imageAsFile = inputEl.current!.files[0]
    if (imageAsFile === null || imageAsFile === undefined) {
      const data = {
        description: e.target.Description.value,
        image: itemInfo.image,
        name: e.target.Name.value,
        price: e.target.Price.value,
      }
      firebase
        .firestore()
        .collection('place')
        .doc(placeID)
        .update({
          ['menu.' + itemID]: data,
        })
        .then(() => {
          handleUpdateCategory(data)
          alert(`Update successful`)
        })
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
            firebase
              .storage()
              .ref(`/place_pictures/${placeID}/`)
              .child(imageAsFile.name)
              .getDownloadURL()
              .then((fireBaseUrl) => {
                const data = {
                  description: e.target.Description.value,
                  image: fireBaseUrl,
                  name: e.target.Name.value,
                  price: e.target.Price.value,
                }
                firebase
                  .firestore()
                  .collection('place')
                  .doc(placeID)
                  .update({
                    ['menu.' + itemID]: data,
                  })
                  .then(() => {
                    handleUpdateCategory(data)
                    alert(`Update successful`)
                  })
              })
          }
        )
      } else {
        alert(`File is not an image or gif`)
      }
    }
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
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  )
}

export default UpdateItem
