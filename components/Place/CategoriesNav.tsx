import { List, ListItem, Paper, Typography } from '@material-ui/core'
import FastfoodIcon from '@material-ui/icons/Fastfood'

interface Props {
  categories: string[]
  selected: number
  setSelected: (selected: number) => void
}

export default function CategoriesNav({
  categories,
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
          {categories.map((category, index) => (
            <ListItem
              key={category}
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
          ))}
        </List>
      </Paper>
    </div>
  )
}
// /* eslint-disable  @typescript-eslint/no-non-null-assertion */
// function setScrollTo(id: string) {
//   const element = document.getElementById(`${id}`)
//   const menuItems = document.getElementById(`menu items`)!.offsetTop
//   const headerHeight = document.querySelector('header')!.offsetHeight
//   const scrollToSection = menuItems! + element!.offsetTop - headerHeight!
//   window.scrollTo({ top: scrollToSection, behavior: 'smooth' })
// }
