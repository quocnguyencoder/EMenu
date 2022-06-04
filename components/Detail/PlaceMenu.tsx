import { Category, Menu } from '@/models/place'
import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { useStyles } from '@/styles/detail'
import CategoryNav from './CategoryNav'
import ItemList from './ItemList'

interface Props {
  menu: Menu
  categories: Category
}

const PlaceMenu = ({ menu, categories }: Props) => {
  const classes = useStyles()
  return (
    <Box display="flex" flexDirection="column" className={classes.menuWrapper}>
      <Typography variant="h6" style={{ fontWeight: 'bold' }}>
        Thực đơn
      </Typography>
      <CategoryNav categories={categories} />

      {categories &&
        Object.keys(categories)
          .map(Number)
          .map((categoryID) => (
            <ItemList
              key={categoryID}
              menu={menu}
              category={categories[categoryID]}
              categoryID={categoryID}
            />
          ))}
    </Box>
  )
}

export default PlaceMenu
