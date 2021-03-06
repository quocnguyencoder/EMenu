import {
  Box,
  Button,
  CardActions,
  FormControl,
  OutlinedInput,
  Select,
  InputLabel,
} from '@material-ui/core'
import { useStyles } from '@/styles/modal'
import { Category } from '@/models/place'
import type { Color } from '@material-ui/lab/Alert'
import { useState } from 'react'
import * as updateService from '@/firebase/updateDocument'
import SnackBar from '@/components/common/SnackBar'

interface Props {
  categories: Category
  placeID: string
}

const UpdateCategory = ({ categories, placeID }: Props) => {
  const classes = useStyles()
  const categoryList = Object.keys(categories).map(Number)

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      categoryID: { value: number }
      newName: { value: string }
    }

    if (categories[target.categoryID.value].name === target.newName.value) {
      handleOpenAlert(`Không thể cập nhật vì tên trùng nhau`, `error`)
    } else {
      updateService.default.updateMenuCategory(placeID, {
        ...categories,
        [Number(target.categoryID.value)]: {
          name: target.newName.value,
          items: categories[Number(target.categoryID.value)].items,
        },
      })
      target.newName.value = ''
      handleOpenAlert(`Cập nhật loại món ăn thành công`, `success`)
    }
  }

  return (
    <>
      <SnackBar message={message} setMessage={setMessage} />
      <Box style={{ margin: '0 0 1% 1%' }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormControl
            margin="dense"
            variant="outlined"
            style={{ marginRight: '8px' }}
          >
            <InputLabel>Chọn loại</InputLabel>
            <Select native required name="categoryID" label="Chọn loại">
              <option value="" />
              {categoryList.map((categoryID: number) => (
                <option
                  key={`Category-${categoryID}-${categories[categoryID].name}`}
                  value={categoryID}
                >
                  {categories[categoryID].name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl margin="dense" variant="outlined">
            <InputLabel>Tên loại</InputLabel>
            <OutlinedInput required name="newName" label="Tên loại" />
          </FormControl>
          <CardActions>
            <Button
              size="large"
              className={classes.buttonLineGradient}
              variant="contained"
              type="submit"
            >
              Xác nhận
            </Button>
          </CardActions>
        </form>
      </Box>
    </>
  )
}

export default UpdateCategory
