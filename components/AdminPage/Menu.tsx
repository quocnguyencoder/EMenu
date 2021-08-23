import {
  Box,
  CardMedia,
  Button,
  Typography,
  ImageList,
  ImageListItem,
  IconButton,
  ImageListItemBar,
} from '@material-ui/core'
import { prefix } from '../../constants'
import InfoIcon from '@material-ui/icons/Info'

export default function Menu() {
  const categories = Array.from(
    new Set(menu.map((m) => m.category.toLowerCase()))
  )
  return (
    <>
      {categories.map((category) => (
        <ImageList
          key={`menu subheader ${category}`}
          gap={10}
          style={{ width: '100%' }}
        >
          <ImageListItem cols={2} style={{ height: 'auto' }}>
            <Typography
              variant="h5"
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textTransform: 'uppercase',
              }}
            >
              {category}
            </Typography>
          </ImageListItem>

          {menu
            .filter((m) => m.category.toLowerCase() === category)
            .map((item) => (
              <Box style={{ width: '30%', height: '18%' }} key={item.name}>
                <ImageListItem cols={3}>
                  <CardMedia
                    component="img"
                    image={`${prefix}/chicken.jpg`}
                    title={`${item.name}`}
                    style={{ objectFit: 'scale-down' }}
                  />
                  <ImageListItemBar
                    title={item.name}
                    subtitle={
                      <Box>
                        <Typography
                          variant="body2"
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          Description: {item.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          Price: {item.price}
                        </Typography>
                      </Box>
                    }
                    actionIcon={
                      <IconButton aria-label={`info about ${item.name}`}>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
                <Box display="flex">
                  <Button size="medium" color="secondary" style={{ flex: 1 }}>
                    Delete
                  </Button>
                  <Button size="medium" color="secondary" style={{ flex: 1 }}>
                    Update
                  </Button>
                </Box>
              </Box>
            ))}
        </ImageList>
      ))}
    </>
  )
}

const menu = [
  {
    category: 'meat',
    name: 'beef',
    description:
      'thịt tươi ngon hơn khi dùng lạnh, nướng lên làm mồi thì ngon hết sảy',
    price: 100000000,
  },
  { category: 'meAt', name: 'steak', description: 'thịt tươi', price: 8 },
  { category: 'meat', name: 'goat', description: 'thịt tươi', price: 9 },
  {
    category: 'fruit',
    name: 'apple',
    description: 'trái cây tươi',
    price: 10,
  },
  {
    category: 'fruit',
    name: 'weed',
    description: 'mới hái còn thơm',
    price: 11,
  },
  { category: 'cake', name: 'pipe', description: 'bánh ngon', price: 12 },
]
