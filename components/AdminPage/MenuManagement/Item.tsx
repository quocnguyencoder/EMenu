import {
  Box,
  CardMedia,
  Typography,
  ImageListItem,
  ImageListItemBar,
  makeStyles,
  IconButton,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { Category, MenuItem } from '@/models/place'
import formatter from '@/functions/moneyFormatter'

interface Props {
  categories: Category
  categoryID: number
  itemInfo: MenuItem
  itemID: number
  handleOpenModalUpdate: (itemID: number) => void
  handleOpenModalRemove: (itemID: number, categoryID: number) => void
}

const Item = ({
  categories,
  categoryID,
  itemInfo,
  itemID,
  handleOpenModalUpdate,
  handleOpenModalRemove,
}: Props) => {
  const classes = useStyles()

  return (
    <>
      <ImageListItem cols={4}>
        <CardMedia
          component="img"
          onClick={() => handleOpenModalUpdate(itemID)}
          image={`${itemInfo.image}`}
          title={`${itemInfo.name}`}
          style={{ objectFit: 'cover' }}
        />
        <ImageListItemBar
          title={itemInfo.name}
          subtitle={
            <Box>
              <Typography variant="body2" className={classes.noOverFlowText}>
                Mô tả: {itemInfo.description}
              </Typography>
              <Typography variant="body2" className={classes.noOverFlowText}>
                Giá: {formatter.format(itemInfo.price)}
              </Typography>
            </Box>
          }
          actionIcon={
            <IconButton
              onClick={() => handleOpenModalRemove(itemID, categoryID)}
              title={`Bỏ ${itemInfo.name} ra khỏi ${categories[categoryID].name}`}
              style={{ color: 'red' }}
            >
              <CloseIcon />
            </IconButton>
          }
          actionPosition="right"
        />
      </ImageListItem>
    </>
  )
}

export default Item

const useStyles = makeStyles(() => ({
  noOverFlowText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))
