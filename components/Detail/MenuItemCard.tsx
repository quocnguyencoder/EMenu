import {
  Box,
  CardMedia,
  Chip,
  Grid,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { MenuItem } from '@/models/place'
import formatter from '@/functions/moneyFormatter'
import AddIcon from '@material-ui/icons/Add'
import { useStyles } from '@/styles/detail'

interface Props {
  itemID: number
  itemInfo: MenuItem
  addToCart: (itemID: number) => void
}

const MenuItemCard = ({ itemID, itemInfo, addToCart }: Props) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} sm={6}>
      <Paper variant="outlined" style={{ display: 'flex', cursor: 'pointer' }}>
        <Box display="flex" alignItems="center" flex={1} padding={'0 1rem'}>
          <ListItemText
            primary={
              <Typography
                component="span"
                variant="body2"
                style={{ fontWeight: 'bold' }}
              >
                {itemInfo.name}
              </Typography>
            }
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  color="secondary"
                  className={classes.noWrap2Line}
                >
                  {itemInfo.description}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  color="secondary"
                  style={{ fontWeight: 'bold' }}
                >
                  {`${formatter.format(itemInfo.price)}`}
                </Typography>
              </>
            }
          />
        </Box>
        <Box width="9rem" position="relative" zIndex={1}>
          <CardMedia
            component="img"
            image={itemInfo.image}
            style={{ height: '9rem', borderRadius: '4px', zIndex: 1 }}
          />
          <Chip
            label={
              <Box display="flex" alignItems="center" style={{ gap: '0.4rem' }}>
                <AddIcon fontSize="small" />
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                  Thêm
                </Typography>
              </Box>
            }
            clickable
            onClick={() => addToCart(itemID)}
            className={classes.addButton}
          />
        </Box>
      </Paper>
    </Grid>
  )
}

export default MenuItemCard
