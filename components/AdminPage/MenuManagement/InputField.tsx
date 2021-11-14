import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core'
import { MenuItem } from '../../../models/place'

interface Props {
  placeholder: string
  item: MenuItem
}

export default function InputField({ placeholder, item }: Props) {
  return (
    <FormControl fullWidth margin="dense" variant="outlined" color="secondary">
      {placeholder === 'Description' ? (
        <>
          <InputLabel>{placeholder}</InputLabel>
          <OutlinedInput
            defaultValue={item.description}
            multiline
            minRows={1}
            name={placeholder}
            label={placeholder}
          />
        </>
      ) : placeholder === 'Price' ? (
        <>
          <InputLabel>{placeholder}</InputLabel>
          <OutlinedInput
            defaultValue={item.price}
            required
            type="number"
            inputProps={{ min: '0' }}
            name={placeholder}
            label={placeholder}
            endAdornment={<InputAdornment position="end">VNĐ</InputAdornment>}
          />
        </>
      ) : (
        <>
          <InputLabel>{placeholder}</InputLabel>
          <OutlinedInput
            defaultValue={item.name}
            required
            name={placeholder}
            label={placeholder}
          />
        </>
      )}
    </FormControl>
  )
}
