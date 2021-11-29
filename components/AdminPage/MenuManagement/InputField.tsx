import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core'
import { MenuItem } from '@/models/place'

interface Props {
  placeholder: string
  item: MenuItem
}

export default function InputField({ placeholder, item }: Props) {
  return (
    <FormControl fullWidth margin="dense" variant="outlined" color="secondary">
      {placeholder === 'Description' ? (
        <>
          <InputLabel>Mô tả món ăn</InputLabel>
          <OutlinedInput
            defaultValue={item.description}
            multiline
            minRows={1}
            name={placeholder}
            label="Mô tả món ăn"
          />
        </>
      ) : placeholder === 'Price' ? (
        <>
          <InputLabel>Giá tiền</InputLabel>
          <OutlinedInput
            defaultValue={item.price}
            required
            type="number"
            inputProps={{ min: '0' }}
            name={placeholder}
            label="Giá tiền"
            endAdornment={<InputAdornment position="end">VNĐ</InputAdornment>}
          />
        </>
      ) : (
        <>
          <InputLabel>Tên món ăn</InputLabel>
          <OutlinedInput
            defaultValue={item.name}
            required
            name={placeholder}
            label="Tên món ăn"
          />
        </>
      )}
    </FormControl>
  )
}
