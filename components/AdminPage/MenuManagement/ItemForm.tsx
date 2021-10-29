import { Box } from '@material-ui/core'
import InputField from './InputField'
import { MenuItem } from '../../../models/place'

interface Props {
  item: MenuItem
}

const ItemForm = ({ item }: Props) => {
  return (
    <Box mr={1}>
      <Box marginBottom="1%">
        <InputField placeholder="Name" item={item} />
      </Box>
      <Box marginBottom="1%">
        <InputField placeholder="Description" item={item} />
      </Box>
      <Box marginBottom="1%">
        <InputField placeholder="Price" item={item} />
      </Box>
    </Box>
  )
}

export default ItemForm
