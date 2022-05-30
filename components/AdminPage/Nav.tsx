import { Box, List, ListItem } from '@material-ui/core'

interface Props {
  setValue: React.Dispatch<
    React.SetStateAction<{
      val: string
      selected: number
    }>
  >
  selected: number
}

export default function Nav({ setValue, selected }: Props) {
  const handleClick = (newValue: string, newSelected: number) => {
    setValue({ val: newValue, selected: newSelected })
  }

  return (
    <Box ml={1} mt={1} mr={1}>
      <List component="nav">
        {categories.map((category, i) => (
          <ListItem
            selected={selected === i}
            key={category}
            button
            onClick={() => handleClick(category, i)}
          >
            {category}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

const categories = [
  'Tổng quan',
  'Thông tin địa điểm',
  'Quản lí thực đơn',
  'Quản lí đơn hàng',
]
