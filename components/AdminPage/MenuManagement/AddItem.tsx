import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  CardMedia,
  InputBase,
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useState, useRef } from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'
import { Category, CategoryInfo, Menu, MenuItem } from '../../../models/place'
import ItemForm from './ItemForm'
import SelectCategories from './SelectCategories'

interface Props {
  categories: Category
  placeID: string
  adminMenu: Menu
  addToMenu: (index: number, item: MenuItem, updateCategories: Category) => void
}

export default function AddItem({
  categories,
  placeID,
  adminMenu,
  addToMenu,
}: Props) {
  const classes = useStyles()
  const [option, setOption] = useState('select')
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [previewImg, setPreviewImg] = useState<string>()

  const inputEl = useRef(null)

  const handleChange = (selectedOption: string) => {
    setOption(selectedOption)
  }

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

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const temp = Object.keys(adminMenu).map(Number).pop()
    const newItemID = temp === undefined ? 0 : temp + 1
    let cate = { ...categories }

    // @ts-expect-error: to stop error
    // eslint-disable-next-line
    const imageAsFile = inputEl.current!.files[0]

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
              } as MenuItem
              firebase
                .firestore()
                .collection('place')
                .doc(placeID)
                .update({
                  ['menu.' + `${newItemID}`]: data,
                })
                .then(() => {
                  if (option === 'select') {
                    for (let i = 0; i < selectedCategories.length; i++) {
                      cate[selectedCategories[i]].items.push(newItemID)
                    }
                  } else {
                    const tempCategoryID = Object.keys(categories)
                      .map(Number)
                      .pop()
                    const newCategoryID =
                      tempCategoryID === undefined ? 0 : tempCategoryID + 1
                    const cateInfo = {
                      items: [newItemID],
                      name: e.target.newCategory.value,
                    } as CategoryInfo
                    cate = { ...categories, [newCategoryID]: { ...cateInfo } }
                  }
                  firebase.firestore().collection('place').doc(placeID).update({
                    categories: cate,
                  })
                  alert(`Add item successfully`)
                  addToMenu(newItemID, data, cate)
                })
            })
        }
      )
    } else alert(`File is not an image or gif`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex">
        <Box flex={1}>
          <ItemForm
            item={{ name: '', description: '', price: 0 } as MenuItem}
          />
          <RadioGroup
            row
            defaultValue="select"
            onChange={(e) => handleChange(e.target.value)}
          >
            <FormControlLabel
              value="select"
              control={<Radio />}
              label="Select Category"
            />
            <FormControlLabel
              value="new"
              control={<Radio />}
              label="New Category"
            />
          </RadioGroup>
          <InputLabel>Category</InputLabel>
          {option == 'select' ? (
            <SelectCategories
              selectedCategories={selectedCategories}
              handleChangeCategory={handleChangeCategory}
              categories={categories}
            />
          ) : (
            <InputBase
              style={{
                border: '1px solid',
                borderRadius: '5px',
                padding: '0 1% 0 1%',
              }}
              required
              name="newCategory"
            />
          )}
          <Box mt={2}>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Box flex={1}>
          <CardMedia
            component="img"
            image={`${previewImg}`}
            style={{ width: '70%', height: '70%', objectFit: 'scale-down' }}
          />
          <input
            type="file"
            ref={inputEl}
            required
            // @ts-expect-error: to stop error
            // eslint-disable-next-line
            onChange={(e) => handlePreviewImg(e.target.files[0])}
          />
        </Box>
      </Box>
    </form>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      backgroundColor: '#00A98F',
      '&:hover': {
        backgroundColor: '#F9A54A',
      },
    },
  })
)
