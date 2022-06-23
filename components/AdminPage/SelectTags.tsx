import Breakfast from 'icons/Breakfast'
import Desserts from 'icons/Desserts'
import Sandwiches from 'icons/Sandwiches'
import Coffee from 'icons/Coffee'
import Burgers from 'icons/Burgers'
import Chicken from 'icons/Chicken'
import Salad from 'icons/Salad'
import Fastfood from 'icons/Fastfood'
import Bakery from 'icons/Bakery'
import Smoothie from 'icons/Smoothie'
import Healthy from 'icons/Healthy'
import Pizza from 'icons/Pizza'
import Soup from 'icons/Soup'
import Vegan from 'icons/Vegan'
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'

interface Props {
  tags: string[]
  changeTags: (selectedTags: string[]) => void
}

const SelectTags = ({ tags, changeTags }: Props) => {
  const categories = [
    { name: 'Ăn sáng', icon: <Breakfast /> },
    { name: 'Đồ ngọt', icon: <Desserts /> },
    { name: 'Sandwiches', icon: <Sandwiches /> },
    { name: 'Cà phê', icon: <Coffee /> },
    { name: 'Burgers', icon: <Burgers /> },
    { name: 'Gà', icon: <Chicken /> },
    { name: 'Salad', icon: <Salad /> },
    { name: 'Ăn vặt', icon: <Fastfood /> },
    { name: 'Bánh mì', icon: <Bakery /> },
    { name: 'Smoothie', icon: <Smoothie /> },
    { name: 'Healthy', icon: <Healthy /> },
    { name: 'Pizza', icon: <Pizza /> },
    { name: 'Súp', icon: <Soup /> },
    { name: 'Chay', icon: <Vegan /> },
  ]

  return (
    <FormControl style={{ minWidth: '10%' }}>
      <InputLabel>Tags</InputLabel>
      <Select
        multiple
        value={tags}
        onChange={(e) => changeTags(e.target.value as string[])}
        renderValue={(selected) => (
          <Box>
            {(selected as string[]).map((value) => (
              <Chip key={`select ${value}`} label={value} />
            ))}
          </Box>
        )}
      >
        {categories.map((category, index) => (
          <MenuItem
            key={`tag ${index} name ${category.name}`}
            value={category.name}
          >
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectTags
