import {
  Box,
  CardMedia,
  Button,
  Typography,
  ImageListItem,
  ImageListItemBar,
  makeStyles,
} from '@material-ui/core'
import { Category, MenuItem } from '../../../models/place'
import useCurrencyVND from '../../useCurrencyVND'

interface Props {
  categories: Category
  categoryID: number
  itemInfo: MenuItem
  itemID: number
  placeID: string
  updateMenu: (
    index: number,
    item: MenuItem,
    updateCategories: Category
  ) => void
  handleOpenModalUpdate: (itemID: number) => void
  handleOpenModalRemove: (itemID: number, categoryID: number) => void
}

const Item = ({
  categoryID,
  itemInfo,
  itemID,
  handleOpenModalUpdate,
  handleOpenModalRemove,
}: Props) => {
  const classes = useStyles()

  return (
    <Box style={{ width: '20%', height: '20%' }}>
      <ImageListItem cols={4}>
        <CardMedia
          component="img"
          image={`${itemInfo.image}`}
          title={`${itemInfo.name}`}
          style={{ objectFit: 'cover' }}
        />
        <ImageListItemBar
          title={itemInfo.name}
          subtitle={
            <Box>
              <Typography variant="body2" className={classes.noOverFlowText}>
                Description: {itemInfo.description}
              </Typography>
              <Typography variant="body2" className={classes.noOverFlowText}>
                Price: {useCurrencyVND(itemInfo.price)}
              </Typography>
            </Box>
          }
        />
      </ImageListItem>
      <Box display="flex" style={{ backgroundColor: '#90CAF9' }}>
        <Button
          onClick={() => handleOpenModalRemove(itemID, categoryID)}
          className={classes.button}
          size="large"
          color="secondary"
          style={{ flex: 1 }}
        >
          Remove
        </Button>
        <Button
          onClick={() => handleOpenModalUpdate(itemID)}
          className={classes.button}
          size="large"
          color="secondary"
          style={{ flex: 1 }}
        >
          Update
        </Button>
      </Box>
    </Box>
  )
}

export default Item

const useStyles = makeStyles(() => ({
  noOverFlowText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  button: {
    backgroundColor: '#90CAF9',
    '&:hover': {
      backgroundColor: '#F9A54A',
    },
  },
}))
