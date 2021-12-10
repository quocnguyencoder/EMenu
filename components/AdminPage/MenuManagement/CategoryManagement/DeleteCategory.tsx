import React from 'react'
import {
  Box,
  Chip,
  MenuItem,
  Select,
  CardActions,
  Button,
} from '@material-ui/core'
import { Category } from '@/models/place'
import { useStyles } from '@/styles/modal'
import * as updateService from '@/firebase/updateDocument'

interface Props {
  selectedCategories: number[]
  handleDeleteCategory: (selectedList: number[]) => void
  categories: Category
  placeID: string
}

const DeleteCategory = ({
  selectedCategories,
  handleDeleteCategory,
  categories,
  placeID,
}: Props) => {
  const classes = useStyles()
  const handleSubmit = () => {
    const categoryList = Object.keys(categories).map(Number)
    const deleteList = categoryList.filter((category) =>
      selectedCategories.includes(category)
    )
    const categoryListAfterDeleted = deleteList.reduce((pre, deleteID) => {
      // eslint-disable-next-line
      const { [deleteID]: _, ...newList } = pre
      return newList
    }, categories)

    updateService.default.updateMenuCategory(placeID, categoryListAfterDeleted)
  }
  return (
    <Box display="flex" style={{ margin: '0 0 1% 1%' }}>
      <Select
        multiple
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
        style={{ minWidth: '10%' }}
      >
        {Object.keys(categories).map((c) => (
          <MenuItem key={`category ${c}`} value={Number(c)}>
            {categories[Number(c)].name}
          </MenuItem>
        ))}
      </Select>
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
