import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import { Fragment } from 'react'
import { Menu } from '../../models/place'

interface Props {
  categories: string[]
  filteredCategories: string[]
  menu: Menu[]
}

const MainMenu = ({ categories, filteredCategories, menu }: Props) => {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'VND',
  })

  return (
    <List>
      {categories.map(
        (category, index) =>
          filteredCategories.includes(category) && (
            <Fragment key={`menu-${category}`}>
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
              {menu
                .filter((m) => m.category.includes(index))
                .map((item) => (
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
                      style={{ marginLeft: '2%' }}
                      primary={
                        <Typography variant="h6" style={{ fontWeight: 700 }}>
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
                      <IconButton edge="end" style={{ color: '#D14B28' }}>
                        <AddBoxIcon fontSize="large" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              <Divider variant="inset" component="li" />
            </Fragment>
          )
      )}
    </List>
  )
}

export default MainMenu
