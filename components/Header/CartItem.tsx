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

const CartItem = () => {
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
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold' }}
              >{`1`}</Typography>
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
                <RemoveIcon fontSize="small" />
                <Typography
                  variant="body1"
                  style={{ fontWeight: 'bold', color: 'grey' }}
                >
                  1
                </Typography>

                <AddIcon fontSize="small" />
              </Paper>
            </Popover>
          </>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
              {'Cơm sườn trứng'}
            </Typography>
          }
          secondary={
            <Typography variant="subtitle2">
              {`${formatter.format(12000)}`}
            </Typography>
          }
        />

        <IconButton edge="end" aria-label="delete item" style={{ padding: 0 }}>
          <DeleteIcon style={{ fontSize: '1.3rem', color: 'black' }} />
        </IconButton>
      </ListItem>
      <Divider component="span" />
    </>
  )
}

export default CartItem
