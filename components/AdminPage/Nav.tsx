import { Box, List, ListItem, CardMedia } from '@material-ui/core'
import { prefix } from '../../constants'

interface Props {
  setValue: any
}

export default function Nav({ setValue }: Props) {
  const handleClick = (newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box ml={1} mt={1} mr={1}>
      <CardMedia
        component="img"
        image={`${prefix}/logo.png`}
        alt="logo"
        width={100}
        height={50}
        style={{ objectFit: 'scale-down' }}
      />
      <List component="nav">
        {categories.map((category) => (
          <ListItem key={category} button onClick={() => handleClick(category)}>
            {category}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

const categories = [
  'Dashboards',
  'Profile Restaurant',
  'Staff management',
  'Maps',
  'Menu management',
  'Profile',
]
