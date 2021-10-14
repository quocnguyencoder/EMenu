import { Box, Typography } from '@material-ui/core'
import InputField from './InputField'
import { MenuItem } from '../../../models/place'

interface Props {
  item: MenuItem
}

const ItemForm = ({ item }: Props) => {
  return (
    <>
      <Box alignItems="center" display="flex" marginBottom="1%">
        <Typography style={{ marginRight: '1%' }}>Name:</Typography>
        <InputField placeholder="Name" item={item} />
      </Box>
      <Box alignItems="center" display="flex" marginBottom="1%">
        <Typography style={{ marginRight: '1%' }}>Description:</Typography>
        <InputField placeholder="Description" item={item} />
      </Box>
      <Box alignItems="center" display="flex" marginBottom="1%">
        <Typography style={{ marginRight: '1%' }}>Price:</Typography>
        <InputField placeholder="Price" item={item} />
      </Box>
    </>
  )
}

export default ItemForm
