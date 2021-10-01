import React from 'react'
import { Box, List, Typography } from '@material-ui/core'
import { Menu } from '../../models/place'
import MenuItem from './MenuItem'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'

interface Props {
  categories: string[]
  filteredCategories: string[]
  menu: Menu[]
  setSelected: (selected: number) => void
}

const MainMenu = ({
  categories,
  filteredCategories,
  menu,
  setSelected,
}: Props) => {
  const notFound = menu.length === 0

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
                key={`${index}-${category}`}
                setSelected={setSelected}
              />
            )
        )
      )}
    </List>
  )
}

export default React.memo(MainMenu)
