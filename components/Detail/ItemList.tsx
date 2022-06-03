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
import { CategoryInfo, Menu } from '@/models/place'
import formatter from '@/functions/moneyFormatter'
import AddIcon from '@material-ui/icons/Add'
import { useStyles } from '@/styles/detail'

interface Props {
  menu: Menu
  category: CategoryInfo
  categoryID: number
}

const ItemList = ({ menu, category, categoryID }: Props) => {
  const classes = useStyles()
  return (
    <>
      <Typography
        variant="h6"
        style={{ fontWeight: 'bold', margin: '1rem 0 0.5rem 0' }}
      >
        {category.name}
      </Typography>
      <Grid container spacing={1}>
        {category.items.map((itemID) => (
          <Grid
            key={`category-${categoryID}-item-${itemID}`}
            item
            xs={12}
            sm={6}
          >
            <Paper
              variant="outlined"
              style={{ display: 'flex', cursor: 'pointer' }}
            >
              <Box
                display="flex"
                alignItems="center"
                flex={1}
                padding={'0 1rem'}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                      {menu[itemID].name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="body2"
                        color="secondary"
                        className={classes.noWrap2Line}
                      >
                        {menu[itemID].description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="secondary"
                        style={{ fontWeight: 'bold' }}
                      >
                        {`${formatter.format(menu[itemID].price)}`}
                      </Typography>
                    </>
                  }
                />
              </Box>
              <Box width="9rem" position="relative" zIndex={1}>
                <CardMedia
                  component="img"
                  image={menu[itemID].image}
                  style={{ height: '9rem', borderRadius: '4px', zIndex: 1 }}
                />
                <Chip
                  label={
                    <Box
                      display="flex"
                      alignItems="center"
                      style={{ gap: '0.4rem' }}
                    >
                      <AddIcon fontSize="small" />
                      <Typography
                        variant="body2"
                        style={{ fontWeight: 'bold' }}
                      >
                        Add
                      </Typography>
                    </Box>
                  }
                  clickable
                  className={classes.addButton}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default ItemList
