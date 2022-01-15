import {
  Box,
  Chip,
  MenuItem,
  Select,
  CardActions,
  Button,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import { Category } from '@/models/place'
import { useStyles } from '@/styles/modal'
import * as updateService from '@/firebase/updateDocument'
import { useState } from 'react'

interface Props {
  categories: Category
  placeID: string
}

const DeleteCategory = ({ categories, placeID }: Props) => {
  const classes = useStyles()

  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const handleDeleteCategory = (selectedList: number[]) => {
    setSelectedCategories(selectedList.sort((a, b) => (a > b ? 1 : -1)))
  }

  const handleSubmit = () => {
    const categoryList = Object.keys(categories).map(Number)
    const deleteList = categoryList.filter((category) =>
      selectedCategories.includes(category)
    )
    if (deleteList.length > 0) {
      const categoryListAfterDeleted = deleteList.reduce((pre, deleteID) => {
        // eslint-disable-next-line
        const { [deleteID]: _, ...newList } = pre
        return newList
      }, categories)

      updateService.default.updateMenuCategory(
        placeID,
        categoryListAfterDeleted
      )
    }
  }
  return (
    <Box display="flex" style={{ margin: '0 0 1% 1%' }}>
      <FormControl
        margin="dense"
        variant="outlined"
        style={{ minWidth: '25%' }}
      >
        <InputLabel>Các loại món ăn cần xóa</InputLabel>
        <Select
          multiple
          label="Các loại món ăn cần xóa"
          value={selectedCategories}
          onChange={(e) => handleDeleteCategory(e.target.value as number[])}
          renderValue={(selected) => (
            <Box>
              {(selected as number[]).map(
                (value) =>
                  categories[value] !== undefined && (
                    <Chip
                      key={`select ${value}`}
                      label={categories[value].name}
                    />
                  )
              )}
            </Box>
          )}
        >
          {Object.keys(categories).map((c) => (
            <MenuItem key={`category ${c}`} value={Number(c)}>
              {categories[Number(c)].name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <CardActions>
        <Button
          size="large"
          className={classes.buttonLineGradient}
          variant="contained"
          onClick={handleSubmit}
        >
          Xác nhận
        </Button>
      </CardActions>
    </Box>
  )
}

export default DeleteCategory
