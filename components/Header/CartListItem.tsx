import {
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Popover,
  Typography,
} from '@material-ui/core'
import { useState } from 'react'
import formatter from '@/functions/moneyFormatter'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { MenuItem } from '@/models/place'
import { CartItem } from '@/models/cart'

interface Props {
  menuItem: MenuItem
  cartItem: CartItem
  itemID: number
  increaseItem: (number: number) => void
  decreaseItem: (number: number) => void
  deleteItem: (number: number) => void
}

const CartListItem = ({
  menuItem,
  cartItem,
  itemID,
  increaseItem,
  decreaseItem,
  deleteItem,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <>
      <ListItem component="span" style={{ paddingLeft: 0 }}>
        <ListItemAvatar>
          <>
            <IconButton
              style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '0',
                height: '2.2rem',
                width: '2.2rem',
              }}
              aria-describedby={id}
              onClick={handleClick}
            >
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                {cartItem.quantity}
              </Typography>
              <Typography
                variant="body2"
                style={{ fontWeight: 'bold', paddingLeft: '2%' }}
              >{`×`}</Typography>
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
              style={{
                borderRadius: '24px',
              }}
              disableScrollLock
            >
              <Paper
                style={{
                  height: '2.2rem',
                  width: '5.5rem',
                  padding: '0.3rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {cartItem.quantity === 1 ? (
                  <DeleteIcon
                    onClick={() => deleteItem(itemID)}
                    fontSize="small"
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <RemoveIcon
                    onClick={() => decreaseItem(itemID)}
                    fontSize="small"
                    style={{ cursor: 'pointer' }}
                  />
                )}

                <Typography
                  variant="body1"
                  style={{ fontWeight: 'bold', color: 'grey' }}
                >
                  {cartItem.quantity}
                </Typography>

                <AddIcon
                  onClick={() => increaseItem(itemID)}
                  fontSize="small"
                  style={{ cursor: 'pointer' }}
                />
              </Paper>
            </Popover>
          </>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
              {menuItem.name}
            </Typography>
          }
          secondary={
            <Typography variant="subtitle2">
              {`${formatter.format(menuItem.price * cartItem.quantity)}`}
            </Typography>
          }
        />

        <IconButton
          onClick={() => deleteItem(itemID)}
          edge="end"
          aria-label="delete item"
          style={{ padding: 0 }}
        >
          <DeleteIcon style={{ fontSize: '1.3rem', color: 'black' }} />
        </IconButton>
      </ListItem>
      <Divider component="span" />
    </>
  )
}

export default CartListItem
