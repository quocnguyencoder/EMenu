import { Category } from '@/models/place'
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { Link, scroller } from 'react-scroll'
import ListIcon from '@material-ui/icons/List'

interface Props {
  categories: Category
  selectedCategory: number
  setSelectedCategory: (value: number) => void
}

const CategoryNav = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  const isSelected = (categoryID: number) => categoryID === selectedCategory

  useEffect(() => {
    scroller.scrollTo(`category-nav-item-${selectedCategory}`, {
      duration: 500,
      delay: 300,
      offset: -100,
      smooth: true,
      containerId: 'categories-nav-list',
      horizontal: true,
    })
  }, [selectedCategory])

  return (
    <Box
      position="sticky"
      top="3.5rem"
      style={{ backgroundColor: '#fff', zIndex: 2 }}
    >
      <Box display="flex" alignItems="center">
        <IconButton
          aria-label="categories button"
          style={{ padding: '0px', color: 'black' }}
        >
          <ListIcon />
        </IconButton>
        <List
          style={{
            display: 'flex',
            overflow: 'auto',
            padding: 0,
          }}
          component="div"
          id="categories-nav-list"
        >
          {categories &&
            Object.keys(categories)
              .map(Number)
              .map((categoryID) => (
                <Link
                  key={`nav-category-${categoryID}`}
                  activeClass="active"
                  to={`menu-category-${categoryID}`}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  <ListItem
                    style={{
                      cursor: 'pointer',
                    }}
                    id={`category-nav-item-${categoryID}`}
                    onClick={() => setSelectedCategory(categoryID)}
                  >
                    <ListItemText
                      style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
                      primary={
                        <Typography
                          variant="body2"
                          style={{
                            fontWeight: isSelected(categoryID) ? 'bold' : 500,
                          }}
                        >
                          {categories[categoryID].name}
                        </Typography>
                      }
                    />
                  </ListItem>
                </Link>
              ))}
        </List>
      </Box>
      <Divider />
    </Box>
  )
}

export default CategoryNav
