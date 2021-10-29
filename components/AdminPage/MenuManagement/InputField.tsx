import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core'
import { useState } from 'react'
import { MenuItem } from '../../../models/place'

interface Props {
  placeholder: string
  item: MenuItem
}

export default function InputField({ placeholder, item }: Props) {
  const [description, setDescription] = useState<string>(item.description)
  const [price, setPrice] = useState<number>(item.price)
  const [name, setName] = useState<string>(item.name)

  const handleOnChangeDescription = (input: string) => {
    setDescription(input)
  }
  const handleOnChangePrice = (input: number) => {
    setPrice(input)
  }
  const handleOnChangeName = (input: string) => {
    setName(input)
  }

  return (
    <FormControl fullWidth margin="dense" variant="outlined" color="secondary">
      {placeholder === 'Description' ? (
        <>
          <InputLabel>{placeholder}</InputLabel>
          <OutlinedInput
            value={description}
            multiline
            minRows={1}
            name={placeholder}
            label={placeholder}
            onChange={(e) => handleOnChangeDescription(e.target.value)}
          />
        </>
      ) : placeholder === 'Price' ? (
        <>
          <InputLabel>{placeholder}</InputLabel>
          <OutlinedInput
            value={price}
            required
            type="number"
            inputProps={{ min: '0' }}
            name={placeholder}
            label={placeholder}
            onChange={(e) =>
              handleOnChangePrice(e.target.value as unknown as number)
            }
            endAdornment={<InputAdornment position="end">VNĐ</InputAdornment>}
          />
        </>
      ) : (
        <>
          <InputLabel>{placeholder}</InputLabel>
          <OutlinedInput
            value={name}
            required
            name={placeholder}
            label={placeholder}
            onChange={(e) => handleOnChangeName(e.target.value)}
          />
        </>
      )}
    </FormControl>
  )
}
