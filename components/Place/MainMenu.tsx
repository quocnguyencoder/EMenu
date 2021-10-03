import React from 'react'
import { Box, List, Typography } from '@material-ui/core'
import { Menu } from '../../models/place'
import MenuItem from './MenuItem'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'

interface Props {
  categories: string[]
  filteredCategories: string[]
  menu: Menu[]
  filteredMenu: number[]
  setSelected: (selected: number) => void
  addToOrders: (id: string) => void
}

const MainMenu = ({
  categories,
  filteredCategories,
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
        categories.map(
          (category, index) =>
            filteredCategories.includes(category) && (
              <MenuItem
                index={index}
                category={category}
                menu={menu}
                filteredMenu={filteredMenu}
                key={`${index}-${category}`}
                setSelected={setSelected}
                addToOrders={addToOrders}
              />
            )
        )
      )}
    </List>
  )
}

export default React.memo(MainMenu)
