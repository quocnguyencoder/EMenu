import {
  Box,
  Button,
  CardActions,
  FormControl,
  OutlinedInput,
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

const AddCategory = ({ categories, placeID }: Props) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      newCategory: { value: string }
    }

    const temp = Object.keys(categories).map(Number).pop()
    const newCategoryID = temp === undefined ? 0 : temp + 1
    updateService.default.updateMenuCategory(placeID, {
      ...categories,
      [newCategoryID]: {
        name: target.newCategory.value,
        items: [] as number[],
      },
    })
    target.newCategory.value = ''
    handleOpenAlert(`Thêm loại món ăn thành công`, `success`)
  }
  return (
    <>
      <SnackBar message={message} setMessage={setMessage} />
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box display="flex" style={{ margin: '0 0 1% 1%' }}>
          <FormControl margin="dense" variant="outlined">
            <InputLabel>Tên loại</InputLabel>
            <OutlinedInput required name="newCategory" label="Tên loại" />
          </FormControl>
          <CardActions>
            <Button
              size="large"
              type="submit"
              className={classes.buttonLineGradient}
              variant="contained"
            >
              Xác nhận
            </Button>
          </CardActions>
        </Box>
      </form>
    </>
  )
}

export default AddCategory
