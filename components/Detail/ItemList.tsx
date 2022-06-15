import { Grid, Snackbar, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { CategoryInfo, Menu } from '@/models/place'
import useUser from '@/firebase/useUser'
import LoginRequiredDialog from '../common/LoginRequiredDialog'
import Alert from '../common/Alert'
import { addItem } from '@/services/cart'
import MenuItemCard from './MenuItemCard'
interface Props {
  menu: Menu
  category: CategoryInfo
  categoryID: number
  placeID: string
}

const ItemList = ({ menu, category, categoryID, placeID }: Props) => {
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
          <MenuItemCard
            key={`category-${categoryID}-item-${itemID}`}
            itemID={itemID}
            itemInfo={menu[itemID]}
            addToCart={addToCart}
          />
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
