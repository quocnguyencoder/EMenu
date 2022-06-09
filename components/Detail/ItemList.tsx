import {
  Box,
  CardMedia,
  Chip,
  Grid,
  ListItemText,
  Paper,
  Snackbar,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import { CategoryInfo, Menu } from '@/models/place'
import formatter from '@/functions/moneyFormatter'
import AddIcon from '@material-ui/icons/Add'
import { useStyles } from '@/styles/detail'
import useUser from '@/firebase/useUser'
import LoginRequiredDialog from '../common/LoginRequiredDialog'
import Alert from '../common/Alert'
import { addItem } from '@/services/cart'
interface Props {
  menu: Menu
  category: CategoryInfo
  categoryID: number
  placeID: string
}

const ItemList = ({ menu, category, categoryID, placeID }: Props) => {
  const classes = useStyles()
  const { user } = useUser()
  const [openDialog, setOpenDialog] = useState(false)
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const isLoggedIn = user.id !== undefined && user.id !== ''

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleCloseSnackBar = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackBar(false)
  }

  const addToCart = (itemID: number) => {
    if (isLoggedIn) {
      addItem(placeID, itemID, user.id).then(() => setOpenSnackBar(true))
    } else {
      setOpenDialog(true)
    }
  }
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
                    <Typography
                      component="span"
                      variant="body2"
                      style={{ fontWeight: 'bold' }}
                    >
                      {menu[itemID].name}
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
                        {menu[itemID].description}
                      </Typography>
                      <Typography
                        component="span"
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
        ))}
      </Grid>
      <LoginRequiredDialog open={openDialog} handleClose={handleCloseDialog} />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleCloseSnackBar}
      >
        <Alert onClose={handleCloseSnackBar} severity="success">
          Thêm món ăn thành công
        </Alert>
      </Snackbar>
    </>
  )
}

export default ItemList
