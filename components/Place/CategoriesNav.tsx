import React from 'react'
import { Box, List, ListItem, Paper, Typography } from '@material-ui/core'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import { Link } from 'react-scroll'
import { useStyles } from '../../styles/place'

interface Props {
  categories: string[]
  filteredCategories: string[]
  selected: number
  setSelected: (selected: number) => void
}

const CategoriesNav = ({
  categories,
  filteredCategories,
  selected,
  setSelected,
}: Props) => {
  const classes = useStyles()

  const handleListItemClick = (index: number) => {
    setSelected(index)
  }

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
          {categories.map(
            (category, index) =>
              filteredCategories.includes(category) && (
                <Link
                  activeClass="active"
                  to={`${index}-${category}`}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  key={`nav${index}${category}`}
                >
                  <ListItem
                    button
                    selected={selected === index}
                    onClick={() => handleListItemClick(index)}
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: 'gray',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}
                    >
                      {category}
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
