import { Category, Menu } from '@/models/place'
import { Box, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useStyles } from '@/styles/detail'
import CategoryNav from './CategoryNav'
import ItemList from './ItemList'

interface Props {
  menu: Menu
  categories: Category
  placeID: string
}

const PlaceMenu = ({ menu, categories, placeID }: Props) => {
  const classes = useStyles()
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(categories).map(Number)[0]
  )
  return (
    <Box display="flex" flexDirection="column" className={classes.menuWrapper}>
      <Typography variant="h5" component="h3" style={{ fontWeight: 'bold' }}>
        Thực đơn
      </Typography>
      <CategoryNav
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {categories &&
        Object.keys(categories)
          .map(Number)
          .map((categoryID) => (
            <ItemList
              key={categoryID}
              menu={menu}
              category={categories[categoryID]}
              categoryID={categoryID}
              placeID={placeID}
              setSelectedCategory={setSelectedCategory}
            />
          ))}
    </Box>
  )
}

export default PlaceMenu
