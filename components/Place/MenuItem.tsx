import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import { Menu, CategoryInfo } from '../../models/place'
import useInView from 'react-cool-inview'
import { useEffect } from 'react'
import formatter from '../../functions/moneyFormatter'

interface Props {
  categoryID: number
  category: CategoryInfo
  menu: Menu
  filteredMenu: number[]
  setSelected: (selected: number) => void
  addToOrders: (itemID: number) => void
}

const MenuItem = ({
  categoryID,
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

  useEffect(() => {
    inView && setSelected(categoryID)
  }, [inView])

  const hasResultItem = () =>
    category.items.some((itemID) => filteredMenu.includes(itemID))

  const isInResult = (itemID: number) => filteredMenu.includes(itemID)

  return hasResultItem() ? (
    <div id={`menu-category-${categoryID}`} ref={observe}>
      <ListSubheader>
        <Typography
          variant="body2"
          style={{
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          {category.name}
        </Typography>
      </ListSubheader>
      {category.items.map(
        (itemID) =>
          isInResult(itemID) && (
            <ListItem key={`category-${categoryID}-item-${itemID}`}>
              <ListItemAvatar>
                <Avatar
                  alt={menu[itemID].name}
                  src={menu[itemID].image}
                  variant="square"
                  style={{ height: '80px', width: '80px' }}
                />
              </ListItemAvatar>
              <ListItemText
                style={{ marginLeft: '2%', maxWidth: '60%' }}
                primary={
                  <Typography variant="body1" style={{ fontWeight: 700 }}>
                    {menu[itemID].name}
                  </Typography>
                }
                secondary={menu[itemID].description}
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
                      {formatter.format(menu[itemID].price * 1.5)}
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
                      {formatter.format(menu[itemID].price)}
                    </Typography>
                  }
                />
                <IconButton
                  edge="end"
                  style={{ color: '#D14B28' }}
                  onClick={() => addToOrders(itemID)}
                >
                  <AddBoxIcon fontSize="large" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
      )}
    </div>
  ) : (
    <> </>
  )
}

export default MenuItem
