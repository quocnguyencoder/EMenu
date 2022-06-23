import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@material-ui/core'
import React, { useState } from 'react'
import { useStyles } from '@/styles/itemDetailModal'
import CloseIcon from '@material-ui/icons/Close'
import { MenuItem } from '@/models/place'
import Image from 'next/image'
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import formatter from '@/functions/moneyFormatter'
import {
  totalCalo,
  totalCarb,
  totalFat,
  totalFiber,
  totalProtein,
  totalSFat,
} from '@/helpers/toNutritionInfo'

interface Props {
  open: boolean
  handleClose: () => void
  itemInfo: MenuItem
  itemID: number
  addToCart: (itemID: number, quantity: number) => void
}

const ItemDetailModal = ({
  open,
  handleClose,
  itemInfo,
  itemID,
  addToCart,
}: Props) => {
  const classes = useStyles()
  const [scrollTarget, setScrollTarget] = useState<Node | Window | undefined>()
  const trigger = useScrollTrigger({ target: scrollTarget })
  const [quantity, setQuantity] = useState(1)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={classes.detailModalWrapper}
      aria-labelledby="item-modal-title"
      aria-describedby="item-modal-description"
    >
      <Paper className={classes.detailModalPaper}>
        <AppBar
          position="relative"
          color="transparent"
          elevation={trigger ? 2 : 0}
          className={classes.topAppBar}
        >
          <IconButton
            className={classes.disableHoverEffect}
            onClick={() => handleClose()}
          >
            <CloseIcon />
          </IconButton>
          {trigger && (
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              {itemInfo.name}
            </Typography>
          )}
        </AppBar>
        <div
          ref={(node) => {
            if (node) {
              setScrollTarget(node)
            }
          }}
          style={{
            overflow: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            flex: 1,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            style={{ fontWeight: 'bold' }}
          >
            {itemInfo.name}
          </Typography>
          <Image
            src={itemInfo.image}
            alt={`${itemInfo.name} image`}
            layout="responsive"
            height="50%"
            width="100%"
          />
          {itemInfo.description !== '' && (
            <Typography variant="body1" color="secondary">
              {itemInfo.description}
            </Typography>
          )}
          {Object.keys(itemInfo.incredients).length !== 0 && (
            <Box>
              <Typography
                variant="h6"
                component="h2"
                style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
              >
                {'Dinh dưỡng'}
              </Typography>
              <Grid container>
                <Grid
                  item
                  xs={2}
                  className={classes.nutritionCard}
                  style={{
                    backgroundColor: '#ffa952',
                  }}
                >
                  <Typography variant="body2">{'Calo'}</Typography>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    {totalCalo(itemInfo.incredients)}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  className={classes.nutritionCard}
                  style={{
                    backgroundColor: '#0abfc8',
                    maxWidth: '4rem',
                  }}
                >
                  <Typography variant="body2">{'Carb'}</Typography>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    {totalCarb(itemInfo.incredients)}g
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={2}
                  xs={3}
                  className={classes.nutritionCard}
                  style={{
                    backgroundColor: '#ffcccb',
                  }}
                >
                  <Typography variant="body2">{'Chất béo'}</Typography>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    {totalFat(itemInfo.incredients)}g
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={2}
                  xs={3}
                  className={classes.nutritionCard}
                  style={{
                    backgroundColor: '#f84',
                  }}
                >
                  <Typography variant="body2">{'Béo bão hòa'}</Typography>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    {totalSFat(itemInfo.incredients)}g
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  className={classes.nutritionCard}
                  style={{
                    backgroundColor: '#CF9FFF',
                    maxWidth: '4rem',
                  }}
                >
                  <Typography variant="body2">{'Protein'}</Typography>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    {totalProtein(itemInfo.incredients)}g
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  className={classes.nutritionCard}
                  style={{
                    backgroundColor: '#90ee90',
                    maxWidth: '4rem',
                  }}
                >
                  <Typography variant="body2">{'Chất xơ'}</Typography>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    {totalFiber(itemInfo.incredients)}g
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </div>

        <AppBar
          position="relative"
          color="transparent"
          className={classes.bottomAppBar}
        >
          <Toolbar className={classes.actionsToolBar}>
            <Box
              display="flex"
              alignItems="center"
              className={classes.actionsButtons}
            >
              <IconButton
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
                className={classes.disableHoverEffect}
              >
                <RemoveCircleOutlineOutlinedIcon />
              </IconButton>
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                {quantity}
              </Typography>
              <IconButton
                disabled={quantity === 10}
                onClick={() => setQuantity(quantity + 1)}
                className={classes.disableHoverEffect}
              >
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </Box>

            <Button
              className={classes.addToCartButton}
              onClick={() => {
                addToCart(itemID, quantity)
                handleClose()
              }}
            >
              {`Thêm vào giỏ - ${formatter.format(itemInfo.price * quantity)}`}
            </Button>
          </Toolbar>
        </AppBar>
      </Paper>
    </Modal>
  )
}

export default ItemDetailModal
