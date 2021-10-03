import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import { Menu } from '../../models/place'
import useInView from 'react-cool-inview'
import { useEffect } from 'react'

interface Props {
  index: number
  category: string
  menu: Menu[]
  filteredMenu: number[]
  setSelected: (selected: number) => void
  addToOrders: (id: string) => void
}

const MenuItem = ({
  index,
  category,
  menu,
  filteredMenu,
  setSelected,
  addToOrders,
}: Props) => {
  const { observe, inView } = useInView({
    delay: 100,
    threshold: 0.5,
  })

  const formatter = new Intl.NumberFormat('vi-VI', {
    style: 'currency',
    currency: 'VND',
  })

  useEffect(() => {
    inView && setSelected(index)
  }, [inView])

  return (
    <div id={`${index}-${category}`} ref={observe}>
      <ListSubheader>
        <Typography
          variant="body2"
          style={{
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          {category}
        </Typography>
      </ListSubheader>
      {menu.map(
        (item, id) =>
          item.category.includes(index) &&
          filteredMenu.includes(id) && (
            <ListItem key={`${category}-${item.name}`}>
              <ListItemAvatar>
                <Avatar
                  alt={item.name}
                  src={item.image}
                  variant="square"
                  style={{ height: '80px', width: '80px' }}
                />
              </ListItemAvatar>
              <ListItemText
                style={{ marginLeft: '2%', maxWidth: '60%' }}
                primary={
                  <Typography variant="body1" style={{ fontWeight: 700 }}>
                    {item.name}
                  </Typography>
                }
                secondary={item.description}
              />
              <ListItemSecondaryAction style={{ display: 'flex' }}>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle2"
                      style={{
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                      }}
                    >
                      {formatter.format(item.price * 1.5)}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="h6"
                      style={{
                        fontWeight: 700,
                        color: '#58B1E1',
                      }}
                    >
                      {formatter.format(item.price)}
                    </Typography>
                  }
                />
                <IconButton
                  edge="end"
                  style={{ color: '#D14B28' }}
                  onClick={() => addToOrders(`${id}`)}
                >
                  <AddBoxIcon fontSize="large" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
      )}
      <Divider variant="inset" component="li" />
    </div>
  )
}

export default MenuItem
