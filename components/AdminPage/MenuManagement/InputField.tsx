import { InputAdornment, InputBase, makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { MenuItem } from '../../../models/place'

interface Props {
  placeholder: string
  item: MenuItem
}

export default function InputField({ placeholder, item }: Props) {
  const classes = useStyles()
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

  return placeholder === 'Description' ? (
    <InputBase
      className={classes.input}
      placeholder={placeholder}
      multiline
      minRows={2}
      name={placeholder}
      value={description}
      onChange={(e) => handleOnChangeDescription(e.target.value)}
    />
  ) : placeholder === 'Price' ? (
    <InputBase
      className={classes.input}
      placeholder={placeholder}
      required
      type="number"
      endAdornment={<InputAdornment position="end">VNĐ</InputAdornment>}
      name={placeholder}
      value={price}
      onChange={(e) => handleOnChangePrice(e.target.value as unknown as number)}
    />
  ) : (
    <InputBase
      className={classes.input}
      placeholder={placeholder}
      required
      name={placeholder}
      value={name}
      onChange={(e) => handleOnChangeName(e.target.value)}
    />
  )
}

const useStyles = makeStyles(() => ({
  input: { border: '1px solid', borderRadius: '5px', padding: '0 1% 0 1%' },
}))
