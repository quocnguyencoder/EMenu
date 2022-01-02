import { Card, CardHeader } from '@material-ui/core'
import { Category } from '@/models/place'
import DeleteCategory from './DeleteCategory'
import UpdateCategory from './UpdateCategory'
import AddCategory from './AddCategory'

interface Props {
  categories: Category
  placeID: string
}

const CategoryManagement = ({ categories, placeID }: Props) => {
  return (
    <>
      <Card variant="outlined" style={{ margin: '1% 1% 1% 0' }}>
        <CardHeader title="Thêm loại" />
        <AddCategory categories={categories} placeID={placeID} />
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
