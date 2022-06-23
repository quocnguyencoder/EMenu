import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Incredient, MenuItemIncredients } from '@/models/incredient'

interface Props {
  itemIncredient: MenuItemIncredients
  setItemIncredient: React.Dispatch<React.SetStateAction<MenuItemIncredients>>
  index: number
  incredientList: Incredient[]
}

const ItemIncredients = ({
  itemIncredient,
  setItemIncredient,
  index,
  incredientList,
}: Props) => {
  const removeIncredient = (id: number) => {
    // eslint-disable-next-line
    const { [id]: _, ...newIncredientList } = itemIncredient
    setItemIncredient(newIncredientList)
  }
  return (
    <Box display="flex" alignItems="center" pr={1} pl={1} pb={1}>
      <Typography variant="h6" style={{ flex: 1 }}>
        {incredientList.find((incredient) => incredient.id === index)?.name}
      </Typography>
      <OutlinedInput
        defaultValue={itemIncredient[index].weight}
        endAdornment={<InputAdornment position="end">g</InputAdornment>}
        type="number"
        inputProps={{ min: 0 }}
        onChange={(e) =>
          setItemIncredient({
            ...itemIncredient,
            [index]: {
              weight: Number(e.target.value),
            },
          })
        }
        style={{ flex: 1 }}
      />
      <IconButton
        style={{ color: '#DC004E' }}
        onClick={() => removeIncredient(index)}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}

export default ItemIncredients
