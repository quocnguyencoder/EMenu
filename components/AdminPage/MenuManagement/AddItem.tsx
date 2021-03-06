import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  InputBase,
  Paper,
} from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useState, useRef } from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'
import { Category, CategoryInfo, Menu, MenuItem } from '@/models/place'
import ItemForm from './ItemForm'
import SelectCategories from './SelectCategories'
import * as getService from '@/firebase/getDocument'
import * as updateService from '@/firebase/updateDocument'
import type { Color } from '@material-ui/lab/Alert'
import SnackBar from '@/components/common/SnackBar'
import Incredients from './Incredients'
import { MenuItemIncredients } from '@/models/incredient'
import ImagePreview from './ImagePreview'

interface Props {
  categories: Category
  placeID: string
  menu: Menu
}

export default function AddItem({ categories, placeID, menu }: Props) {
  const classes = useStyles()
  const [option, setOption] = useState('select')
  const [itemIncredient, setItemIncredient] = useState<MenuItemIncredients>({})
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [previewImg, setPreviewImg] = useState('')
  const [disableBtn, setDisableBtn] = useState(false)
  const inputEl = useRef(null)

  const [message, setMessage] = useState({
    text: '',
    severity: 'error' as Color,
    open: false,
  })

  const handlePreviewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files[0] === undefined) {
      return
    } else
      e.target.files[0].type.includes('image')
        ? setPreviewImg(URL.createObjectURL(e.target.files[0]))
        : handleOpenAlert(`File không phải là hình ảnh hoặc gif`, `error`)
  }

  const handleOpenAlert = (text: string, severity: Color) => {
    setMessage({
      text: text,
      severity: severity,
      open: true,
    })
  }

  const handleChange = (selectedOption: string) => {
    setOption(selectedOption)
  }

  const handleChangeCategory = (selectedList: number[]) => {
    setSelectedCategories(selectedList.sort((a, b) => (a > b ? 1 : -1)))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setDisableBtn(true)
    const temp = Object.keys(menu).map(Number).pop()
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
          getService.default
            .getNewImage(placeID, imageAsFile.name)
            .then((fireBaseUrl) => {
              const data = {
                description: e.target.Description.value,
                image: fireBaseUrl,
                name: e.target.Name.value,
                price: Number(e.target.Price.value),
                discount: 0,
                incredients: itemIncredient,
              } as MenuItem
              updateService.default
                .updateMenuItem(placeID, newItemID, data)
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
                  updateService.default
                    .updateMenuCategory(placeID, cate)
                    .then(() => {
                      handleOpenAlert(`Thêm món ăn thành công`, `success`)
                      // @ts-expect-error: to stop error
                      // eslint-disable-next-line
                      inputEl.current!.value = null
                      setSelectedCategories([])
                      setPreviewImg('')
                      setDisableBtn(false)
                    })
                })
            })
        }
      )
    } else {
      handleOpenAlert(`File không phải là hình ảnh hoặc gif`, `error`)
      setDisableBtn(false)
    }
  }

  return (
    <>
      <SnackBar message={message} setMessage={setMessage} />
      <form onSubmit={handleSubmit}>
        <Box
          mr="1rem"
          style={{
            gap: '3%',
          }}
        >
          <Paper variant="outlined" style={{ marginTop: '1rem' }}>
            <Box display="flex" p={1}>
              <Box flex={2}>
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
                    label="Chọn loại có sẵn"
                  />
                  <FormControlLabel
                    value="new"
                    control={<Radio />}
                    label="Loại món ăn mới"
                  />
                </RadioGroup>
                <InputLabel>Loại</InputLabel>
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
              </Box>
              <ImagePreview
                previewImg={previewImg}
                inputEl={inputEl}
                handlePreviewImg={handlePreviewImg}
              />
            </Box>
          </Paper>
          <Incredients
            itemIncredient={itemIncredient}
            setItemIncredient={setItemIncredient}
          />
          <Box mt={2}>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              disabled={disableBtn}
            >
              Xác nhận
            </Button>
          </Box>
        </Box>
      </form>
    </>
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
