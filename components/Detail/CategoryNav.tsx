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
import React from 'react'
import ListIcon from '@material-ui/icons/List'

interface Props {
  categories: Category
}

const CategoryNav = ({ categories }: Props) => {
  return (
    <Box
      position="sticky"
      top="3.5rem"
      style={{ backgroundColor: '#fff', zIndex: 2 }}
    >
      <Box display="flex" alignItems="center">
        <IconButton style={{ padding: 0, color: 'black' }}>
          <ListIcon />
        </IconButton>
        <List
          style={{
            display: 'flex',
            overflow: 'scroll',
            padding: 0,
          }}
        >
          {Object.keys(categories)
            .map(Number)
            .map((categoryID) => (
              <ListItem
                key={`nav-category-${categoryID}`}
                style={{
                  cursor: 'pointer',
                }}
              >
                <ListItemText
                  style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
                  primary={
                    <Typography variant="body2">
                      {categories[categoryID].name}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
        </List>
      </Box>
      <Divider />
    </Box>
  )
}

export default CategoryNav
