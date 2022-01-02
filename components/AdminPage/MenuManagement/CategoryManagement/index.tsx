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
        <CardHeader title="Thêm loại món ăn" />
        <AddCategory categories={categories} placeID={placeID} />
      </Card>
      <Card variant="outlined" style={{ margin: '1% 1% 1% 0' }}>
        <CardHeader title="Sửa tên loại món ăn" />
        <UpdateCategory categories={categories} placeID={placeID} />
      </Card>
      <Card variant="outlined" style={{ margin: '1% 1% 1% 0' }}>
        <CardHeader title="Xóa loại món ăn" />
        <DeleteCategory categories={categories} placeID={placeID} />
      </Card>
    </>
  )
}

export default CategoryManagement
