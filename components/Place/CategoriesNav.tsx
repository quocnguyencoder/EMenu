import React from 'react'
import { Box, List, ListItem, Paper, Typography } from '@material-ui/core'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import { Link } from 'react-scroll'
import { useStyles } from '../../styles/place'
import { Category } from '../../models/place'

interface Props {
  categories: Category
  filteredMenu: number[]
  selected: number
  setSelected: (selected: number) => void
}

const CategoriesNav = ({
  categories,
  filteredMenu,
  selected,
  setSelected,
}: Props) => {
  const classes = useStyles()

  const handleListItemClick = (index: number) => {
    setSelected(index)
  }

  const hasResultItem = (categoryID: number) =>
    categories[categoryID].items.some((itemID) => filteredMenu.includes(itemID))

  return (
    <Box width="20%">
      <Paper className={classes.categoriesNavWrapper}>
        <Typography
          variant="h5"
          style={{
            color: '#D14B28',
            fontWeight: 600,
          }}
        >
          <FastfoodIcon fontSize="large" />
          Menu
        </Typography>
        <List component="nav">
          {Object.keys(categories)
            .map(Number)
            .map(
              (categoryID) =>
                hasResultItem(categoryID) && (
                  <Link
                    key={`nav-category-${categoryID}`}
                    activeClass="active"
                    to={`menu-category-${categoryID}`}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    <ListItem
                      button
                      selected={selected === categoryID}
                      onClick={() => handleListItemClick(categoryID)}
                    >
                      <Typography
                        variant="body2"
                        style={{
                          color: 'gray',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                        }}
                      >
                        {categories[categoryID].name}
                      </Typography>
                    </ListItem>
                  </Link>
                )
            )}
        </List>
      </Paper>
    </Box>
  )
}

export default React.memo(CategoriesNav)
