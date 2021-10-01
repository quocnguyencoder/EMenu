import { List, ListItem, Paper, Typography } from '@material-ui/core'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import { Link } from 'react-scroll'
interface Props {
  categories: string[]
  filteredCategories: string[]
  selected: number
  setSelected: (selected: number) => void
}

export default function CategoriesNav({
  categories,
  filteredCategories,
  selected,
  setSelected,
}: Props) {
  const handleListItemClick = (index: number) => {
    setSelected(index)
  }

  return (
    <div style={{ width: '20%' }}>
      <Paper
        style={{
          backgroundColor: '#fff',
          padding: '1%',
          alignSelf: 'flex-start',
          position: 'sticky',
          top: 70,
        }}
      >
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
    </div>
  )
}
