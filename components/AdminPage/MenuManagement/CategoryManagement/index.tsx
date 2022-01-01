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
import UpdateCategory from './UpdateCategory'

interface Props {
  categories: Category
  placeID: string
}

const CategoryManagement = ({ categories, placeID }: Props) => {
  const classes = useStyles()

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
        <UpdateCategory categories={categories} placeID={placeID} />
      </Card>
      <Card variant="outlined" style={{ margin: '1% 1% 1% 0' }}>
        <CardHeader title="Xóa loại" />
        <DeleteCategory categories={categories} placeID={placeID} />
      </Card>
    </>
  )
}

export default CategoryManagement
