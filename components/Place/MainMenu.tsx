import React from 'react'
import { Box, List, Typography } from '@material-ui/core'
import { Menu, Category } from '../../models/place'
import MenuItem from './MenuItem'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'

interface Props {
  categories: Category
  menu: Menu
  filteredMenu: number[]
  setSelected: (selected: number) => void
  addToOrders: (itemID: number) => void
}

const MainMenu = ({
  categories,
  menu,
  filteredMenu,
  setSelected,
  addToOrders,
}: Props) => {
  const notFound = filteredMenu.length === 0

  return (
    <List>
      {notFound ? (
        <Box display="flex" alignItems="center" flexDirection="column">
          <SentimentDissatisfiedIcon style={{ fontSize: '10vh' }} />
          <Typography variant="subtitle1">Không tìm thấy món ăn</Typography>
        </Box>
      ) : (
        Object.keys(categories)
          .map(Number)
          .map((categoryID) => (
            <MenuItem
              key={`category-${categoryID}-items`}
              categoryID={categoryID}
              category={categories[categoryID]}
              menu={menu}
              filteredMenu={filteredMenu}
              setSelected={setSelected}
              addToOrders={addToOrders}
            />
          ))
      )}
    </List>
  )
}

export default React.memo(MainMenu)
