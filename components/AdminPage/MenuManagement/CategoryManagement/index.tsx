import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardActions,
  FormControl,
  OutlinedInput,
} from '@material-ui/core'
import { useStyles } from '@/styles/modal'
import { Category } from '@/models/place'
import DeleteCategory from './DeleteCategory'

interface Props {
  adminCategories: Category
  placeID: string
  setAdminCategories: any
}

const CategoryManagement = ({
  adminCategories,
  placeID,
  setAdminCategories,
}: Props) => {
  const classes = useStyles()
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const handleDeleteCategory = (selectedList: number[]) => {
    setSelectedCategories(selectedList.sort((a, b) => (a > b ? 1 : -1)))
  }
  return (
    <>
      <Card variant="outlined" style={{ margin: '1% 1% 1% 0' }}>
        <CardHeader title="Thêm loại" />
        <form>
          <Box display="flex" style={{ margin: '0 0 1% 1%' }}>
            <FormControl margin="dense">
              <OutlinedInput required name="newCategory" />
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
      </Card>
      <Card variant="outlined" style={{ margin: '1% 1% 1% 0' }}>
        <CardHeader title="Sửa loại" />
        <Box display="flex" style={{ margin: '0 0 1% 1%' }}>
          <CardActions>
            <Button
              size="large"
              className={classes.buttonLineGradient}
              variant="contained"
            >
              Xác nhận
            </Button>
          </CardActions>
        </Box>
      </Card>
      <Card variant="outlined" style={{ margin: '1% 1% 1% 0' }}>
        <CardHeader title="Xóa loại" />
        <DeleteCategory
          selectedCategories={selectedCategories}
          handleDeleteCategory={handleDeleteCategory}
          categories={adminCategories}
          placeID={placeID}
          setAdminCategories={setAdminCategories}
        />
      </Card>
    </>
  )
}

export default CategoryManagement
